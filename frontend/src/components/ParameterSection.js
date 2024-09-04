//可以下拉填寫參數
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const DropdownContainer = styled.div`
//   background-color: #ccc;
//   border-radius: 8px;
//   padding: 10px;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   position: relative;
// `;

// const DropdownHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-weight: bold;
// `;

// const DropdownContent = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-top: 1px solid #aaa;
//   background-color: #ccc;
//   position: absolute;
//   top: 100%;
//   left: 0;
//   width: 100%;
//   z-index: 1000;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 0 0 8px 8px;
// `;

// const DropdownItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
//   justify-content: space-between;
// `;

// const Label = styled.label`
//   flex: 1;
//   margin-right: 10px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   flex: 2;
//   padding: 5px;
//   border-radius: 4px;
//   border: 1px solid #aaa;
// `;

// const Dropdown = ({ title, items, isOpen, onToggle }) => {
//   // Initializing each input field with a default value of '1'
//   const [inputValues, setInputValues] = useState(
//     new Array(items.length).fill('1')
//   );

//   const handleInputChange = (index, value) => {
//     const updatedInputValues = [...inputValues];
//     updatedInputValues[index] = value;
//     setInputValues(updatedInputValues);
//   };

//   return (
//     <DropdownContainer>
//       <DropdownHeader onClick={onToggle}>
//         {title}
//         {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//       </DropdownHeader>
//       {isOpen && (
//         <DropdownContent>
//           {items.map((item, index) => (
//             <DropdownItem key={index}>
//               <Label htmlFor={item}>{item}</Label>
//               <Input
//                 id={item}
//                 value={inputValues[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//               />
//             </DropdownItem>
//           ))}
//         </DropdownContent>
//       )}
//     </DropdownContainer>
//   );
// };

// export default Dropdown;


//ok, 未加提交跟收回選單
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const DropdownContainer = styled.div`
//   background-color: #ccc;
//   border-radius: 8px;
//   padding: 10px;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   position: relative;
// `;

// const DropdownHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-weight: bold;
// `;

// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Checkbox = styled.input.attrs({ type: 'checkbox' })`
//   margin-right: 10px;
//   width: 20px;
//   height: 20px;
// `;

// const DropdownContent = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-top: 1px solid #aaa;
//   background-color: #ccc;
//   position: absolute;
//   top: 100%;
//   left: 0;
//   z-index: 1000;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 0 0 8px 8px;
//   box-sizing: border-box; 
//   width: 100%;
// `;

// const DropdownItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 10px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Label = styled.label`
//   flex: 1;
//   text-align: left;
//   font-weight: bold;
//   white-space: nowrap; 
//   overflow: hidden;
//   text-overflow: ellipsis; 
//   max-width: 45%; 
// `;

// const Input = styled.input`
//   flex: 2;
//   padding: 5px;
//   border-radius: 4px;
//   border: 1px solid #aaa;
//   min-width: 100px; 
//   max-width: 50%; 
//   box-sizing: border-box; 
// `;

// const Dropdown = ({ title, items, isOpen, onToggle, checked, onCheckChange }) => {

// // Initializing each input field with a default value of '1'
//   const [inputValues, setInputValues] = useState(
//     new Array(items.length).fill('1')
//   );

//   const handleInputChange = (index, value) => {
//     const updatedInputValues = [...inputValues];
//     updatedInputValues[index] = value;
//     setInputValues(updatedInputValues);
//   };

//   return (
//     <DropdownContainer>
//       <DropdownHeader onClick={onToggle}>
//         <HeaderLeft>
//           <Checkbox checked={checked} onChange={onCheckChange} />
//           {title}
//         </HeaderLeft>
//         {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//       </DropdownHeader>
//       {isOpen && (
//         <DropdownContent>
//           {items.map((item, index) => (
//             <DropdownItem key={index}>
//               <Label htmlFor={item}>{item}</Label>
//               <Input
//                 id={item}
//                 value={inputValues[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//               />
//             </DropdownItem>
//           ))}
//         </DropdownContent>
//       )}
//     </DropdownContainer>
//   );
// };

// export default Dropdown;


//ok 但想嘗試new methoc
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';

// const DropdownContainer = styled.div`
//   background-color: #ccc;
//   border-radius: 8px;
//   padding: 10px;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   position: relative;
// `;

// const DropdownHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-weight: bold;
// `;

// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Checkbox = styled.input.attrs({ type: 'checkbox' })`
//   margin-right: 10px;
//   width: 20px;
//   height: 20px;
// `;

// const DropdownContent = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-top: 1px solid #aaa;
//   background-color: #ccc;
//   position: absolute;
//   top: 100%;
//   left: 0;
//   z-index: 1000;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 0 0 8px 8px;
//   box-sizing: border-box; 
//   width: 100%;
// `;

// const DropdownItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 10px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Label = styled.label`
//   flex: 1;
//   text-align: left;
//   font-weight: bold;
//   white-space: nowrap; 
//   overflow: hidden;
//   text-overflow: ellipsis; 
//   max-width: 45%; 
// `;

// const Input = styled.input`
//   flex: 2;
//   padding: 5px;
//   border-radius: 4px;
//   border: 1px solid #aaa;
//   min-width: 100px; 
//   max-width: 50%; 
//   box-sizing: border-box; 
// `;

// const SubmitButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   width: 100%;
//   text-align: center;

//   &:hover {
//     background-color: #45A049;
//   }
// `;

// const SuccessMessage = styled.div`
//   display: flex;
//   align-items: center;
//   color: #4CAF50;
//   font-weight: bold;
// `;

// const Dropdown = ({ title, items, isOpen, onToggle, checked, onCheckChange }) => {

//   const [inputValues, setInputValues] = useState(
//     new Array(items.length).fill('1')
//   );
//   const [submitted, setSubmitted] = useState(false);

//   const handleInputChange = (index, value) => {
//     const updatedInputValues = [...inputValues];
//     updatedInputValues[index] = value;
//     setInputValues(updatedInputValues);
//   };

//   const handleSubmit = () => {
//     // Mock API call
//     setTimeout(() => {
//       setSubmitted(true);
//       onToggle(); // Close the dropdown
//     }, 500);
//   };

//   return (
//     <DropdownContainer>
//       <DropdownHeader onClick={onToggle}>
//         <HeaderLeft>
//           <Checkbox checked={checked} onChange={onCheckChange} />
//           {submitted ? (
//             <SuccessMessage>
//               <FaCheckCircle style={{ marginRight: '5px' }} />
//               {title} - Submitted!
//             </SuccessMessage>
//           ) : (
//             title
//           )}
//         </HeaderLeft>
//         {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//       </DropdownHeader>
//       {isOpen && (
//         <DropdownContent>
//           {items.map((item, index) => (
//             <DropdownItem key={index}>
//               <Label htmlFor={item}>{item}</Label>
//               <Input
//                 id={item}
//                 value={inputValues[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//               />
//             </DropdownItem>
//           ))}
//           <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
//         </DropdownContent>
//       )}
//     </DropdownContainer>
//   );
// };

// export default Dropdown;


//為了generatic 改的版本
// components/Dropdown.js
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';

// const DropdownContainer = styled.div`
//   background-color: #ccc;
//   border-radius: 8px;
//   padding: 10px;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   position: relative;
// `;

// const DropdownHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-weight: bold;
// `;

// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Checkbox = styled.input.attrs({ type: 'checkbox' })`
//   margin-right: 10px;
//   width: 20px;
//   height: 20px;
// `;

// const DropdownContent = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-top: 1px solid #aaa;
//   background-color: #ccc;
//   position: absolute;
//   top: 100%;
//   left: 0;
//   z-index: 1000;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 0 0 8px 8px;
//   box-sizing: border-box; 
//   width: 100%;
// `;

// const DropdownItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 10px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Label = styled.label`
//   flex: 1;
//   text-align: left;
//   font-weight: bold;
//   white-space: nowrap; 
//   overflow: hidden;
//   text-overflow: ellipsis; 
//   max-width: 45%; 
// `;

// const Input = styled.input`
//   flex: 2;
//   padding: 5px;
//   border-radius: 4px;
//   border: 1px solid #aaa;
//   min-width: 100px; 
//   max-width: 50%; 
//   box-sizing: border-box; 
// `;

// const SubmitButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   width: 100%;
//   text-align: center;

//   &:hover {
//     background-color: #45A049;
//   }
// `;

// const SuccessMessage = styled.div`
//   display: flex;
//   align-items: center;
//   color: #4CAF50;
//   font-weight: bold;
// `;

// const Dropdown = ({ title, items, isOpen, onToggle, checked, onCheckChange, onSubmit }) => {
//   const [inputValues, setInputValues] = useState(new Array(items.length).fill(''));

//   const handleInputChange = (index, value) => {
//     const updatedInputValues = [...inputValues];
//     updatedInputValues[index] = value;
//     setInputValues(updatedInputValues);
//   };

//   const handleSubmit = () => {
//     onSubmit(inputValues);  
//   };

//   return (
//     <DropdownContainer>
//       <DropdownHeader onClick={onToggle}>
//         <HeaderLeft>
//           <Checkbox checked={checked} onChange={onCheckChange} />
//           {title}
//         </HeaderLeft>
//         {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//       </DropdownHeader>
//       {isOpen && (
//         <DropdownContent>
//           {items.map((item, index) => (
//             <DropdownItem key={index}>
//               <Label htmlFor={item}>{item}</Label>
//               <Input
//                 id={item}
//                 value={inputValues[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//               />
//             </DropdownItem>
//           ))}
//           <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
//         </DropdownContent>
//       )}
//     </DropdownContainer>
//   );
// };

// export default Dropdown;



//要有defaul value generatci
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';

// const DropdownContainer = styled.div`
//   background-color: #ccc;
//   border-radius: 8px;
//   padding: 10px;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   position: relative;
// `;

// const DropdownHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-weight: bold;
// `;

// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Checkbox = styled.input.attrs({ type: 'checkbox' })`
//   margin-right: 10px;
//   width: 20px;
//   height: 20px;
// `;

// const DropdownContent = styled.div`
//   margin-top: 10px;
//   padding: 10px;
//   border-top: 1px solid #aaa;
//   background-color: #ccc;
//   position: absolute;
//   top: 100%;
//   left: 0;
//   z-index: 1000;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 0 0 8px 8px;
//   box-sizing: border-box; 
//   width: 100%;
// `;

// const DropdownItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 10px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const Label = styled.label`
//   flex: 1;
//   text-align: left;
//   font-weight: bold;
//   white-space: nowrap; 
//   overflow: hidden;
//   text-overflow: ellipsis; 
//   max-width: 45%; 
// `;

// const Input = styled.input`
//   flex: 2;
//   padding: 5px;
//   border-radius: 4px;
//   border: 1px solid #aaa;
//   min-width: 100px; 
//   max-width: 50%; 
//   box-sizing: border-box; 
// `;

// const SubmitButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   width: 100%;
//   text-align: center;

//   &:hover {
//     background-color: #45A049;
//   }
// `;

// const SuccessMessage = styled.div`
//   display: flex;
//   align-items: center;
//   color: #4CAF50;
//   font-weight: bold;
// `;

// const Dropdown = ({ title, items = [], defaultValues = {}, isOpen, onToggle, checked, onCheckChange, onSubmit }) => {  
//     // 初始化 inputValues，使用 defaultValues 中的值
//     const [inputValues, setInputValues] = useState(
//       items.map(item => defaultValues[item] || '') // 使用 defaultValues 赋值，若无则为空字符串
//     );
  
  
//     const handleInputChange = (index, value) => {
//       const updatedInputValues = [...inputValues];
//       updatedInputValues[index] = value;
//       setInputValues(updatedInputValues);
//     };
  
//     const handleSubmit = () => {
//       onSubmit(inputValues);  
//     };
  
//     return (
//       <DropdownContainer>
//         <DropdownHeader onClick={onToggle}>
//           <HeaderLeft>
//             <Checkbox checked={checked} onChange={onCheckChange} />
//             {title}
//           </HeaderLeft>
//           {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//         </DropdownHeader>
//         {isOpen && (
//           <DropdownContent>
//             {items.map((item, index) => (
//               <DropdownItem key={index}>
//                 <Label htmlFor={item}>{item}</Label>
//                 <Input
//                   id={item}
//                   value={inputValues[index]}
//                   onChange={(e) => handleInputChange(index, e.target.value)}
//                 />
//               </DropdownItem>
//             ))}
//             <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
//           </DropdownContent>
//         )}
//       </DropdownContainer>
//     );
//   };
  
//   export default Dropdown;


import React from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DropdownContainer = styled.div`
  background-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const DropdownContent = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #aaa;
  background-color: #ccc;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  box-sizing: border-box; 
  width: 100%;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  flex: 1;
  text-align: left;
  font-weight: bold;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 45%; 
`;

const Input = styled.input`
  flex: 2;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #aaa;
  min-width: 100px; 
  max-width: 50%; 
  box-sizing: border-box; 
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #666666;
  }
`;

const Dropdown = ({ title, items = [], inputValues = [], isOpen, onToggle, checked, onCheckChange, onInputChange, onSubmit }) => (
  <DropdownContainer>
    <DropdownHeader onClick={onToggle}>
      <HeaderLeft>
        <Checkbox checked={checked} onChange={onCheckChange} />
        {title}
      </HeaderLeft>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </DropdownHeader>
    {isOpen && (
      <DropdownContent>
        {items.map((item, index) => (
          <DropdownItem key={index}>
            <Label htmlFor={item}>{item}</Label>
            <Input
              id={item}
              value={inputValues[index]}
              onChange={(e) => onInputChange(index, e.target.value)}
            />
          </DropdownItem>
        ))}
        <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
      </DropdownContent>
    )}
  </DropdownContainer>
);

export default Dropdown;
