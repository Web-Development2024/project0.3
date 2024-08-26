import React, { useState } from 'react';
import './Tree.css'; // Import your CSS file for styling
import TreatmentsList from './TreatmentList.jsx';


const Tree = ({ navigateToMap }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [filteredTreatments, setFilteredTreatments] = useState([]);

  const questions = [
    { question: 'בחר קטגוריה', options: ['רגשי', 'גופני', 'תזונתי', 'פונקציונלי', 'רפואה אלטרנטיבית', 'רוגע', 'שינה', 'אבחון'] },
    { question: 'בחר אורך', options: ['קצר', 'ארוך'] },
    { question: 'בחר עבודת בית', options: ['כן', 'לא'] },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentStep].question]: answer };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Filter treatments based on answers
      const result = TreatmentsList.filter((treatment) => {
        return (
          treatment.category === newAnswers['בחר קטגוריה'] &&
          treatment.length === newAnswers['בחר אורך'] &&
          treatment.homework === newAnswers['בחר עבודת בית']
        );
      });

      // If no treatments match, show all treatments
      setFilteredTreatments(result.length > 0 ? result : TreatmentsList);
      setCurrentStep(currentStep + 1); // Move to the next step to show results
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="app-container">
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${((currentStep + 1) / (questions.length + 1)) * 100}%` }}
        />
      </div>
      {currentStep < questions.length ? (
        <>
          <BinaryQuestion
            question={questions[currentStep].question}
            options={questions[currentStep].options}
            onAnswer={handleAnswer}
          />
          <div className="navigation-buttons">
            <button className="option-button" onClick={handleBack} disabled={currentStep === 0}>
              חזור
            </button>
          </div>
        </>
      ) : (
        <>
          <TreatmentList TreatmentsList={filteredTreatments} />
          <div className="navigation-buttons">
            <button className="option-button1" onClick={navigateToMap}>
              קח אותי לעמוד הטיפולים
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const BinaryQuestion = ({ question, options, onAnswer }) => {
  return (
    <div className="question-wrapper">
      <div className="question-container">
        <h2>{question}</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <button key={index} className="option-button" onClick={() => onAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TreatmentList = ({ TreatmentsList }) => {
  return (
    <div className="treatment-list">
      {TreatmentsList.map((treatment, index) => (
        <div key={index} className="treatment-item" title={treatment.description}>
          <h3>{treatment.type}</h3>
          <p>{treatment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Tree;