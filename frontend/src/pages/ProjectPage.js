// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import { uploadFile } from '../api';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 2em;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const Section = styled.div`
//   margin-bottom: 20px;
// `;

// const SubTitle = styled.h2`
//   font-size: 1.5em;
//   margin-bottom: 10px;
// `;

// const FileInput = styled.input`
//   display: block;
//   margin-bottom: 10px;
// `;

// const UploadButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-size: 1em;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const ProjectPage = () => {
//   const { projectId } = useParams();
//   const [geneFile, setGeneFile] = useState(null);
//   const [heartFile, setHeartFile] = useState(null);

//   const mutation = useMutation(uploadFile, {
//     onSuccess: (data, variables) => {
//       alert(`${variables.type} uploaded successfully`);
//     },
//     onError: (error, variables) => {
//       console.error('Error:', error);
//       alert(`Failed to upload ${variables.type}`);
//     },
//   });

//   const handleFileChange = (setter) => (event) => {
//     setter(event.target.files[0]);
//   };

//   const handleUpload = (file, type) => {
//     mutation.mutate({ file, projectId, type });
//   };

//   return (
//     <Container>
//       <Link to="/">&lt; Home</Link>
//       <Title>{`Project ID: ${projectId}`}</Title>
//       <Section>
//         <SubTitle>Upload Data</SubTitle>
//         <div>
//           <SubTitle>Gene Sequence Data:</SubTitle>
//           <FileInput type="file" onChange={handleFileChange(setGeneFile)} />
//           <UploadButton onClick={() => handleUpload(geneFile, 'gene')}>Upload</UploadButton>
//         </div>
//         <div>
//           <SubTitle>Heart Beating Data:</SubTitle>
//           <FileInput type="file" onChange={handleFileChange(setHeartFile)} />
//           <UploadButton onClick={() => handleUpload(heartFile, 'heart')}>Upload</UploadButton>
//         </div>
//       </Section>
//     </Container>
//   );
// };

// export default ProjectPage;




import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { uploadFile } from '../api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: block;
  margin-bottom: 10px;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProjectPage = () => {
  const { projectId } = useParams();
  const [geneFile, setGeneFile] = useState(null);
  const [heartFile, setHeartFile] = useState(null);

  const mutation = useMutation(uploadFile, {
    onSuccess: (data, variables) => {
      alert(`${variables.type} uploaded successfully`);
    },
    onError: (error, variables) => {
      console.error('Error:', error);
      alert(`Failed to upload ${variables.type}`);
    },
  });

  const handleFileChange = (setter) => (event) => {
    setter(event.target.files[0]);
  };

  const handleUpload = (file, type, useGCP = false) => {
    mutation.mutate({ file, projectId, type, useGCP });
  };

  return (
    <Container>
      <Link to="/">&lt; Home</Link>
      <Title>{`Project ID: ${projectId}`}</Title>
      <Section>
        <SubTitle>Upload Data</SubTitle>
        <div>
          <SubTitle>Gene Sequence Data:</SubTitle>
          <FileInput type="file" onChange={handleFileChange(setGeneFile)} />
          <UploadButton onClick={() => handleUpload(geneFile, 'gene')}>Upload to Local</UploadButton>
          <UploadButton onClick={() => handleUpload(geneFile, 'gene', true)}>Upload to GCP</UploadButton>
        </div>
        <div>
          <SubTitle>Heart Beating Data:</SubTitle>
          <FileInput type="file" onChange={handleFileChange(setHeartFile)} />
          <UploadButton onClick={() => handleUpload(heartFile, 'heart')}>Upload to Local</UploadButton>
          <UploadButton onClick={() => handleUpload(heartFile, 'heart', true)}>Upload to GCP</UploadButton>
        </div>
      </Section>
    </Container>
  );
};

export default ProjectPage;
