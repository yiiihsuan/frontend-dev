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

const MlpModel = ({ resultData }) => {

    console.log('MLPModel resultData:', resultData);

  if (!resultData) {
    return <ResultContainer><p>No data available.</p></ResultContainer>;
  }

  return (
    <ResultContainer>
      <h4>MLP Model Evaluation Results</h4>

      <GridContainer>
        {Object.entries(resultData).map(([filename, url]) => {
          // Display only MLP model plots
          if (filename.match(/^(ml_r2_plot|ml_abs_error_plot)$/)) {
            return (
              <GridItem key={filename}>
                <img src={url} alt={filename.replace('_', ' ')} />
                <div className="grid-item-title">{filename.replace('_', ' ').replace('plot', 'Plot')}</div>
              </GridItem>
            );
          }
          return null; // Skip unrelated images
        })}
      </GridContainer>
    </ResultContainer>
  );
};

export default MlpModel;
