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

//   const handleUpload = (file, type, useGCP = false) => {
//     mutation.mutate({ file, projectId, type, useGCP });
//   };

//   return (
//     <Container>
//       <Link to="/home">&lt; Home</Link>
//       <Title>{`Project ID: ${projectId}`}</Title>
//       <Section>
//         <SubTitle>Upload Data</SubTitle>
//         <div>
//           <SubTitle>Gene Sequence Data:</SubTitle>
//           <FileInput type="file" onChange={handleFileChange(setGeneFile)} />
//           <UploadButton onClick={() => handleUpload(geneFile, 'gene')}>Upload to Local</UploadButton>
//           <UploadButton onClick={() => handleUpload(geneFile, 'gene', true)}>Upload to GCP</UploadButton>
//         </div>
//         <div>
//           <SubTitle>Heart Beating Data:</SubTitle>
//           <FileInput type="file" onChange={handleFileChange(setHeartFile)} />
//           <UploadButton onClick={() => handleUpload(heartFile, 'heart')}>Upload to Local</UploadButton>
//           <UploadButton onClick={() => handleUpload(heartFile, 'heart', true)}>Upload to GCP</UploadButton>
//         </div>
//       </Section>
//     </Container>
//   );
// };

// export default ProjectPage;


// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import { uploadFile } from '../api';
// import styled from 'styled-components';
// import { FaCloudUploadAlt } from 'react-icons/fa';

// const Container = styled.div`
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 2.5em;
//   text-align: center;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const Steps = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const Step = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 0 15px;
//   font-size: 1.2em;
//   color: ${props => (props.active ? '#000' : '#999')};

//   &::after {
//     content: '';
//     display: ${props => (props.showLine ? 'block' : 'none')};
//     width: 60px;
//     height: 1px;
//     background-color: #999;
//     margin-left: 15px;
//   }
// `;

// const UploadSection = styled.div`
//   margin-bottom: 40px;
//   text-align: center;
// `;

// const SubTitle = styled.h2`
//   font-size: 1.5em;
//   margin-bottom: 10px;
// `;

// const UploadArea = styled.div`
//   border: 2px dashed #aaa;
//   border-radius: 10px;
//   padding: 40px;
//   margin-bottom: 20px;
//   background-color: #f9f9f9;
// `;

// const UploadIcon = styled(FaCloudUploadAlt)`
//   font-size: 4em;
//   margin-bottom: 10px;
//   color: #333;
// `;

// const UploadInstructions = styled.p`
//   margin-bottom: 20px;
//   color: #333;
// `;

// const FileInput = styled.input`
//   display: none;
// `;

// const UploadButtonLabel = styled.label`
//   display: inline-block;
//   background-color: #007bff;
//   color: white;
//   padding: 10px 20px;
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

//   const handleUpload = (file, type, useGCP = false) => {
//     mutation.mutate({ file, projectId, type, useGCP });
//   };

//   return (
//     <Container>
//       <Link to="/home">&lt; Home</Link>
//       <Title>{`Project ${projectId}`}</Title>
      
//       <Steps>
//         <Step active>1 Upload</Step>
//         <Step showLine>2 Preprocess</Step>
//         <Step showLine>3 Setting</Step>
//         <Step showLine>4 Analysis</Step>
//       </Steps>
      
//       <UploadSection>
//         <SubTitle>Gene Sequence Data</SubTitle>
//         <UploadArea>
//           <UploadIcon />
//           <UploadInstructions>*csv file only<br />*example here</UploadInstructions>
//           <UploadButtonLabel>
//             Select File
//             <FileInput type="file" onChange={handleFileChange(setGeneFile)} />
//           </UploadButtonLabel>
//         </UploadArea>
//         <UploadButtonLabel onClick={() => handleUpload(geneFile, 'gene')}>Upload to Local</UploadButtonLabel>
//         <UploadButtonLabel onClick={() => handleUpload(geneFile, 'gene', true)}>Upload to GCP</UploadButtonLabel>
//       </UploadSection>

//       <UploadSection>
//         <SubTitle>Heart Beat Data</SubTitle>
//         <UploadArea>
//           <UploadIcon />
//           <UploadInstructions>*csv file only<br />*example here</UploadInstructions>
//           <UploadButtonLabel>
//             Select File
//             <FileInput type="file" onChange={handleFileChange(setHeartFile)} />
//           </UploadButtonLabel>
//         </UploadArea>
//         <UploadButtonLabel onClick={() => handleUpload(heartFile, 'heart')}>Upload to Local</UploadButtonLabel>
//         <UploadButtonLabel onClick={() => handleUpload(heartFile, 'heart', true)}>Upload to GCP</UploadButtonLabel>
//       </UploadSection>
//     </Container>
//   );
// };

// export default ProjectPage;


//只有一個項目的下拉選單

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { uploadFile } from '../api';
import styled from 'styled-components';
import { FaCloudUploadAlt, FaCheckCircle, FaChevronDown} from 'react-icons/fa';
import Sidebar from '../components/SideBar'; 
import CollapsibleSection from '../components/Parameters';
import Dropdown from '../components/ParameterSection';
import PreprocessResult from '../components/PreprocessResult';
import ResultModal from '../components/ResultModal';

import GenericAnalysis from '../components/GenericAnalysis';
import { submitDeseq2, submitDeseqGSEA } from '../api';  // 引入 API 函数
import { analysisConfigs } from '../config/analysisConfigs';
import DeseqGSEA from '../components/Deseq2/DeseqGSEA.js';


const Layout = styled.div`
  display: flex;
  height: 100vh; 
`;

const MainContent = styled.div`
  flex: 1; 
  padding: 20px;
  overflow-y: auto;
  background-color: #f0f0f0; 
`;


// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr); 
//   gap: 20px;
//   margin-bottom: 40px;
// `;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
`;

const Deseq2Item = styled.div`
  grid-column: 1 / span 1; 
`;

const Deseq2StaticsItem = styled.div`
  grid-column: 1 / span 1; 
`;

const Deseq2GSEAItem = styled.div`
  grid-column: 2 / span 1; 
`;

const ReactomeItem = styled.div`
  grid-column: 3 / span 1; 
`;

const PreprocessContainer = styled.div`
  display: grid;
  margin-bottom: 40px;
  position: relative;
`;

const DropdownContainer = styled.div`
  background-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; 
  overflow: visible;  
`;
const SectionTitle = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const SectionItem = styled.div`
  background-color: #ccc;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #b3b3b3;
  }
`;

const IconWrapper = styled.div`
  margin-left: 10px;
`;



const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

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
  //margin-bottom: 20px;
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

const ShowButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;

  &:hover {
    background-color: #45A049;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
`;


const ProjectPage = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { projectId } = useParams();
  const [geneFile, setGeneFile] = useState(null);
  const [heartFile, setHeartFile] = useState(null);

  const [openDropdowns, setOpenDropdowns] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const [dropdownStates, setDropdownStates] = useState({
    preprocess: false,
    deseq: false,
    featureGeneration: false,
    modeling: false,
  });

  const [deseq2Selected, setDeseq2Selected] = useState(false);

  const handleDeseq2Select = () => {
    setDeseq2Selected(!deseq2Selected);
  };

  // const dropdownData = [
  //   { title: 'DESEQˇ', items: ['Deseq2', 'Deseq2 Statistics', 'Deseq2 GSEA', 'Reactome Result'] },
  //   { title: 'Feature Generation', items: ['General GSEA', 'WGCNA'] },
  //   { title: 'Modeling', items: ['Baseline Selection', 'Gene Collection', 'Gene Selection', 'Base Model'] },
  // ];

  //   const dropdownData = [
  //   { title: 'DESEQ', items: ['Deseq2', 'Deseq2 Statistics', 'Deseq2 GSEA', 'Reactome Result'] },
  //   { title: 'Deseq2 Statistics', items: ['General GSEA', 'WGCNA'] },
  //   { title: 'Deseq2 GSEA', items: ['Baseline Selection', 'Gene Collection', 'Gene Selection', 'Base Model'] },
  //   { title: 'Reactome Result', items: ['Baseline Selection', 'Gene Collection', 'Gene Selection', 'Base Model'] },
  // ];

  const [deseq2Result, setDeseq2Result] = useState(null);
  const [deseq2GSEAResult, setDeseq2GSEAResult] = useState(null);
  const [reactomeResult, setReactomeResult] = useState(null);
  const [showResults, setShowResults] = useState(false);


  
  const toggleDropdown = (index) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index], 
    }));
  };


  const handleCheckChange = (index) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };


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

  // const handleUpload = (file, type) => {
  //   mutation.mutate({ file, projectId, type });
  // };

  const handleUpload = (file, type) => {
    const projectId = localStorage.getItem('projectId'); 
    mutation.mutate({
      file: file,
      projectId: projectId,
      type: type
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, setter) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setter(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };



  return (
    <Layout>
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    <MainContent>
      <Title>{`Project ${projectId}`}</Title>
      
      <UploadSection>
        <SubTitle>Gene Sequence Data</SubTitle>
        <UploadArea
          onClick={() => document.getElementById('geneFileInput').click()}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, setGeneFile)}
        >
          <UploadIcon fileSelected={geneFile}>
            {geneFile ? <FaCheckCircle /> : <FaCloudUploadAlt />}
          </UploadIcon>
          <UploadInstructions>*csv file only<br />*example here</UploadInstructions>
          <FileInput
            id="geneFileInput"
            type="file"
            onChange={handleFileChange(setGeneFile)}
          />
          {geneFile && <FileName>{geneFile.name}</FileName>}
        </UploadArea>
        <UploadButton  onClick={() => handleUpload(geneFile, 'gene')}>Upload</UploadButton >
        {/* <button onClick={() => handleUpload(geneFile, 'gene', true)}>Upload to GCP</button> */}
      </UploadSection>

      <UploadSection>
        <SubTitle>Heart Beat Data</SubTitle>
        <UploadArea
          onClick={() => document.getElementById('heartFileInput').click()}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, setHeartFile)}
        >
          <UploadIcon fileSelected={heartFile}>
            {heartFile ? <FaCheckCircle /> : <FaCloudUploadAlt />}
          </UploadIcon>
          <UploadInstructions>*csv file only<br />*example here</UploadInstructions>
          <FileInput
            id="heartFileInput"
            type="file"
            onChange={handleFileChange(setHeartFile)}
          />
          {heartFile && <FileName>{heartFile.name}</FileName>}
        </UploadArea>
        <UploadButton  onClick={() => handleUpload(heartFile, 'heart')}>Upload</UploadButton >
        {/* <button onClick={() => handleUpload(heartFile, 'heart', true)}>Upload to GCP</button> */}
      </UploadSection>

      
      {/* <SectionTitle>Deseq2</SectionTitle>
      <GridContainer>
          {dropdownData.map((dropdown, index) => (
            <Dropdown
              key={index}
              title={dropdown.title}
              items={dropdown.items}
              isOpen={openDropdowns[index] || false}
              onToggle={() => toggleDropdown(index)}
            />
          ))}
        </GridContainer> */}

<SectionTitle>Preprocess</SectionTitle>
         <PreprocessContainer>
          {[
            {
              title: 'Preprocess',
              items: [
                'sample_col',
                'raw_gene_col',
                'response_col',
                'min_val',
                'min_percent',
                'select_meta_groupby_cols',
                'control_col',
                'control_val',
                'vehicle_control_val',
                'gene_col',
                'target_col',
              ],
            },
          ].map((dropdown, index) => (
            <Dropdown
              key={index}
              title={dropdown.title}
              items={dropdown.items}
              isOpen={openDropdowns[index] || false}
              onToggle={() => toggleDropdown(index)}
              checked={checkedItems[index] || false}
              onCheckChange={() => handleCheckChange(index)}
            />
          ))}
        </PreprocessContainer>

        {/* <PreprocessResult projectId={projectId} /> */}
 
        <SectionTitle onClick={() => toggleDropdown('result_preprocess')}>
  Preprocess Result
  <span>{openDropdowns['result_preprocess'] ? '▲' : '▼'}</span>
</SectionTitle>
{openDropdowns['result_preprocess'] && <PreprocessResult />}

         
         {/* Deseq2 Section */}
         {/* <SectionTitle>Deseq2</SectionTitle>
         <GridContainer>
          {[
            {
              title: 'Deseq2',
              items: [
                'sample_col',
                'control_col',
                'control_val',
                'vehicle_control_val',
                'gene_col',
                'time_col',
              ],
            },
            { title: 'Reactome Result', items: ['Reactome Result'] },
            { title: 'Deseq2 Statistics', items: ['Deseq2 Statistics'] },
            { title: 'Deseq2 GSEA', items: ['Deseq2 GSEA'] },
          ].map((dropdown, index) => (
            <Dropdown
            key={index}
            title={dropdown.title}
            items={dropdown.items}
            isOpen={openDropdowns[`preprocess_${index}`] || false} // Ensuring unique keys for preprocess
            onToggle={() => toggleDropdown(`preprocess_${index}`)} 
            checked={checkedItems[`preprocess_${index}`] || false} 
            onCheckChange={() => handleCheckChange(`preprocess_${index}`)} 
          />
          ))}
        </GridContainer> */}

       
               {/* Deseq2 Section */}
               <SectionTitle>Deseq2</SectionTitle>
        <GridContainer>
        <Deseq2Item>
          <GenericAnalysis
            title="Deseq2"
            config={analysisConfigs.deseq2}
            apiFunction={(params) => submitDeseq2(projectId, params)}
            onResult={setDeseq2Result}
          />
         </Deseq2Item>

          <Deseq2StaticsItem>
          <GenericAnalysis
            title="Deseq2 Statistics"
            //config={analysisConfigs.deseq2Statistics}
            //apiFunction={(params) => submitDeseqStatistics(projectId, params)}
            //onResult={setDeseq2Statistics}
          />
          </Deseq2StaticsItem>

          <Deseq2GSEAItem>
          <GenericAnalysis
            title="Deseq2 GSEA"
            config={analysisConfigs.deseq2GSEA}
            apiFunction={(params) => submitDeseqGSEA(projectId, params)}
            onResult={setDeseq2GSEAResult}
          />
          </Deseq2GSEAItem>


          <ReactomeItem>
          <GenericAnalysis
            title="Reactome Result"
            config={analysisConfigs.deseq2Reactome}
            apiFunction={(params) => submitDeseq2(projectId, params)}
            //onResult={setDeseq2GSEAResult}
          />
           </ReactomeItem>
           
        </GridContainer>
       


        <div>
          <ShowButton onClick={() => setShowResults(!showResults)}>
            {showResults ? 'Hide Results' : 'Show Results'}
          </ShowButton>

          {showResults && deseq2GSEAResult && (
            <DeseqGSEA resultData={deseq2GSEAResult} />
          )}
        </div>





        {/* Feature Generation Section */}
        <SectionTitle>Feature Generation</SectionTitle>
      <GridContainer>
        <GenericAnalysis
          title="General GSEA"
          config={analysisConfigs.GeneralGSEA}
          //apiFunction={(params) => submitGeneralGSEA(projectId, params)}
          //onResult={setGeneralGSEAResult}
        />
        <GenericAnalysis
          title="WGCNA"
          config={analysisConfigs.WGCNA}
          //apiFunction={(params) => submitWGCNA(projectId, params)}
          //onResult={setWgcnaResult}
        />
      </GridContainer>

        {/* Modeling Section */}
        <SectionTitle>Modeling</SectionTitle>
        <GridContainer>
          {[
            { title: 'Baseline Selection', items: ['Baseline Selection'] },
            { title: 'Gene Collection', items: ['Gene Collection'] },
            { title: 'Gene Selection', items: ['Gene Selection'] },
            { title: 'Base Model', items: ['Base Model'] },
            { title: 'MLP Model', items: ['MLP Model'] },
          ].map((dropdown, index) => (
            <Dropdown
              key={index + 6}
              title={dropdown.title}
              items={dropdown.items}
              isOpen={openDropdowns[index + 6] || false}
              onToggle={() => toggleDropdown(index + 6)}
              checked={checkedItems[index + 6] || false}
              onCheckChange={() => handleCheckChange(index + 6)}
            />
          ))}
        </GridContainer>

      </MainContent>
      </Layout>
  );
};

export default ProjectPage;
