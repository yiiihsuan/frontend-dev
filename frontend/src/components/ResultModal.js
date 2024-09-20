// import React from 'react';
// import styled from 'styled-components';

// const ModalBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContainer = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   width: 80%;
//   max-width: 500px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// `;

// const ModalHeader = styled.h2`
//   margin-top: 0;
// `;

// const ModalContent = styled.div`
//   margin: 20px 0;
// `;

// const ModalButtons = styled.div`
//   text-align: right;
// `;

// const CloseButton = styled.button`
//   padding: 10px 20px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #45A049;
//   }
// `;

// function ResultModal({ isOpen, title, content, onClose }) {
//   if (!isOpen) return null;

//   return (
//     <ModalBackground>
//       <ModalContainer>
//         <ModalHeader>{title || "Result"}</ModalHeader>
//         <ModalContent>
//           {content}
//         </ModalContent>
//         <ModalButtons>
//           <CloseButton onClick={onClose}>Close</CloseButton>
//         </ModalButtons>
//       </ModalContainer>
//     </ModalBackground>
//   );
// }

// export default ResultModal;
