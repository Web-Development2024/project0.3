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
    profilePicture: null,  // Add profile picture state
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit();  // Redirect back to the main page immediately

    // Below code can be kept for actual form submission if needed
    // const formEntries = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   if (key === 'documents' || key === 'profilePicture') {
    //     Array.from(formData[key]).forEach((file) => {
    //       formEntries.append(key, file);
    //     });
    //   } else if (key === 'categories') {
    //     formData.categories.forEach((category) => {
    //       formEntries.append('categories', category);
    //     });
    //   } else {
    //     formEntries.append(key, formData[key]);
    //   }
    // });

    // fetch('/api/therapists', {
    //   method: 'POST',
    //   body: formEntries,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //     alert('Form submitted successfully!');
    //     onFormSubmit();  // Redirect back to the main page
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     alert('Form submission failed.');
    //   });
  };

  return (
    <div className="form-container">
      <h2>רישום מטפל</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">שם:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">טלפון:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="categories">תחומי טיפול:</label>
        <div id="categories" className="checkbox-container" required>
          <div className="scrollable-checkbox">
            {/* Add your checkbox inputs here */}
          </div>
        </div>

        <label htmlFor="city">עיר:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">כתובת:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="about">אודות:</label>
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

        <label htmlFor="profilePicture">העלה תמונת פרופיל:</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleChange}
        />

        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default TherapistForm;
