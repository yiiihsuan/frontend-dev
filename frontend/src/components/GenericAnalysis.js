import React, { useState } from 'react';
import Dropdown from './ParameterSection';
import { useMutation } from 'react-query';
import { FaCheckCircle } from 'react-icons/fa';

const GenericAnalysis = ({ title, config = {}, apiFunction, onResult, parseFunction}) => {
  const { items = [], defaultValues = {} } = config;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [checked, setChecked] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); 


  const [inputValues, setInputValues] = useState(
    items.map(item => defaultValues[item] || '')
  );

  const saveResultToLocalStorage = (key, result) => {
    localStorage.setItem(key, JSON.stringify(result));
  };

  const { mutate: submitAnalysis } = useMutation(apiFunction, {
    onSuccess: (data) => {
      console.log(`${title} analysis completed:`, data);

      let parsedData = data;
      if (parseFunction) {
        parsedData = parseFunction(data);
      }

      saveResultToLocalStorage(`${title}Result`, parsedData);
      
      setSubmitResult("Analysis completed successfully.");
      setSubmitted(true);
      // No need to fold the dropdown here, it's already done
      setIsAnalyzing(false); // End analyzing state
      onResult && onResult(parsedData);
    },
    onError: (error) => {
      console.error('Error:', error);
      setSubmitResult("Failed to submit analysis.");
      setSubmitted(true);
      setIsAnalyzing(false);
    }
  });

  const handleSubmit = () => {
    // Immediately fold the dropdown
    setOpenDropdown(false);
      // Show analyzing text
      setIsAnalyzing(true);
    
    // Prepare parameters
    const params = items.reduce((acc, item, index) => {
      if (item === "gene_sets_db") {
        acc[item] = inputValues[index].split(",").map(s => s.trim());  // Remove extra spaces
      } else {
        acc[item] = inputValues[index];
      }
      return acc;
    }, {});
  
    console.log("Submitting with parameters:", params);
    
    // Trigger API submission
    submitAnalysis(params);
  };

  const toggleDropdown = () => {
    if (!submitted) {
      setOpenDropdown(!openDropdown);
    }
  };

  const handleInputChange = (index, value) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = value;
    setInputValues(updatedInputValues);
  };

  return (
    <div>
      <Dropdown
        title={submitted ? <><FaCheckCircle style={{ color: 'green', marginRight: '5px' }} /> {title} - Submitted</> : title}
        items={items}
        inputValues={inputValues}
        isOpen={openDropdown}
        onToggle={toggleDropdown}
        checked={checked}
        onCheckChange={() => setChecked(!checked)}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
          {isAnalyzing && <div>Analyzing...</div>} {/* Display analyzing message */}
          {submitResult && <div>{submitResult}</div>}
    </div>
  );
};

export default GenericAnalysis;


