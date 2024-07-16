import React, { useState, useEffect } from 'react';
import TherapistCard from './TherapistCard.jsx';
import Map from './Map.jsx';
import TherapistForm from './TherapistForm.jsx';
import LandingPage from './LandingPage.jsx';
import { auth, provider, signInWithPopup, signOut } from './firebaseConfig';
import './index.css';

function App() {
  const [markers, setMarkers] = useState([]);
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [hoveredTherapist, setHoveredTherapist] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const allMarkers = therapists.flatMap(therapist => therapist.address.map(addr => ({
      lat: addr.lat,
      lng: addr.lng,
      name: therapist.name,
      isSelected: false
    })));
    setMarkers(allMarkers);
  }, []);

  const therapists = [
    {
      id: 15,
      name: "טלי",
      location: "נס ציונה, ראשון לציון, רחובות",
      phone: "052-412-1880",
      about: "רפלקסולוגיה, נרות הופי",
      address: [
        { lat: 31.9060, lng: 34.8074, address: "רחובות, רוז'נסקי 23" },
        { lat: 31.9273, lng: 34.7897, address: "האיזמל 2 נס ציונה" },
        { lat: 31.9595, lng: 34.8020, address: "דוד רמז 96 קאנטרי גלי הדר" }
      ],
      description: `היי אני טלי מטפלת ורפלקסולוגית בכירה. הרפלקסולוגיה ממריצה את הדם ומועילה לשלל מחלות ובעיות רפואיות. בריפוי לאזורים בעייתים כגון: מערכת העיכול, כאבי ראש, מיגרנות, טיפול בדורבן, חרדות, מערכת החיסון, מערכת הנשימה ועוד🌺
      טיפול בנרות הופי הידועים בריפוי והעוזרים לכל מערכת אף אוזן גרון. נרות הופי יוצרים חום מקומי.
      החום יעיל לייבוש נוזלים מהאוזן ולהרגעה והואקום משחרר לחץ מהאוזן.
      • שלב אחד לפני ניתוח כפתורים.
      • הצטברות נוזלים באוזן התיכונה.
      • פתיחת תעלת השמע.
      • דלקות אוזניים חוזרות.
      • הפרעות שמיעה.
      • גודש באוזניים.
      • סינוסיטיס.
      • סטרס.
      במרחב הטיפולי בקליניקה, המעוצב באווירה רגועה, אין מקום לדאגה,
      ואת יכולה להתמקד אך ורק ברגיעה ובריפוי שלך.
      את מוזמנת לבחור את הטיפול המתאים.
      מחכה לך באהבה בקליניקה`,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwIs5QZdRwbAobrUR40lnPekzF1GbMQbcJ-A&s"
    },
    {
      id: 1,
      name: "רונן",
      location: "ירושלים",
      phone: "123-456-7890",
      about: "נטורופתיה",
      address: [
        { lat: 31.7690, lng: 35.2137, address: "ירושלים, רחוב אחד העם 5" }
      ],
      description: `שלום, אני רונן, נטורופת המתמחה בטיפול טבעי במגוון בעיות רפואיות. השיטה הנטורופתית מתמקדת בטיפולים טבעיים לחיזוק מערכות הגוף ולהשבת האיזון הפנימי. תהליכי הטיפול שלי כוללים תזונה נכונה, תוספי תזונה, טיפולי גוף ונפש ועוד.
      מחכה לפגוש אותך בקליניקה שלי בירושלים.`,
      imageUrl: "https://www.alhasapa.co.il/%D7%A6%D7%91%D7%99%D7%A7%D7%94-%D7%95%D7%A0%D7%93%D7%A8.jpg"
    },
    {
      id: 2,
      name: "אלון",
      location: "תל אביב",
      phone: "234-567-8901",
      about: "NLP",
      address: [
        { lat: 32.0622, lng: 34.7719, address: "תל אביב, רחוב יהודה הלוי 10" }
      ],
      description: `היי, אני אליס, מומחית ב-NLP. השיטה מאפשרת שינויים תת-הכרתיים ומסייעת להתמודדות עם פחדים, לחצים, דפוסי התנהגות מזיקים ועוד. בטיפולי NLP אני מספקת כלים רבי עוצמה לשיפור איכות החיים והעצמה אישית.
      אשמח לראותך בקליניקה בתל אביב.`,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4ljPXu4bwd7TR7m2CvVMspAFHVE1qiDU5Q&s"
    },
    {
      id: 3,
      name: "בוב",
      location: "רמת גן",
      phone: "345-678-9012",
      about: "פסיכולוגיה",
      address: [
        { lat: 32.0823, lng: 34.8148, address: "רמת גן, רחוב הרצל 50" }
      ],
      description: `שלום, אני בוב, פסיכולוג מוסמך המתמחה בטיפול פרטני, זוגי ומשפחתי. אני מסייע ללקוחותיי להתמודד עם משברים, לחצים נפשיים, בעיות בזוגיות ועוד. בקליניקה שלי אני מציע סביבה בטוחה ותומכת לכל טיפול.
      אשמח לעזור לך ברמת גן.`,
      imageUrl: "https://example.com/image3.jpg"
    },
    {
      id: 4,
      name: "צ'רלי",
      location: "באר שבע",
      phone: "456-789-0123",
      about: "פסיכותרפיה",
      address: [
        { lat: 31.2454, lng: 34.8006, address: "באר שבע, רחוב הנגב 25" }
      ],
      description: `היי, אני צ'רלי, פסיכותרפיסטית עם ניסיון רב בטיפול רגשי ונפשי. אני עוסקת בטיפולי CBT, טיפול דינמי, טיפול בילדים ונוער ועוד. המטרה שלי היא לסייע לך להתמודד עם קשיים ולשפר את איכות חייך.
      מחכה לך בקליניקה בבאר שבע.`,
      imageUrl: "https://example.com/image4.jpg"
    },
    {
      id: 5,
      name: "דוד",
      location: "ירושלים",
      phone: "567-890-1234",
      about: "ייעוץ זוגי",
      address: [
        { lat: 31.7767, lng: 35.2299, address: "ירושלים, רחוב המלך דוד 30" }
      ],
      description: `שלום, אני דוד, יועץ זוגי מוסמך עם התמחות בטיפול זוגי ומשפחתי. אני מסייע לזוגות לשפר את התקשורת, להתמודד עם קונפליקטים ולחזק את הקשר ביניהם. כל מפגש הוא הזדמנות לצמיחה זוגית ולחיזוק האהבה.
      אשמח לעזור לכם בקליניקה בירושלים.`,
      imageUrl: "https://example.com/image5.jpg"
    },
    {
      id: 6,
      name: "אוה",
      location: "תל אביב",
      phone: "678-901-2345",
      about: "תרפיה באומנות",
      address: [
        { lat: 32.0804, lng: 34.7805, address: "תל אביב, רחוב דיזנגוף 15" }
      ],
      description: `היי, אני אוה, מטפלת באומנות עם ניסיון בטיפול בילדים ומבוגרים. תרפיה באומנות מאפשרת ביטוי עצמי דרך יצירה, ומסייעת בהתמודדות עם רגשות ובפיתוח תקשורת חיובית. בקליניקה שלי אנו משתמשים בטכניקות שונות של אמנות לטיפול רגשי.
      מצפה לפגוש אותך בתל אביב.`,
      imageUrl: "https://example.com/image6.jpg"
    },
    {
      id: 7,
      name: "פרנק",
      location: "רמת גן",
      phone: "789-012-3456",
      about: "טיפול התנהגותי",
      address: [
        { lat: 32.0684, lng: 34.8248, address: "רמת גן, רחוב בן גוריון 12" }
      ],
      description: `שלום, אני פרנק, מטפל התנהגותי המתמחה בטיפול קוגניטיבי-התנהגותי (CBT). אני עוזר לאנשים להתמודד עם בעיות כמו חרדות, דיכאון, קשיים בתפקוד יומיומי ועוד. יחד נבנה תכנית טיפול מותאמת אישית לשיפור איכות החיים.
      מוזמן לפגוש אותי בקליניקה ברמת גן.`,
      imageUrl: "https://example.com/image7.jpg"
    },
    {
      id: 8,
      name: "חנה",
      location: "באר שבע",
      phone: "890-123-4567",
      about: "טיפול משפחתי",
      address: [
        { lat: 31.2610, lng: 34.7972, address: "באר שבע, רחוב השחר 8" }
      ],
      description: `היי, אני חנה, מטפלת משפחתית מוסמכת עם התמחות בטיפול מערכתי. אני מסייעת למשפחות לשפר את התקשורת, להתמודד עם משברים ולחזק את הקשרים ביניהם. בקליניקה שלי אנו עובדים יחד להשגת הרמוניה משפחתית.
      אשמח לעזור לכם בבאר שבע.`,
      imageUrl: "https://example.com/image8.jpg"
    },
    {
      id: 9,
      name: "איוואן",
      location: "ירושלים",
      phone: "901-234-5678",
      about: "פסיכואנליזה",
      address: [
        { lat: 31.7845, lng: 35.2242, address: "ירושלים, רחוב בן יהודה 20" }
      ],
      description: `שלום, אני איוואן, פסיכואנליטיקאי עם התמחות בטיפול נפשי עמוק. הטיפול הפסיכואנליטי מאפשר חקירה מעמיקה של התת-מודע, והבנה של דפוסי התנהגות ורגשות. יחד נצא למסע להבנה עצמית ושיפור איכות החיים.
      מצפה לראותך בקליניקה בירושלים.`,
      imageUrl: "https://example.com/image9.jpg"
    },
    {
      id: 10,
      name: "יוליה",
      location: "תל אביב",
      phone: "012-345-6789",
      about: "פסיכודרמה",
      address: [
        { lat: 32.1133, lng: 34.8044, address: "תל אביב, רחוב חיים לבנון 40" }
      ],
      description: `היי, אני יוליה, מטפלת בפסיכודרמה עם ניסיון בעבודה עם ילדים, נוער ומבוגרים. פסיכודרמה היא שיטה טיפולית שמאפשרת ביטוי וחקירה של רגשות דרך משחק ותיאטרון. בטיפולי פסיכודרמה ניצור מרחב בטוח לביטוי עצמי וצמיחה אישית.
      מחכה לך בקליניקה בתל אביב.`,
      imageUrl: "https://example.com/image10.jpg"
    },
    {
      id: 11,
      name: "קווין",
      location: "רמת גן",
      phone: "123-456-7891",
      about: "תרפיה בתנועה",
      address: [
        { lat: 32.0826, lng: 34.8153, address: "רמת גן, רחוב הראל 22" }
      ],
      description: `שלום, אני קווין, מטפל בתנועה עם התמחות בטיפול רגשי דרך תנועה וריקוד. תרפיה בתנועה מאפשרת חיבור עמוק לגוף ולרגשות, ומשפרת את ההרגשה הכללית והבריאות הנפשית. בקליניקה שלי אנו עובדים בתנועה לשחרור מתחים והעצמה אישית.
      אשמח לפגוש אותך ברמת גן.`,
      imageUrl: "https://example.com/image11.jpg"
    },
    {
      id: 12,
      name: "לילי",
      location: "באר שבע",
      phone: "234-567-8910",
      about: "טיפול קוגניטיבי",
      address: [
        { lat: 31.2674, lng: 34.7958, address: "באר שבע, רחוב הנשיאים 3" }
      ],
      description: `היי, אני לילי, מטפלת קוגניטיבית עם ניסיון בטיפול במגוון בעיות נפשיות. הטיפול הקוגניטיבי מתמקד בזיהוי ושינוי דפוסי חשיבה מזיקים, ומשפר את ההתמודדות עם קשיים רגשיים והתנהגותיים. יחד נבנה כלים לשיפור איכות החיים.
      מצפה לראותך בקליניקה בבאר שבע.`,
      imageUrl: "https://example.com/image12.jpg"
    },
    {
      id: 13,
      name: "מייק",
      location: "ירושלים",
      phone: "345-678-9012",
      about: "הדרכת הורים",
      address: [
        { lat: 31.7683, lng: 35.2137, address: "ירושלים, רחוב עזה 10" }
      ],
      description: `שלום, אני מייק, מדריך הורים מוסמך עם ניסיון בעבודה עם הורים וילדים. הדרכת הורים מסייעת בהבנת צרכי הילדים ובבניית תקשורת חיובית ומכילה. יחד נלמד כלים לשיפור היחסים ולחיזוק הקשר המשפחתי.
      מחכה לכם בקליניקה בירושלים.`,
      imageUrl: "https://example.com/image13.jpg"
    },
    {
      id: 14,
      name: "ניקול",
      location: "תל אביב",
      phone: "456-789-0123",
      about: "תרפיה במוזיקה",
      address: [
        { lat: 32.0853, lng: 34.7818, address: "תל אביב, רחוב החשמונאים 16" }
      ],
      description: `היי, אני ניקול, מטפלת במוזיקה עם התמחות בעבודה עם ילדים ומבוגרים. תרפיה במוזיקה מאפשרת ביטוי רגשי דרך צלילים ומוזיקה, ומשפרת את הרגשת הבריאות הנפשית והפיזית. בטיפולים שלי אנו משתמשים במוזיקה ככלי לריפוי והעצמה.
      מחכה לפגוש אותך בקליניקה בתל אביב.`,
      imageUrl: "https://example.com/image14.jpg"
    }
  ];
  

  const handleCardHover = (therapist) => {
    setHoveredTherapist(therapist);
  };

  const handleCardClick = (therapist) => {
    setHoveredTherapist(null);
    setSelectedTherapist(therapist);
    const newMarkers = markers.map(marker => ({
      ...marker,
      isSelected: therapist.address.some(addr => addr.lat === marker.lat && addr.lng === marker.lng)
    }));
    setMarkers(newMarkers);
  };

  const handleFormSubmit = () => {
    setCurrentPage('map');
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in successfully!");
      setCurrentPage('form');
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCurrentPage('landing');
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const navigateToForm = () => {
    if (user) {
      setCurrentPage('form');
    } else {
      setCurrentPage('login');
    }
  };

  const navigateToMap = () => {
    setCurrentPage('map');
    if (!userLocation) {
      requestUserLocation();
    }
  };

  const requestUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error obtaining location:', error);
          alert('Could not obtain your location. Please allow location access and try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container">
      <div className={`header-container ${currentPage === 'landing' ? 'sticky-header' : ''}`}>
        <div className="header">
          <div className='login_hi'>
            <span>היי, {user ? user.displayName : "Guest"}</span>
            {user ? (
              <button onClick={handleSignOut}>Sign Out</button>
            ) : (
              <button onClick={handleGoogleSignIn}>Sign In</button>
            )}
          </div>
          <div className='headerButtons'>
            <button className="form-toggle-button" onClick={navigateToMap}>הטיפולים שלנו</button>
            <button className="form-toggle-button" onClick={navigateToForm}> רוצה לטפל</button>
            <button className="form-toggle-button" onClick={() => setCurrentPage('landing')}>בית</button>
          </div>
        </div>
      </div>

      {currentPage === 'login' && (
        <div className="login-modal">
          <button className="google-signin-button" onClick={handleGoogleSignIn}>Sign in with Google</button>
          <button className="skip-button" onClick={() => setCurrentPage('landing')}>Maybe Later</button>
        </div>
      )}
      {currentPage === 'landing' && <LandingPage navigateToMap={() => setCurrentPage('map')} />}
      {currentPage === 'map' && (
        <div className="main-content">
          <div className="list-section">
            {therapists.map((therapist) => (
              <div 
                key={therapist.id} 
                onMouseEnter={() => handleCardHover(therapist)}
                onMouseLeave={() => handleCardHover(null)}
                onClick={() => handleCardClick(therapist)}
              >
                <TherapistCard therapist={therapist} />
              </div>
            ))}
          </div>
          <div className="map-section">
            <Map markers={markers} userLocation={userLocation} selectedTherapist={selectedTherapist} />
          </div>
          {hoveredTherapist && (
            <div className="hovered-therapist-info">
              <div className="modal-content">
                <h2>{hoveredTherapist.name}</h2>
                <p>{hoveredTherapist.phone}</p>
                <p>{hoveredTherapist.about}</p>
                <p>{hoveredTherapist.description}</p>
                <img src={hoveredTherapist.imageUrl} alt={hoveredTherapist.name} />
              </div>
            </div>
          )}
        </div>
      )}
      {currentPage === 'form' && <TherapistForm onFormSubmit={handleFormSubmit} navigateToMap={navigateToMap} />}
    </div>
  );
}

export default App;
