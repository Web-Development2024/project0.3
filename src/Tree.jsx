import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3-fetch';
import './Tree.css'; // Import your CSS file for styling

const App = () => {  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [treatmentData, setTreatmentData] = useState([]);

  useEffect(() => {
    csv('C:\Users\tamar\OneDrive\Documents\GitHub\project0.3_withQ\TreatmentTag.csv').then(data => {
      // Map CSV data to treatmentData format
      const formattedData = data.map((d, index) => ({
        id: index + 1,
        type: d.Type,
        length: d.Length,
        touch: d.Touch,
        homework: d.Homework,
        description: d.Description
      }));
      setTreatmentData(formattedData);
    });
  }, []);

  const questions = [
    { question: 'Choose Type', options: ['A', 'B'] },
    { question: 'Choose Length', options: ['short', 'long'] },
    { question: 'Choose Touch', options: ['light', 'firm'] },
    { question: 'Choose Homework', options: ['none', 'some'] },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentStep].question]: answer };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Filter treatments based on answers
      const result = treatmentData.filter((treatment) => {
        return Object.keys(newAnswers).every((key) =>
          treatment[key.toLowerCase()].includes(newAnswers[key])
        );
      });
      setFilteredTreatments(result);
    }
  };

  return (
    <div className="app-container">
      {currentStep < questions.length ? (
        <BinaryQuestion
          question={questions[currentStep].question}
          options={questions[currentStep].options}
          onAnswer={handleAnswer}
        />
      ) : (
        <TreatmentList treatments={filteredTreatments} />
      )}
    </div>
  );
};

const BinaryQuestion = ({ question, options, onAnswer }) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const TreatmentList = ({ treatments }) => {
  return (
    <div className="treatment-list">
      {treatments.map((treatment) => (
        <div key={treatment.id} className="treatment-item" title={treatment.description}>
          <h3>Treatment {treatment.id}</h3>
          <p>{treatment.description}</p>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
