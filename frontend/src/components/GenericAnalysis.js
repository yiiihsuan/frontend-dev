// import React, { useState, useEffect } from 'react';
// import Dropdown from './ParameterSection.js';
// import { useMutation } from 'react-query';
// import { FaCheckCircle } from 'react-icons/fa';

// const GenericAnalysis = ({ title, config = {}, apiFunction }) => {
//   const { items = [], defaultValues = {} } = config; // 确保items和defaultValues始终有默认值
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [submitted, setSubmitted] = useState(false); // State to track if submitted


//   const [inputValues, setInputValues] = useState(
//     items.map(item => defaultValues[item] || '')
//   );


//   const { mutate: submitAnalysis } = useMutation(apiFunction, {
//     onSuccess: (data) => {
//       console.log(`${title} analysis completed:`, data);
//       setSubmitResult("Success! Analysis has been submitted.");
//       setSubmitted(true); // Mark as submitted
//       setOpenDropdown(false); // Close dropdown after successful submission
//     },
//     onError: (error) => {
//       console.error('Error:', error);
//       setSubmitResult("Failed to submit analysis.");
//     }
//   });

//   const handleSubmit = () => {
//     const params = items.reduce((acc, item, index) => {
//       acc[item] = inputValues[index];
//       return acc;
//     }, {});
//     submitAnalysis(params);
//   };

//   const toggleDropdown = () => {
//     if (!submitted) {
//       setOpenDropdown(!openDropdown);
//     }
//   };


//   return (
//     <div>
//       <Dropdown
//         title={submitted ? <><FaCheckCircle style={{ color: 'green', marginRight: '5px' }} /> {title} - Submitted</> : title}
//         items={items}
//         defaultValues={defaultValues}
//         isOpen={openDropdown}
//         onToggle={toggleDropdown}
//         checked={checked}
//         onCheckChange={() => setChecked(!checked)}
//         onSubmit={handleSubmit}
//       />
//       {submitResult && <div>{submitResult}</div>}
//     </div>
//   );
// };

// export default GenericAnalysis;


import React, { useState } from 'react';
import Dropdown from './ParameterSection';
import { useMutation } from 'react-query';
import { FaCheckCircle } from 'react-icons/fa';

const GenericAnalysis = ({ title, config = {}, apiFunction, onResult }) => {
  const { items = [], defaultValues = {} } = config;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [checked, setChecked] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  

  const [inputValues, setInputValues] = useState(
    items.map(item => defaultValues[item] || '')
  );

  const { mutate: submitAnalysis } = useMutation(apiFunction, {
    onSuccess: (data) => {
      console.log(`${title} analysis completed:`, data);
      setSubmitResult("Success! Analysis has been submitted.");
      setSubmitted(true);
      setOpenDropdown(false);
      onResult && onResult(data);
    },
    onError: (error) => {
      console.error('Error:', error);
      setSubmitResult("Failed to submit analysis.");
    }
  });

//   const handleSubmit = () => {
//     const params = items.reduce((acc, item, index) => {
//       acc[item] = inputValues[index];
//       return acc;
//     }, {});
//     submitAnalysis(params);
//   };

const handleSubmit = () => {
    const params = items.reduce((acc, item, index) => {
      // 檢查是否當前字段是 gene_sets_db
      if (item === "gene_sets_db") {
        // 使用逗號分割字符串成為數組
        acc[item] = inputValues[index].split(",").map(s => s.trim());  // 去除多餘空格
      } else {
        acc[item] = inputValues[index];
      }
      return acc;
    }, {});
  
    console.log("Submitting with parameters:", params); 
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
      {submitResult && <div>{submitResult}</div>}
    </div>
  );
};

export default GenericAnalysis;
