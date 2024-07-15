import React, { useEffect } from 'react';
import './landing_style.css';
import spaImage1 from './images/spa1.jpeg';
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="spa-container">
      <header className="spa-header" style={{ backgroundImage: `url(${spaImage8})` }}>
        <div className="header-content">
          <img src={logo} alt="HEROCARE Logo" className="logo" />
          <h1>HEROCARE Wellness</h1>
          <h2>מציאת טיפולים זולים לחיילים וחיילות המילואים</h2>
        </div>
      </header>

      <main className="spa-main">
        <section className="spa-info fade-in">
          <h2>ברוכים הבאים ל-HEROCARE Wellness</h2>
          <p>
            המקום המושלם למצוא טיפולים זולים ומרגיעים לחיילים וחיילות המילואים. אנו כאן לעזור לכם למצוא טיפולים אלטרנטיביים ועיסויים במחירים נוחים.
          </p>
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
              <img src={spaImage8} alt="Alternative Medicine" />
              <h3>רפואה אלטרנטיבית</h3>
              <p>טיפולים אלטרנטיביים כמו דיקור סיני, ארומתרפיה ורייקי.</p>
            </div>
            <div className="service-card">
              <img src={spaImage9} alt="Yoga" />
              <h3>סדנאות יוגה ומדיטציה</h3>
              <p>סדנאות לשיפור הבריאות הנפשית והפיזית.</p>
            </div>
            <div className="service-card">
              <img src={spaImage10} alt="Facial Treatments" />
              <h3>טיפולי פנים</h3>
              <p>טיפולי פנים לשיפור בריאות העור והענקת זוהר.</p>
            </div>
          </div>
        </section>

        <section className="alternative-medicine fade-in">
          <h2>מהי רפואה אלטרנטיבית?</h2>
          <div className="medicine-grid">
            <div className="medicine-item">
              <img src={spaImage8} alt="Acupuncture" />
              <div className="text">
                <h3>דיקור סיני</h3>
                <p>טיפול שמקדם ריפוי טבעי ומפחית מתחים על ידי הכנסת מחטים לנקודות מסוימות בגוף.</p>
              </div>
            </div>
            <div className="medicine-item">
              <img src={spaImage8} alt="Aromatherapy" />
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
          <div className="testimonial-item">
            <p>"החוויה עם HEROCARE הייתה מדהימה. מצאתי טיפולים איכותיים במחירים נוחים מאוד." - שרית</p>
          </div>
          <div className="testimonial-item">
            <p>"הטיפולים עזרו לי להירגע אחרי שירות אינטנסיבי. ממליץ בחום!" - יואב</p>
          </div>
          <div className="testimonial-item">
            <p>"דיקור סיני וארומתרפיה עזרו לי להיפטר מהכאב כרוני ולמצוא רוגע." - דניאל</p>
          </div>
        </section>

        <section className="press fade-in">
          <div className="press-background" style={{ backgroundImage: `url(${pressImage})` }}>
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
