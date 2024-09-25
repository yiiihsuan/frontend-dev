import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal columns */
  gap: 20px;
`;

const GridItem = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    max-height: 500px; /* Adjust this for the desired height */
    object-fit: contain; /* Ensures the image scales properly */
  }

  .grid-item-title {
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
    font-size: 1.2em;
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

const BaseModel = ({ resultData }) => {
  if (!resultData || !resultData.evaluateData) {
    return <ResultContainer><p>No data available.</p></ResultContainer>;
  }

  const evaluateData = resultData.evaluateData; // Extract evaluateData

  console.log('Evaluate Data:', evaluateData); 

  return (
    <ResultContainer>
      <h4>Base Model Evaluation Results</h4>

      <GridContainer>
        {Object.entries(evaluateData).map(([filename, url]) => {
          console.log('Filename:', filename, 'URL:', url); // Debugging log

          // Display only base model plots
          if (filename.includes('base_ml_r2_plot') || filename.includes('base_ml_abs_error_plot')) {
            return (
              <GridItem key={filename}>
                <img src={url} alt={filename.replace('_', ' ').replace('.png', '')} />
                <div className="grid-item-title">{filename.replace('_', ' ').replace('.png', '').replace('plot', 'Plot')}</div>
              </GridItem>
            );
          }
          return null; // Skip unrelated images
        })}
      </GridContainer>
    </ResultContainer>
  );
};

export default BaseModel;
