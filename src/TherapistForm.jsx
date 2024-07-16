import React, { useState } from 'react';
import './form_style.css';

import { db, storage} from './firebaseConfig';
import { collection, addDoc} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const TherapistForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    categories: [],
    city: '',
    address: '',
    about: '',
    discountType: '',
    documents: null,
    profilePicture: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [certificateUpload, setCertificateUpload] = useState(null);

  const FileTypes = Object.freeze({
    PROFILE_IMG: 0,
    CERTIFICATE: 1
  });

  const dbMap = {
    [FileTypes.PROFILE_IMG]: 'profile/profile_',
    [FileTypes.CERTIFICATE]: 'certificates/cert_'
  }

  const uploadFile = async (file, type, id) => {
    if (file == null) return;
    const fileName = file.name;
    const filename = dbMap[type]+ id;
    const fileRef = ref(storage, filename);
    console.log("uploading bytes");
    await uploadBytes(fileRef, file);
    console.log("getting download url");
    const downloadURL = await getDownloadURL(fileRef);
    console.log("got download url");
    return downloadURL;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        categories: checked
          ? [...prevData.categories, value]
          : prevData.categories.filter((category) => category !== value),
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addTherapistData = async () => {
    try {
      const id = v4();
      console.log("STARTING addTherapistData");
      const profile_image_path = await uploadFile(imageUpload, FileTypes.PROFILE_IMG, id);
      console.log("UPLOADED PROFILE IMAGE");
      const certificate_path = await uploadFile(certificateUpload, FileTypes.CERTIFICATE, id);
      console.log("UPLOADED CERTIFICATE");
      console.log("ADDING TO DB");
      await addDoc(collection(db, "therapist-data"), {
        name: formData.name,
        phone: formData.phone,
        categories: formData.categories,
        city: formData.city,
        address: formData.address,
        about: formData.about,
        discountType: formData.discountType,
        profile_image: profile_image_path,
        certificate: certificate_path
      });
      
      alert('הרשמתך התקבלה.');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && formData.name && formData.phone) {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.city && formData.categories.length > 0) {
      setCurrentStep(3);
    } else if (currentStep === 3 && formData.address && formData.about) {
      handleSubmit();
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    addTherapistData();
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitting) {
    return (
      <div className="form-container">
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="form-container">
        <div className="success-message">נכנסת למאגר בהצלחה!</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="step-indicators">
        <span className={`step ${currentStep === 1 ? 'active' : ''}`}>1. קצת עליי</span>
        <span className={`step ${currentStep === 2 ? 'active' : ''}`}>2. מה אני מציע?</span>
        <span className={`step ${currentStep === 3 ? 'active' : ''}`}>3. חשוב לדעת עליי</span>
      </div>
<div className='questions'>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="step-form">
            <h2>בואו נכיר :</h2>
            <label htmlFor="name">שם: *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">טלפון: *</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <div className="form-navigation">
              <button type="button" className="next-button" onClick={handleNextStep}>הבא</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-form">
            <h2>קצת על הטיפולים שלי</h2>
            <label htmlFor="categories">תחומי טיפול: *</label>
            <div id="categories" className="checkbox-container">
              <div className="scrollable-checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="categories"
                    value="טיפול 1"
                    checked={formData.categories.includes('טיפול 1')}
                    onChange={handleChange}
                  />
                  טיפול 1
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="categories"
                    value="טיפול 2"
                    checked={formData.categories.includes('טיפול 2')}
                    onChange={handleChange}
                  />
                  טיפול 2
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="categories"
                    value="טיפול 3"
                    checked={formData.categories.includes('טיפול 3')}
                    onChange={handleChange}
                  />
                  טיפול 3
                </label>
                {/* Add more checkboxes as needed */}
              </div>
            </div>
            <label htmlFor="city">עיר: *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
             <label htmlFor="address">כתובת: *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="form-navigation">
              <button type="button" className="prev-button" onClick={handlePrevStep}>הקודם</button>
              <button type="button" className="next-button" onClick={handleNextStep}>הבא</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-form">
            <h2>פרטים נוספים</h2>
           
            <label htmlFor="about">אודות: *</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="discountType">סוג הנחה:</label>
            <input
              type="text"
              id="discountType"
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
            />
            <label htmlFor="documents">העלה מסמכים:</label>
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={(event) => {setImageUpload(event.target.files[0])}}
              multiple
            />
            <br></br>
            <label htmlFor="profilePicture">העלה תמונת פרופיל:</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={(event) => {setCertificateUpload(event.target.files[0])}}
            />
            <div id="form-navigation">
              <button type="button" className="prev-button" onClick={handlePrevStep}>הקודם</button>
              <button type="submit" className="submit-button">שלח</button>
            </div>
          </div>
        )}
      </form>
      </div>
    </div>
  );
};

export default TherapistForm;
