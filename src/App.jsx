import React, { useState, useEffect } from 'react';
import TherapistCard from './TherapistCard.jsx';
import Map from './Map.jsx';
import TherapistForm from './TherapistForm.jsx';
import LandingPage from './LandingPage.jsx';
import Tree from './Tree.jsx';
import { auth, provider, signInWithPopup, signOut, db } from './firebaseConfig';
import { collection, getDocs, getDoc, doc} from "firebase/firestore";

import './index.css';

function App() {
  const [markers, setMarkers] = useState([]);
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [hoveredTherapist, setHoveredTherapist] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getTherapists();
    const allMarkers = therapists.flatMap(therapist => therapist.address.map(addr => ({
      lat: addr.lat,
      lng: addr.lng,
      name: therapist.name,
      isSelected: false
    })));
    setMarkers(allMarkers);
  }, []);

  const getTherapists = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, 'therapist-data'));
      const therapistsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTherapists(therapistsData);
      console.log("setTherapists");
    } 
    catch (error) {
      console.error("Error fetching therapists data: ", error);
    } 
    finally {
      setLoading(false);
  }
  };

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

  const fetchProfilePicture = async (imageId) => {
    const docRef = doc(db, profile, imageId);
    const docSnap = await getDoc(docRef);
  }

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
      <div>
      {currentPage === 'landing' && <LandingPage navigateToTree={() => setCurrentPage('tree')} />}
      {currentPage === 'tree' && <Tree />}
      {/* Include other pages similarly */}
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
                <img src={hoveredTherapist.profile_image} alt={hoveredTherapist.name} />
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
