import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam } from '../schemas/exam.schema';
import { CreateExamDto } from './dto/create-exam.dto';
import { ChaptersMap } from '../constants/chapters.constants';
import { Subject, Grade, Semester } from '../constants/enum';


@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam.name) private examModel: Model<Exam>) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const newExam = new this.examModel(createExamDto);
    return await newExam.save();
  }

    // Find exam by ID
    async findById(id: string): Promise<Exam> {
      const exam = await this.examModel.findById(id).exec();
      if (!exam) {
        throw new NotFoundException(`Exam with ID ${id} not found`);
      }
      return exam;
    }

  async findAll(): Promise<Exam[]> {
    return this.examModel.find().exec();
  }
  getChapters(
    subject: Subject,
    grade: Grade,
    semester: Semester
  ): string[] {
    const subjectData = ChaptersMap[subject];
    if (!subjectData) return [];

    const gradeData = subjectData[grade];
    if (!gradeData) return [];

    const chapters = gradeData[semester];
    return chapters || [];
  }
  async createExam(examDto: any): Promise<{ id: string; text: string }> {
    // Step 1: Save the initial exam
    const createdExam = new this.examModel(examDto);
    const savedExam = await createdExam.save();
  
    // Step 2: Prepare the prompt for the OpenAI API
    const prompt = `Can you build a ${savedExam.subject} exam for ${savedExam.grade} grade on these chapters: ${savedExam.chapters.join(
      ', '
    )} with the difficulty level of ${savedExam.difficultyLevel}/10? Keep in mind these specifications: ${savedExam.prompt || ''}`;
  
    // Step 3: Call the OpenAI API and update the text field
    const apiResponse = await this.getAssistantResponse(prompt);
  
    if (apiResponse) {
      console.log('API Response:', apiResponse); // Debug the response
      savedExam.text = apiResponse; // Update the text field
      await savedExam.save(); // Save the updated exam
    }
  
    // Step 4: Return the exam's id and generated text
    return { id: savedExam._id.toString(), text: savedExam.text };
  }
  
  
  

  private async getAssistantResponse(prompt: string): Promise<string | null> {
    require('dotenv').config();
    const OpenAI = require('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  
    try {
      const myThread = await openai.beta.threads.create();
      await openai.beta.threads.messages.create(myThread.id, {
        role: 'user',
        content: prompt,
      });
  
      const myRun = await openai.beta.threads.runs.create(myThread.id, {
        assistant_id: 'asst_7uTv1GbkpeiFYdKfe7HDSzSt',
      });
  
      let response = null;
      const startTime = Date.now();
      const timeout = 60000; // Increased timeout to 60 seconds
  
      while (!response) {
        if (Date.now() - startTime > timeout) {
          throw new Error('Request timed out while waiting for completion');
        }
  
        const runStatus = await openai.beta.threads.runs.retrieve(
          myThread.id,
          myRun.id,
        );
  
        if (runStatus.status === 'completed') {
          const allMessages = await openai.beta.threads.messages.list(
            myThread.id,
          );
  
          console.log('Retrieved Messages:', JSON.stringify(allMessages, null, 2)); // Debug the messages
  
          // Extract the assistant's response
          const assistantMessage = allMessages.data.find(
            (message) => message.role === 'assistant',
          );
  
          if (assistantMessage) {
            response = assistantMessage.content[0]?.text?.value || null;
          }
  
          break;
        } else if (
          runStatus.status !== 'queued' &&
          runStatus.status !== 'in_progress'
        ) {
          throw new Error(`Run failed with status: ${runStatus.status}`);
        }
      }
  
      console.log('Final Response:', response); // Debug the final extracted response
      return response;
    } catch (error) {
      console.error('Error during OpenAI API call:', error);
      return null;
    }
  }

  async regenerateExam(updateExamDto: { id: string; text: string; prompt: string }): Promise<{ id: string; text: string }> {
    const { id, text: oldText, prompt: adjustmentPrompt } = updateExamDto;
  
    // Step 1: Find the existing exam by ID
    const existingExam = await this.examModel.findById(id);
    if (!existingExam) {
      throw new Error(`Exam with ID ${id} not found.`);
    }
  
    // Step 2: Prepare the regeneration prompt
    const regenerationPrompt = `Based on the following old exam text:\n"${oldText}"\nPlease regenerate the exam with these adjustments:\n${adjustmentPrompt}`;
  
    // Step 3: Call OpenAI API to regenerate the exam
    const regeneratedText = await this.getAssistantResponse(regenerationPrompt);
    if (!regeneratedText) {
      throw new Error('Failed to regenerate exam. No response from OpenAI API.');
    }
  
    // Step 4: Update the exam's text field in the database
    existingExam.text = regeneratedText;
    await existingExam.save();
  
    // Step 5: Return the exam's id and updated text
    return { id: existingExam._id.toString(), text: regeneratedText };
  }
  
  
}
