import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
    }
  }
`;

const DeseqStats = ({ resultData }) => {


  console.log('Result Data in deseastat.js:', resultData);



  if (!Array.isArray(resultData) || resultData.length === 0) {
    return <ResultContainer><p>No data available.</p></ResultContainer>;
  }

  return (
    <ResultContainer>
      <h4>DESeq2 Statistics:</h4>

      <TableContainer>
        <table>
          <thead>
            <tr>
              {Object.keys(resultData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resultData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(resultData[0]).map((key, cellIndex) => (
                  <td key={cellIndex}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </ResultContainer>
  );
};

export default DeseqStats;
