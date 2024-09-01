// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CONFIG from '../../config';
// import ImagePopUp from '../general/ImagePopUp/ImagePopUp';
// import styled from 'styled-components';


// const ResultContainer = styled.div`
//   margin-top: 20px;
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 20px;
// `;

// const GridItem = styled.div`
//   position: relative;
//   cursor: pointer;

//   img {
//     width: 100%;
//     height: auto;
//     border-radius: 8px;
//   }

//   .grid-item-title {
//     margin-top: 10px;
//     font-weight: bold;
//     text-align: center;
//   }

//   .zoom-icon {
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     font-size: 24px;
//     color: rgba(0, 0, 0, 0.7);
//     transition: color 0.3s ease;
//   }

//   &:hover .zoom-icon {
//     color: #007bff;
//   }
// `;

// const GSEANoDeseq = ({ formData }) => {
//   const [plots, setImages] = useState({});
//   const projectId = localStorage.getItem('currentProjectId');

//   const doGSEAnoDESeq = async () => {
//     try {
//       const response = await axios.post(`${CONFIG.API_BASE_URL}/gsea/${projectId}/nodeseq/`, formData);
//       console.log(response.data);
//       if (response.status === 200) {
//         setImages(response.data);
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         console.error('Error data:', error.response.data);
//         alert(`Error: ${JSON.stringify(error.response.data.detail)}`);
//       } else {
//         console.error('Error:', error);
//         alert(`Error: ${error.message}`);
//       }
//     }
//   };

//   useEffect(() => {
//     doGSEAnoDESeq();
//   }, []);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalImageUrl, setModalImageUrl] = useState(null);
//   const [imageTitle, setImageTitle] = useState(null);

//   const handleImageClick = (url, title) => {
//     setModalImageUrl(url);
//     setIsModalOpen(true);
//     setImageTitle(title);
//   }

//   return (
//     <ResultContainer>
//       <h4>DESeq GSEA Results</h4>

//       <GridContainer>
//         {Object.entries(plots).map(([filename, url]) => {
//           // Only handle images that match the pattern (feel free to adapt)
//           if (filename.match(/^(enrichment_network_plot|enrichment_heatmap|gseaplot_\d+)\.png$/)) {
//             return (
//               <GridItem 
//                 key={filename} 
//                 onClick={() => handleImageClick(url, filename.replace('.png', ''))}
//               >
//                 <img src={url} alt={filename.replace('.png', '')} />
//                 <div className="zoom-icon">🔍</div>
//                 <div className="grid-item-title">{filename.replace('.png', '').replace('_', ' ')}</div>
//               </GridItem>
//             );
//           }
//           return null; // If not the specified pattern, return null
//         })}
//       </GridContainer>

//       <ImagePopUp 
//         isOpen={isModalOpen} 
//         title={imageTitle} 
//         imageUrl={modalImageUrl} 
//         onClose={() => setIsModalOpen(false)} 
//       />
//     </ResultContainer>
//   );
// };

// export default GSEANoDeseq;


import React from 'react';
import styled from 'styled-components';

// Styled-components
const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const GridItem = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .grid-item-title {
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
  }

  .zoom-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.7);
    transition: color 0.3s ease;
  }

  &:hover .zoom-icon {
    color: #007bff;
  }
`;

const GSEANoDeseq = ({ resultData }) => {

  if (!resultData) {
    return <ResultContainer><p>No data available.</p></ResultContainer>;
  }
  
  return (
    <ResultContainer>
      <h4>General GSEA Results</h4>

      <GridContainer>
        {Object.entries(resultData).map(([filename, url]) => (
          <GridItem key={filename}>
            <img src={url} alt={filename.replace('.png', '')} />
            <div className="grid-item-title">{filename.replace('.png', '').replace('_', ' ')}</div>
          </GridItem>
        ))}
      </GridContainer>
    </ResultContainer>
  );
};

export default GSEANoDeseq;

