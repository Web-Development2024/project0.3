import React, { useState } from 'react';
import './form_style.css';

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
            <h2>בואו נכיר :)</h2>
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
              onChange={handleChange}
              multiple
            />
            <br></br>
            <label htmlFor="profilePicture">העלה תמונת פרופיל:</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
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
