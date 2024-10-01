import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';

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

const FileUploader = ({ title, file, setFile, uploadType, handleUpload }) => {

  const [uploading, setUploading] = useState(false);

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
  

  const getUploadInstructions = () => {
    switch (uploadType) {
      case 'video':
        return 'avi, mp4 only\n*example here';
      case 'gene_counts':
        return 'csv file only\n*example here';
      case 'meta':
        return 'csv file only\n*example here';
      default:
        return 'file only\n*example here';
    }
  };

  const handleUploadClick = () => {
    setUploading(true); // 開始上傳時將狀態設為 true
    handleUpload(file, uploadType).finally(() => {
      setUploading(false); // 上傳結束後重設狀態
    });
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
        <UploadInstructions>{getUploadInstructions()}</UploadInstructions>
        <FileInput
          id={`${uploadType}FileInput`}
          type="file"
          onChange={handleFileChange}
        />
        {file && <FileName>{file.name}</FileName>}
      </UploadArea>
      {/* <UploadButton onClick={() => handleUpload(file, uploadType)}>Upload</UploadButton> */}
      <UploadButton onClick={handleUploadClick} disabled={uploading}>
        {uploading ? '上傳中...' : '上傳'}
      </UploadButton>
   
   </UploadSection>
  );
};

export default FileUploader;
