import React, { useState, useEffect } from 'react';
import './landing_style.css';
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
import emailjs from 'emailjs-com';


const SoldierWellnessPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.querySelector('.spa-container').classList.add('blur');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.querySelector('.spa-container').classList.remove('blur');
  };

  const sendEmail = (e) => {
    e.preventDefault();


    emailjs.sendForm('service_sfyq7ep', 'template_cbnou14', e.target, '17xLfBhFm0hHMgUhk')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
        closeModal();
      }, (error) => {
        console.error('Failed to send message:', error);
        alert('Failed to send message. Please try again later.');
      });
  };

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
          <h1>HEROCARE Wellness</h1>
          <h2>הדרך החכמה לנצל את המענק</h2>
        </div>
      </header>

      <main className="spa-main">
        <section className="spa-info fade-in parallax" 
        style={{ backgroundImage: `url(${spaImage5})` }}
        >
          <div className="overlay">
            <h2>ברוכים הבאים ל-HEROCARE Wellness</h2>
            <p>
              אצלנו תמצאו את המטפלים הכי טובים, במחירים הכי משתלמים, ובדרך הכי נוחה!<br></br> הכל כדי להקל עליכם את התהליך, שלא תצטרכו לעבוד קשה יותר משכבר עבדתם.
            </p>
          </div>
        </section>

{/* <section className="about-us fade-in">
          <h2>About Us</h2>
          <p>
            HEROCARE Wellness is dedicated to providing affordable and relaxing treatments for soldiers and reservists. Our mission is to support the well-being of those who serve by offering access to high-quality alternative therapies and massages.
          </p>
        </section> */}

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

        <section className="latest-news fade-in">
          <h2>Latest News</h2>
          <div className="news-grid">
            <div className="news-item">
              <img src={soldierImage7} alt="News 1" />
              <h3>New Massage Therapies Available</h3>
              <p>Discover our new range of massage therapies now available for soldiers and reservists.</p>
            </div>
            <div className="news-item">
              <img src={soldierImage9} alt="News 2" />
              <h3>Yoga and Meditation Workshops</h3>
              <p>Join our upcoming yoga and meditation workshops to improve your mental and physical health.</p>
            </div>
            <div className="news-item">
              <img src={soldierImage10} alt="News 3" />
              <h3>Special Discounts for Reservists</h3>
              <p>Take advantage of our special discounts on all treatments for reservists this month.</p>
            </div>
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
          <button className="contact-button" onClick={openModal}>מטפלים צור קשר</button>
          <button className="contact-button">לטיפולים</button>
        </div>
      </main>

      <footer className="spa-footer fade-in">
        <p>© 2024 HEROCARE Wellness. כל הזכויות שמורות.</p>
        <p>צור קשר: info@herocarewellness.com | 03-1234567</p>
        <p>כתובת: רחוב הירקון 123, תל אביב</p>
      </footer>

       {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-modal" onClick={closeModal}>&times;</span>
            <form className="contact-form" onSubmit={sendEmail}>
              <h2>צור קשר</h2>
              <label>שם:</label>
              <input type="text" name="from_name" required />
              <label>טלפון:</label>
              <input type="text" name="phone" required />
              <label>אימייל:</label>
              <input type="email" name="reply_to" required />
              <label>הודעה:</label>
              <textarea name="message" required></textarea>
              <button type="submit">שלח</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoldierWellnessPage;
