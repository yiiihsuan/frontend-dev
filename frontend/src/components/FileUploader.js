import React from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';

// Styled Components
const UploadSection = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const UploadArea = styled.div`
  border: 2px dashed #aaa;
  border-radius: 10px;
  padding: 40px;
  margin: 0 5%; 
  background-color: #f9f9f9;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const UploadIcon = styled.div`
  font-size: 4em;
  margin-bottom: 10px;
  color: ${props => (props.fileSelected ? '#4CAF50' : '#333')};
`;

const UploadInstructions = styled.p`
  margin-bottom: 20px;
  color: #333;
`;

const FileName = styled.p`
  margin-top: 10px;
  color: #4CAF50;
  font-weight: bold;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: #b3b3b3; 
  color: black; 
  border: 2px solid black; 
  border-radius: 25px; 
  padding: 10px 40px;
  font-size: 18px; 
  cursor: pointer;
  outline: none;
  margin-top:10px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #a1a1a1;
    transform: scale(1.05); 
  }

  &:active {
    background-color: #909090; 
    transform: scale(0.95); 
  }
`;

// FileUploader Component
const FileUploader = ({ title, file, setFile, uploadType, handleUpload }) => {

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(`${title} file selected:`, selectedFile);
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <UploadSection>
      <SubTitle>{title}</SubTitle>
      <UploadArea
        onClick={() => document.getElementById(`${uploadType}FileInput`).click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadIcon fileSelected={file}>
          {file ? <FaCheckCircle /> : <FaCloudUploadAlt />}
        </UploadIcon>
        <UploadInstructions>*csv file only<br />*example here</UploadInstructions>
        <FileInput
          id={`${uploadType}FileInput`}
          type="file"
          onChange={handleFileChange}
        />
        {file && <FileName>{file.name}</FileName>}
      </UploadArea>
      <UploadButton onClick={() => handleUpload(file, uploadType)}>Upload</UploadButton>
    </UploadSection>
  );
};

export default FileUploader;
