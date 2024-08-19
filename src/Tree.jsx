import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './Tree.css'; // Import your CSS file for styling

const treatments = [
  {
    type: 'טיפול בקבלה והתחייבות (ACT)',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'מיועד לאנשים עם הפרעות חרדה ודיכאון, מתמקד בלמידה איך לקבל את המחשבות והרגשות בלי להילחם בהם.',
  },
  {
    type: 'טיפול בעזרת בעלי חיים',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'לא',
    description: 'מתאים לילדים ומבוגרים עם בעיות רגשיות או נפשיות, משתמש בחיות ליצירת קשר רגשי ושיפור בקשר החברתי.',
  },
  {
    type: 'טיפול באמנות',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'לא',
    description: 'מיועד לאנשים מכל הגילאים לעיבוד רגשי דרך ביטוי אומנותי, מסייע בהתמודדות עם לחצים וחרדות.',
  },
  {
    type: 'טיפול בחשיפה',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'מיועד לטיפול בחרדות ופוביות, עובד על חשיפה הדרגתית ובטוחה למקור הפחד.',
  },
  {
    type: 'Eye Movement Desensitization and Reprocessing (EMDR)',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקד בטיפול ב-PTSD, משתמש בהנחיות עיניים לעיבוד טראומות.',
  },
  {
    type: 'טיפול קבוצתי',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'כן',
    description: 'מתאים למגוון בעיות רגשיות, מעודד תמיכה חברתית ולמידה מחוויות של אחרים.',
  },
  {
    type: 'יוגה',
    category: 'גופני',
    length: 'קצר',
    homework: 'לא',
    description: 'מיועדת לשיפור בריאות הגוף והנפש, עוזרת בניהול מתח וחרדה דרך תרגול גופני ונפשי.',
  },
  {
    type: 'תוספי תזונה צמחיים',
    category: 'תזונתי',
    length: 'קצר',
    homework: 'לא',
    description: 'נועדו לשיפור הבריאות הכללית, מתמקדים באיזון תזונתי ותמיכה במערכת החיסונית.',
  },
  {
    type: 'טיפול במוסיקה',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'לא',
    description: 'מתאים לכל הגילאים, עוזר להתמודד עם בעיות נפשיות ורגשיות דרך ביטוי מוזיקלי.',
  },
  {
    type: 'טיפול פסיכודינמי',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'לא',
    description: 'מתמקד בחקירת התודעה הלא מודעת לטיפול בבעיות נפשיות והתנהגותיות.',
  },
  {
    type: 'ייעוץ תזונתי',
    category: 'תזונתי',
    length: 'קצר',
    homework: 'כן',
    description: 'מיועד לשיפור הבריאות דרך תזונה מאוזנת, תוך מתן הדרכה אישית.',
  },
  {
    type: 'ריפוי בעיסוק',
    category: 'פונקציונלי',
    length: 'קצר',
    homework: 'כן',
    description: 'מסייע למטופלים לשפר יכולות פונקציונליות ולהתמודד עם מגבלות גופניות או נפשיות.',
  },
  {
    type: 'ארומתרפיה',
    category: 'רוגע',
    length: 'קצר',
    homework: 'לא',
    description: 'שימוש בשמנים אתריים לשיפור מצב הרוח והרגעה, מתאים למטופלים עם לחץ וחרדה.',
  },
  {
    type: 'טיפול באור',
    category: 'שינה',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקד בטיפול בהפרעות שינה ודיכאון עונתי, עובד על חשיפה לאור מלאכותי.',
  },
  {
    type: 'טיפול בתנועה וריקוד',
    category: 'גופני',
    length: 'קצר',
    homework: 'לא',
    description: 'מיועד לשחרור טנזיות וקידום בריאות נפשית דרך ביטוי גופני.',
  },
  {
    type: 'טיפול מגע גוף נפש',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'מטפל בשילוב של טכניקות מגע עם עבודה רגשית, מתאים למטופלים עם טראומות ומתחים.',
  },
  {
    type: 'SE - חוויה סומתית',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקד בשחרור טראומה דרך תנועות גוף ותודעה גופנית.',
  },
  {
    type: 'דיקור סיני',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'מיועד לטיפול במגוון בעיות גופניות ורגשיות דרך עידוד זרימת האנרגיה בגוף.',
  },
  {
    type: 'שיאצו',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'טכניקת מסאז\' יפנית המתמקדת בלחיצות על נקודות רפואיות לשיפור הבריאות הכללית.',
  },
  {
    type: 'נטורופתיה',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקדת בטיפול טבעי והוליסטי, משלבת שימוש בצמחים ושיטות רפואיות טבעיות.',
  },
  {
    type: 'הומאופתיה',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'מבוססת על עיקרון הדילול והסימון, מיועדת לטיפול במחלות כרוניות ועוד.',
  },
  {
    type: 'אוסטאופתיה',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'טיפול בבעיות שלד ומפרקים דרך מניפולציות גופניות.',
  },
  {
    type: 'רפלקסולוגיה',
    category: 'רפואה אלטרנטיבית',
    length: 'ארוך',
    homework: 'לא',
    description: 'מסאז\' שמתמקד בלחיצות בכפות הרגליים להשפעה על איברים ומערכות בגוף.',
  },
  {
    type: 'עיסוי רפואי הוליסטי',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'משלב טכניקות עיסוי מגוונות לטיפול רפואי ושחרור שרירים.',
  },
  {
    type: 'טווינא',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'סוג של עיסוי סיני המתמקד בשיפור זרימת הצ\'י והדם בגוף.',
  },
  {
    type: 'כירופרקטיקה',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקדת בטיפול בבעיות של השלד והעמוד השדרי דרך תיקונים מניפולטיביים.',
  },
  {
    type: 'שיטת פלדנקרייז',
    category: 'רפואה אלטרנטיבית',
    length: 'ארוך',
    homework: 'לא',
    description: 'מעודדת למידה מחודשת של תנועה לשיפור פונקציות גופניות ומנטליות.',
  },
  {
    type: 'ביופידבק',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'מיועד ללימוד ניהול פונקציות גופניות דרך משוב ממוחשב.',
  },
  {
    type: 'עיסוי לימפטי (ניקוז לימפטי)',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקד בשחרור נוזלים מהגוף ותמיכה במערכת הלימפה.',
  },
  {
    type: 'שיטת פאולה',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'טיפול בתנועה לשיפור התנועתיות והגמישות של הגוף.',
  },
  {
    type: 'הומוטוקסיקולוגיה',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'עוסקת בניקוי רעלים מהגוף דרך שיטות הוליסטיות.',
  },
  {
    type: 'הדרכת הורים',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'מספקת כלים להורים לניהול יחסים והתמודדות עם אתגרי ההורות.',
  },
  {
    type: 'שיטת אלכסנדר',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקדת בשיפור תנוחת הגוף והקלה על כאבים ולחצים גופניים.',
  },
  {
    type: 'דיקור סיני אנטי אייג\'ינג',
    category: 'רפואה אלטרנטיבית',
    length: 'קצר',
    homework: 'לא',
    description: 'מיועד להאטת תהליכי הזדקנות דרך דיקור בנקודות מפתח.',
  },
  {
    type: 'אבחון אוטיזם',
    category: 'אבחון',
    length: 'קצר',
    homework: 'לא',
    description: 'בדיקות לאיתור סימפטומים של אוטיזם בילדים ומתבגרים.',
  },
  {
    type: 'היפנוזה',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'משמשת להפחתת חרדה, למידה עצמית והתמודדות עם פחדים והרגלים רעים.',
  },
  {
    type: 'העצמה אישית',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקדת בפיתוח כישורים אישיים והתמודדות עם אתגרים חיים.',
  },
  {
    type: 'טיפול ב-OCD',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'כן',
    description: 'מיועד לאנשים עם הפרעת טורדנות כפייתית, מתמקד בשליטה בטקסים.',
  },
  {
    type: 'טיפול באוטיזם',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'כן',
    description: 'מיועד לילדים ומבוגרים עם אוטיזם, מתמקד בשיפור תקשורת והתנהגות.',
  },
  {
    type: 'טיפול בדרמה',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'לא',
    description: 'משתמש בדרמה לעיבוד רגשי ופיתוח מיומנויות חברתיות.',
  },
  {
    type: 'טיפול התנהגותי דיאלקטי (DBT)',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'טיפול התנהגותי המתמקד בשליטה רגשית ומיתוג מחשבתי.',
  },
  {
    type: 'טיפול זוגי',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'כן',
    description: 'מיועד לזוגות המעוניינים לשפר את הקשר הרומנטי והתקשורת ביניהם.',
  },
  {
    type: 'טיפול לקהילה הגאה',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'מותאם לצרכים של אנשים בקהילת ה-LGBTQ+, מתמקד בתמיכה רגשית וחברתית.',
  },
  {
    type: 'טיפול מיני',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'עוסק בבעיות וחרדות מיניות, מספק כלים לשיפור החיים המיניים.',
  },
  {
    type: 'טיפול הפרעות קשב וריכוז - ADHD',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'עוזר למי שסובלים מ-ADHD לשפר תשומת לב וריכוז.',
  },
  {
    type: 'טיפול משפחתי',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'כן',
    description: 'מיועד לשיפור היחסים בתוך המשפחה ופתרון קונפליקטים.',
  },
  {
    type: 'קלינאות תקשורת',
    category: 'פונקציונלי',
    length: 'קצר',
    homework: 'לא',
    description: 'מיועדת לשיפור יכולת התקשורת, בעיקר לילדים עם לקויות תקשורת.',
  },
  {
    type: 'אבחון הפרעות קשב וריכוז',
    category: 'אבחון',
    length: 'קצר',
    homework: 'לא',
    description: 'בדיקה לאיתור סימנים ותסמינים של הפרעות קשב.',
  },
  {
    type: 'אבחון לקויי למידה',
    category: 'אבחון',
    length: 'קצר',
    homework: 'לא',
    description: 'בדיקות לזיהוי לקויות למידה ותכנון תוכניות לימוד מותאמות.',
  },
  {
    type: 'אבחון דידקטי',
    category: 'אבחון',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקד בבדיקת כישורים אקדמיים והתאמת תוכניות לימוד.',
  },
  {
    type: 'טיפול פסיכיאטרי',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'לא',
    description: 'מיועד לטיפול בהפרעות נפשיות חמורות, כולל שימוש בתרופות פסיכיאטריות.',
  },
  {
    type: 'טיפול קוגניטיבי התנהגותי (CBT)',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'טיפול המתמקד בשינוי דפוסי חשיבה והתנהגות לטיפול בהפרעות חרדה, דיכאון ועוד.',
  },
  {
    type: 'טיפול רגשי בעזרת בעלי חיים',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'משלב אינטראקציה עם חיות לצורך תמיכה רגשית ופיתוח כישורים חברתיים, מתאים לילדים ומבוגרים.',
  },
  {
    type: 'אבחון פסיכולוגי',
    category: 'אבחון',
    length: 'קצר',
    homework: 'לא',
    description: 'בדיקה לאבחון מצבים נפשיים והתאמת טיפולים פסיכולוגיים.',
  },
  {
    type: 'מיינדפולנס',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'מתמקד בתרגול מיינדפולנס ומדיטציה לשיפור הריכוז, השלווה הנפשית וניהול מתחים.',
  },
  {
    type: 'ניהול לחצים וחוסן אישי',
    category: 'רגשי',
    length: 'קצר',
    homework: 'כן',
    description: 'פותח מיומנויות לניהול לחץ וקידום חוסן נפשי, מתאים לאנשים בעלי עבודות מאומצות ולחוצות.',
  },
  {
    type: 'פוסט טראומה',
    category: 'רגשי',
    length: 'ארוך',
    homework: 'כן',
    description: 'מיועד לטיפול באנשים אחרי טראומה, מתמקד בהתמודדות עם השלכות הטראומה ושחזור התפקוד היומיומי.',
  },
  {
    type: 'NLP',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'טכניקת תקשורת ושינוי אישי המתמקדת בשימוש בשפה לשינוי דפוסי חשיבה והתנהגות.',
  },
  {
    type: 'פירוש חלומות',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'מסייע למטופלים לפענח ולהבין את משמעויות החלומות שלהם, עלול לסייע בהתמודדות עם רגשות וחוויות בלתי מודעות.',
  },
  {
    type: 'תמציות פרחי באך',
    category: 'רגשי',
    length: 'קצר',
    homework: 'לא',
    description: 'שימוש בתמציות צמחיות לטיפול במצבי רוח, חרדות ומתחים רגשיים.',
  },
  {
    type: 'אבחון נוירופסיכולוגי',
    category: 'אבחון',
    length: 'קצר',
    homework: 'לא',
    description: 'בדיקות שמאבחנות פגיעות ובעיות בתפקוד המוחי, מיועדות לאבחון מצבים כמו דמנציה, ADHD, ועוד.',
  }
];
const Tree = ({ navigateToMap }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [filteredTreatments, setFilteredTreatments] = useState([]);

  const questions = [
    { question: 'בחר קטגוריה', options: ['רגשי', 'גופני', 'תזונתי', 'פונקציונלי', 'רפואה אלטרנטיבית', 'רוגע', 'שינה', 'אבחון'] },
    { question: 'בחר אורך', options: ['קצר', 'ארוך'] },
    { question: 'בחר עבודת בית', options: ['כן', 'לא'] },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentStep].question]: answer };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Filter treatments based on answers
      const result = treatments.filter((treatment) => {
        return (
          treatment.category === newAnswers['בחר קטגוריה'] &&
          treatment.length === newAnswers['בחר אורך'] &&
          treatment.homework === newAnswers['בחר עבודת בית']
        );
      });

      // If no treatments match, show all treatments
      setFilteredTreatments(result.length > 0 ? result : treatments);
      setCurrentStep(currentStep + 1); // Move to the next step to show results
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="app-container">
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${((currentStep + 1) / (questions.length + 1)) * 100}%` }}
        />
      </div>
      {currentStep < questions.length ? (
        <>
          <BinaryQuestion
            question={questions[currentStep].question}
            options={questions[currentStep].options}
            onAnswer={handleAnswer}
          />
          <div className="navigation-buttons">
            <button className="option-button" onClick={handleBack} disabled={currentStep === 0}>
              חזור
            </button>
          </div>
        </>
      ) : (
        <>
          <TreatmentList treatments={filteredTreatments} />
          <div className="navigation-buttons">
            <button className="option-button" onClick={navigateToMap}>
              Take me to find the suitable treatment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const BinaryQuestion = ({ question, options, onAnswer }) => {
  return (
    <div className="question-wrapper">
      <div className="question-container">
        <h2>{question}</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <button key={index} className="option-button" onClick={() => onAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TreatmentList = ({ treatments }) => {
  return (
    <div className="treatment-list">
      {treatments.map((treatment, index) => (
        <div key={index} className="treatment-item" title={treatment.description}>
          <h3>{treatment.type}</h3>
          <p>{treatment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Tree;