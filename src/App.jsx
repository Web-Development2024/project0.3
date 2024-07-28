import React, { useState, useEffect } from 'react';
import TherapistCard from './TherapistCard.jsx';
import Map from './Map.jsx';
import TherapistForm from './TherapistForm.jsx';
import LandingPage from './LandingPage.jsx';
import { auth, provider, signInWithPopup, signOut, db } from './firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import axios from 'axios';
import './index.css';

const geocodeAddress = async (address) => {
  try {
    console.log(`Geocoding address: ${address}`);
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: address,
        format: 'json',
        addressdetails: 1,
        limit: 1,
      }
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      console.error('Geocoding API error: No results found for', address);
      return null;
    }
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    return null;
  }
};

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
  }, []);

  useEffect(() => {
    if (therapists.length > 0) {
      console.log('Therapists:', therapists);
      const fetchMarkers = async () => {
        const allMarkers = await Promise.all(therapists.map(async (therapist) => {
          const address = `${therapist.address}, ${therapist.city}`;
          console.log(`Fetching location for: ${address}`);
          const location = await geocodeAddress(address);
          if (location) {
            console.log(`Geocoded location for ${therapist.name}:`, location);
            return {
              lat: location.lat,
              lng: location.lng,
              name: therapist.name,
              isSelected: false,
              id: therapist.id,
            };
          } else {
            console.log(`Invalid address for therapist ${therapist.name}:`, address);
            return null;
          }
        }));
        const validMarkers = allMarkers.filter(marker => marker !== null);
        console.log('All Markers:', validMarkers);
        setMarkers(validMarkers);
      };
      fetchMarkers();
    }
  }, [therapists]);

  const getTherapists = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'therapist-data'));
      const therapistsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched Therapists Data:', therapistsData);
      setTherapists(therapistsData);
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

  const handleCardClick = async (therapist) => {
    setHoveredTherapist(null);

    const address = `${therapist.address}, ${therapist.city}`;
    console.log(`Geocoding selected therapist's address: ${address}`);
    const location = await geocodeAddress(address);

    if (location) {
      therapist.lat = location.lat;
      therapist.lng = location.lng;
      setSelectedTherapist(therapist);
      console.log('Selected Therapist:', therapist);

      const newMarkers = markers.map(marker => ({
        ...marker,
        isSelected: therapist.id === marker.id,
      }));
      setMarkers(newMarkers);
    } else {
      console.error(`Failed to geocode address for selected therapist: ${therapist.name}`);
    }
  };

  const handleFormSubmit = async (newTherapist) => {
    setCurrentPage('map');
    await getTherapists(); // Ensure the markers are updated after a new therapist is added
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
      {currentPage !== 'login' && (
        <div className="header">
          <div className='login_hi'>
            <span>Hi, {user ? user.displayName : "Guest"}</span>
            {user ? (
              <button onClick={handleSignOut}>Sign Out</button>
            ) : (
              <button onClick={handleGoogleSignIn}>Sign In</button>
            )}
          </div>
          <div className='headerButtons'>
            <button className="form-toggle-button" onClick={() => setCurrentPage('landing')}>
              בית
            </button>
            <button className="form-toggle-button" onClick={navigateToMap}>
              הצג מפה
            </button>
            <button className="form-toggle-button" onClick={navigateToForm}>
              הוסף מטפל חדש
            </button>
          </div>
        </div>
      )}
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
              <TherapistCard
                key={therapist.id}
                therapist={therapist}
                onHover={handleCardHover}
                onClick={handleCardClick}
              />
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
      {currentPage === 'form' && <TherapistForm onFormSubmit={handleFormSubmit} />}
    </div>
  );
}

export default App;
