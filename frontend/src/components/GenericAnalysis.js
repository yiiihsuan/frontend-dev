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



// 目前的是送出api之後他會在原地等待 然後等response完成後才說submittted跟折疊
// import React, { useState } from 'react';
// import Dropdown from './ParameterSection';
// import { useMutation } from 'react-query';
// import { FaCheckCircle } from 'react-icons/fa';

// const GenericAnalysis = ({ title, config = {}, apiFunction, onResult }) => {
//   const { items = [], defaultValues = {} } = config;
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
  

//   const [inputValues, setInputValues] = useState(
//     items.map(item => defaultValues[item] || '')
//   );

//   const { mutate: submitAnalysis } = useMutation(apiFunction, {
//     onSuccess: (data) => {
//       console.log(`${title} analysis completed:`, data);
//       setSubmitResult("Success! Analysis has been submitted.");
//       setSubmitted(true);
//       setOpenDropdown(false);
//       onResult && onResult(data);
//     },
//     onError: (error) => {
//       console.error('Error:', error);
//       setSubmitResult("Failed to submit analysis.");
//     }
//   });

// //   const handleSubmit = () => {
// //     const params = items.reduce((acc, item, index) => {
// //       acc[item] = inputValues[index];
// //       return acc;
// //     }, {});
// //     submitAnalysis(params);
// //   };

// const handleSubmit = () => {
//     const params = items.reduce((acc, item, index) => {
//       // 檢查是否當前字段是 gene_sets_db
//       if (item === "gene_sets_db") {
//         // 使用逗號分割字符串成為數組
//         acc[item] = inputValues[index].split(",").map(s => s.trim());  // 去除多餘空格
//       } else {
//         acc[item] = inputValues[index];
//       }
//       return acc;
//     }, {});
  
//     console.log("Submitting with parameters:", params); 
//     submitAnalysis(params);
//   };
  

//   const toggleDropdown = () => {
//     if (!submitted) {
//       setOpenDropdown(!openDropdown);
//     }
//   };

//   const handleInputChange = (index, value) => {
//     const updatedInputValues = [...inputValues];
//     updatedInputValues[index] = value;
//     setInputValues(updatedInputValues);
//   };

//   return (
//     <div>
//       <Dropdown
//         title={submitted ? <><FaCheckCircle style={{ color: 'green', marginRight: '5px' }} /> {title} - Submitted</> : title}
//         items={items}
//         inputValues={inputValues}
//         isOpen={openDropdown}
//         onToggle={toggleDropdown}
//         checked={checked}
//         onCheckChange={() => setChecked(!checked)}
//         onInputChange={handleInputChange}
//         onSubmit={handleSubmit}
//       />
//       {submitResult && <div>{submitResult}</div>}
//     </div>
//   );
// };

// export default GenericAnalysis;



//這個是先submit之後 等response ok 在顯示完成分析->但好像沒成功
// import React, { useState } from 'react';
// import Dropdown from './ParameterSection';
// import { useMutation } from 'react-query';
// import { FaCheckCircle } from 'react-icons/fa';

// const GenericAnalysis = ({ title, config = {}, apiFunction, onResult }) => {
//   const { items = [], defaultValues = {} } = config;
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [submitted, setSubmitted] = useState(false);

//   const [inputValues, setInputValues] = useState(
//     items.map(item => defaultValues[item] || '')
//   );

//   const { mutate: submitAnalysis } = useMutation(apiFunction, {
//     onSuccess: (data) => {
//       console.log(`${title} analysis completed:`, data);
//       setSubmitResult("Analysis completed successfully.");
//       setSubmitted(true);
//       setOpenDropdown(false); // Collapse dropdown after submission
//       onResult && onResult(data);
//     },
//     onError: (error) => {
//       console.error('Error:', error);
//       setSubmitResult("Failed to submit analysis.");
//       setSubmitted(true); // Mark as submitted even if it fails
//     }
//   });

//   const handleSubmit = () => {
//     const params = items.reduce((acc, item, index) => {
//       if (item === "gene_sets_db") {
//         acc[item] = inputValues[index].split(",").map(s => s.trim());
//       } else {
//         acc[item] = inputValues[index];
//       }
//       return acc;
//     }, {});

//     console.log("Submitting with parameters:", params);
//     setSubmitted(true); // Mark as submitted before API call
//     submitAnalysis(params);
//   };

//   const toggleDropdown = () => {
//     if (!submitted) {
//       setOpenDropdown(!openDropdown);
//     }
//   };

//   const handleInputChange = (index, value) => {
//     const updatedInputValues = [...inputValues];
//     updatedInputValues[index] = value;
//     setInputValues(updatedInputValues);
//   };

//   return (
//     <div>
//       <Dropdown
//         title={submitted 
//           ? <><FaCheckCircle style={{ color: 'green', marginRight: '5px' }} /> {title} - Submitted</> 
//           : title}
//         items={items}
//         inputValues={inputValues}
//         isOpen={openDropdown}
//         onToggle={toggleDropdown}
//         checked={checked}
//         onCheckChange={() => setChecked(!checked)}
//         onInputChange={handleInputChange}
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

const GenericAnalysis = ({ title, config = {}, apiFunction, onResult, parseFunction}) => {
  const { items = [], defaultValues = {} } = config;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [checked, setChecked] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // New state for showing analyzing text


  const [inputValues, setInputValues] = useState(
    items.map(item => defaultValues[item] || '')
  );

  const { mutate: submitAnalysis } = useMutation(apiFunction, {
    onSuccess: (data) => {
      console.log(`${title} analysis completed:`, data);

      let parsedData = data;
      if (parseFunction) {
        parsedData = parseFunction(data);
      }
      


      setSubmitResult("Analysis completed successfully.");
      setSubmitted(true);
      // No need to fold the dropdown here, it's already done
      setIsAnalyzing(false); // End analyzing state
      onResult && onResult(data);
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


