// chapters.constants.ts
import { Subject, Grade, Semester } from './enum';

export const ChaptersMap = {
  [Subject.Math]: {
    [Grade.Grade7]: {   
      [Semester.First]: [" الأعداد الصحيحة الطبيعية","العمود والتوازي","الزوايا","تشخيص - علاج - تأمل "],
      [Semester.Second]: ["الأعداد العشرية","الأعداد الكسرية","التناظر المحوري","المثلثات"],
      [Semester.Third]: ["رباعيات الأضلاع","المنشور القائم والأسطوانة ذات القاعدة القائمة"," أنشطة في الجبر"," الإحصاء والاحتمالات"],
    },
    [Grade.Grade8]: {      
      [Semester.First]: ["أنشطة في الحساب", "مجموعة الأعداد الصحيحة النسبية","الجمع والطرح والضرب في مجموعة الأعداد الصحيحة النسبية","الأعداد الكسرية النسبية","الزوايا الحاصلة عن تقاطع مستقيمين متوازيين مع مستقيم","التناظر المركزي"],
      [Semester.Second]: ["الجمع والطرح في مجموعة الأعداد الكسرية النسبية", " الضرب والقسمة في مجموعة الأعداد الكسرية النسبية"," القوى في مجموعة الأعداد الكسرية النسبية"," المثلثات المتطابقة"," رباعيات الأضلاع"],
      [Semester.Third]: [" رباعيات الأضلاع", " الهرم والمخروط والكرة"," التوازي في الفضاء"," معادلات من الدرجة الأولى ذات مجهول واحد","التناسب","الإحصاء والاحتمالات"],
    },
    [Grade.Grade9]: {
      [Semester.First]: ["التعداد والحساب"," مجموعة الأعداد الحقيقية IR", " العمليات في مجموعة الأعداد الحقيقية", " التعيين في المستوي"," مبرهنة طالس وتطبيقاتها"],
      [Semester.Second]: ["القوى في مجموعة الأعداد الحقيقية", "الترتيب والمقاربة", "الجذاءات المعتبرة والعبارات الجبرية","العلاقات القياسية في المثلث القائم","أنشطة حول الرباعيات"],
      [Semester.Third]: [" المعادلات والمتراجحات من الدرجة الأولى", "  الإحصاء والاحتمالات"," التعامد في الفضاء"],
    },
  },
  [Subject.Arabic]: {
    [Grade.Grade7]: {
      [Semester.First]: ["Grammar", "Reading Comprehension"],
      [Semester.Second]: ["Writing", "Vocabulary"],
      [Semester.Third]: ["Poetry", "Prose"],
    },
    // Add more chapters for Arabic for other grades and semesters...
  },
  [Subject.English]: {
    [Grade.Grade7]: {
      [Semester.First]: ["Grammar Basics", "Short Stories"],
      [Semester.Second]: ["Essay Writing", "Literature"],
      [Semester.Third]: ["Advanced Vocabulary", "Drama"],
    },
    // Add more chapters for English for other grades and semesters...
  },
};
