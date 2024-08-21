// src/FilterSection.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TreatmentsList from './TreatmentList.jsx';
import fetchCities from './FetchCities.jsx';

const FilterSection = ({ onFilter }) => {
    const initialCriteria = { location: [], therapyType: [] };
    const [filterCriteria, setFilterCriteria] = useState(initialCriteria);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const loadCities = async () => {
          const cityOptions = await fetchCities();
          setCities(cityOptions);
        };
        loadCities();
      }, []);

    const handleLocationChange = (selectedOptions) => {
        const selectedLocations = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFilterCriteria({
          ...filterCriteria,
          location: selectedLocations,
        });
      };

  const handleTherapyTypeChange = (selectedOptions) => {
    const selectedTherapies = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFilterCriteria({
      ...filterCriteria,
      therapyType: selectedTherapies,
    });
  };

  const applyFilter = () => {
    onFilter(filterCriteria);
  };

  const clearFilters = () => {
    setFilterCriteria(initialCriteria);
    onFilter(initialCriteria);
  };

  return (
    <div className="filter-section">
      <label>
        עיר
        <Select
		  isMulti		 
          name="location"
          options={cities}
          value={cities.filter(option => filterCriteria.location.includes(option.value))}
          onChange={handleLocationChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </label>
      <label>
        סוג הטיפול
        <Select
          isMulti
          name="therapyType"
          options={TreatmentsList.map((treatment) => ({
            label: treatment.type,
            value: treatment.type,
          }))}
          value={TreatmentsList.filter(treatment => filterCriteria.therapyType.includes(treatment.type)).map(treatment => ({
            label: treatment.type,
            value: treatment.type
          }))}
          onChange={handleTherapyTypeChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </label>
      <button onClick={applyFilter}>סנן</button>
      <button onClick={clearFilters}>נקה סינון</button>
    </div>
  );
};

export default FilterSection; 
