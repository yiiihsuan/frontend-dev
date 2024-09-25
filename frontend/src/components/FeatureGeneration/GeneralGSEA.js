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


