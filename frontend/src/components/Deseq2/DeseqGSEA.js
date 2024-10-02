import React, { useState } from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
`;

const DeseqGSEA = ({ resultData }) => {
  return (
    <ResultContainer id="results-container">
      <h4>DESeq GSEA Results</h4>

      <GridContainer>
        {Object.entries(resultData).map(([key, url]) => (
          <GridItem key={key}>
            <img src={url} alt={key} />
            <div className="grid-item-title">{key.replace(/_/g, ' ')}</div>
          </GridItem>
        ))}
      </GridContainer>
    </ResultContainer>
  );
};

export default DeseqGSEA;
