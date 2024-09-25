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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const GridItem = styled.div`
  position: relative;

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

const DownloadList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 10px;

    a {
      text-decoration: none;
      color: #007bff;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const DeseqReactome = ({ resultData }) => {
  if (!resultData) {
    return <p>Loading...</p>;
  }

  console.log('reactome resultData:', resultData);

  const { task_info: taskInfo, task_status: taskStatus } = resultData;

  return (
    <ResultContainer>
      <h4>Deseq Reactome Results</h4>

      {taskStatus === 'PENDING' && !taskInfo && <p>Task is pending...</p>}

      {taskStatus === 'IN_PROGRESS' && taskInfo && (
        <div>
          <h5>{taskInfo.detail}</h5>
          <p>Task is currently in progress...</p>
        </div>
      )}

      {taskStatus === 'SUCCESS' && taskInfo && (
        <div>
          <h5>Download Links</h5>
          <DownloadList>
            {Object.entries(taskInfo).map(([filename, url]) => {
              if (filename.endsWith('.pdf') || filename.endsWith('.csv')) {
                return (
                  <li key={filename}>
                    <a href={url} download>
                      {filename}
                    </a>
                  </li>
                );
              }
              return null;
            })}
          </DownloadList>

          <h5>Figures</h5>
          <GridContainer>
            {Object.entries(taskInfo).map(([filename, url]) => {
              if (filename.endsWith('.png')) {
                return (
                  <GridItem key={filename}>
                    <img src={url} alt={filename} />
                    <div className="grid-item-title">{filename}</div>
                  </GridItem>
                );
              }
              return null;
            })}
          </GridContainer>
        </div>
      )}

      {taskStatus === 'FAILED' && <p>Task failed. Please try again later.</p>}
    </ResultContainer>
  );
};

export default DeseqReactome;
