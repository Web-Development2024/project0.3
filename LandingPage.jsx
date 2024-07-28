import React, { useEffect } from 'react';
import './landing_style.css';  // Main styles import
import spaImage1 from './images/spa1.jpeg';
import spaImage2 from './images/spa2.jpeg';
import spaImage3 from './images/spa3.jpeg';
import spaImage4 from './images/spa4.jpeg';
import spaImage5 from './images/spa5.jpeg';
import spaImage6 from './images/spa6.jpeg';
import spaImage8 from './images/spa8.jpeg';
import spaImage9 from './images/spa9.jpeg';
import spaImage10 from './images/spa10.jpeg';
import soldierImage7 from './images/soldier7.jpeg';
import soldierImage9 from './images/soldier9.jpeg';
import soldierImage10 from './images/soldier10.jpeg';
import logo from './images/logo.png';
import pressImage from './images/press-background.jpeg';

const SoldierWellnessPage = () => {
  useEffect(() => {
    // Setup the intersection observer for the fade-in effect
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    elements.forEach(element => {
      observer.observe(element);
    });

    // Cleanup the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  const handleButtonClick = () => {
    console.log("Button clicked");
    alert("Button clicked! Navigating to the questionnaire...");
    window.location.href = '/april/index.html'; // Ensure this path is correct
  };

  return (
    <div className="spa-container">
      <header className="spa-header" style={{ backgroundImage: `url(${spaImage8})` }}>
        <div className="header-content">
          <h1>HEROCARE Wellness</h1>
          <h2>הדרך החכמה לנצל את המענק</h2>
        </div>
      </header>

      <main className="spa-main">
        <section className="spa-info fade-in parallax" style={{ backgroundImage: `url(${spaImage5})` }}>
          <div className="overlay">
            <h2>ברוכים הבאים ל-HEROCARE Wellness</h2>
            <p>אצלנו תמצאו את המטפלים הכי טובים, במחירים הכי משתלמים, ובדרך הכי נוחה!<br /> הכל כדי להקל עליכם את התהליך, שלא תצטרכו לעבוד קשה יותר משכבר עבדתם.</p>
          </div>
        </section>

        <section className="questionire">
          <h2>בואו להבין מהו הטיפול שאתם מחפשים בכמה שאלות בלבד!</h2>
          <button className='testBut' onClick={handleButtonClick}>
            לשאלון ההכוונה שלנו -{'>'}
          </button>
        </section>

        <section className="services fade-in">
          <h2>השירותים שלנו</h2>
          <div className="service-grid">
            <div className="service-card">
              <img src={spaImage1} alt="Massage" />
              <h3>עיסויים</h3>
              <p>רשימת מטפלים שמציעים עיסויים מרגיעים במחירים נוחים.</p>
            </div>
            <div className="service-card">
              <img src={spaImage2} alt="Alternative Medicine" />
              <h3>רפואה אלטרנטיבית</h3>
              <p>טיפולים אלטרנטיביים כמו דיקור סיני, ארומתרפיה ורייקי.</p>
            </div>
            <div className="service-card">
              <img src={spaImage3} alt="Yoga" />
              <h3>סדנאות יוגה ומדיטציה</h3>
              <p>סדנאות לשיפור הבריאות הנפשית והפיזית.</p>
            </div>
            <div className="service-card">
              <img src={spaImage4} alt="Facial Treatments" />
              <h3>טיפולי פנים</h3>
              <p>טיפולי פנים לשיפור בריאות העור והענקת זוהר.</p>
            </div>
          </div>
        </section>

        <section className="alternative-medicine fade-in">
          <h2>מהי רפואה אלטרנטיבית?</h2>
          <div className="medicine-grid">
            <div className="medicine-item">
              <img src={spaImage6} alt="Acupuncture" />
              <div className="text">
                <h3>דיקור סיני</h3>
                <p>טיפול שמקדם ריפוי טבעי ומפחית מתחים על ידי הכנסת מחטים לנקודות מסוימות בגוף.</p>
              </div>
            </div>
            <div className="medicine-item">
              <img src={spaImage9} alt="Aromatherapy" />
              <div className="text">
                <h3>ארומתרפיה</h3>
                <p>שימוש בשמנים אתריים טבעיים מצמחים ליצירת תחושת רוגע ותמיכה בבריאות.</p>
              </div>
            </div>
            <div className="medicine-item">
              <img src={spaImage10} alt="Reiki" />
              <div className="text">
                <h3>רייקי</h3>
                <p>טיפול אנרגטי שמתבצע על ידי הנחת ידיים להעברת אנרגיה מרפאה לגוף.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials fade-in">
          <h2>עדויות</h2>
          <div className="testimonial-carousel">
            <div className="testimonial-item">
              <p>"החוויה עם HEROCARE הייתה מדהימה. מצאתי טיפולים איכותיים במחירים נוחים מאוד." - שרית</p>
            </div>
            <div className="testimonial-item">
              <p>"הטיפולים עזרו לי להירגע אחרי שירות אינטנסיבי. ממליץ בחום!" - יואב</p>
            </div>
            <div className="testimonial-item">
              <p>"דיקור סיני וארומתרפיה עזרו לי להיפטר מהכאב כרוני ולמצוא רוגע." - דניאל</p>
            </div>
          </div>
        </section>

        <section className="press fade-in" style={{ backgroundImage: `url(${pressImage})` }}>
          <h2>בעיתונות</h2>
          <div className="press-testimonial">
            <p>"מצוינות בשירות ומקצועיות ללא פשרות. השירותים של HEROCARE שיפרו את איכות החיים של חיילי המילואים שלנו." - עיתון צה"ל</p>
          </div>
          <div className="press-testimonial">
            <p>"חווית טיפול מרגיעה ונעימה במחירים נוחים לחיילים. מומלץ מאוד." - עיתון הבריאות</p>
          </div>
          <div className="press-testimonial">
            <p>"היכולת למצוא טיפולים איכותיים במחירים מוזלים עושה את כל ההבדל לחיילים המילואים." - עיתון הבריאות והחיים</p>
          </div>
        </section>

        <div className="button-container fade-in">
          <button className="contact-button">מטפלים צור קשר</button>
          <button className="contact-button">לטיפולים</button>
        </div>
      </main>

      <footer className="spa-footer fade-in">
        <p>© 2024 HEROCARE Wellness. כל הזכויות שמורות.</p>
        <p>צור קשר: info@herocarewellness.com | 03-1234567</p>
        <p>כתובת: רחוב הירקון 123, תל אביב</p>
      </footer>
    </div>
  );
};

export default SoldierWellnessPage;
