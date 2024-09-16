import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { uploadFile } from '../api';
import styled from 'styled-components';
import { FaCloudUploadAlt, FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import Sidebar from '../components/SideBar';
// import CollapsibleSection from '../components/Parameters';
// import Dropdown from '../components/ParameterSection';
// import PreprocessResult from '../components/PreprocessResult';
// import ResultModal from '../components/ResultModal';

import GenericAnalysis from '../components/GenericAnalysis';
import { submitDeseq2, submitDeseqGSEA, submitDeseqStats, submitGeneralGSEA, submitWGCNA, submitBaselineSelection, submitGeneCollection, submitGeneSelection, trainAndEvaluateBaseModel, trainAndEvaluateMlpModel, runReactomeAndStatus } from '../api';
import { analysisConfigs } from '../config/analysisConfigs';
import DeseqGSEA from '../components/Deseq2/DeseqGSEA.js';
import DeseqStats from '../components/Deseq2/DeseqStats.js';
import Papa from 'papaparse';
import GSEANoDeseq from '../components/FeatureGeneration/GeneralGSEA.js';
import WGCNAResults from '../components/FeatureGeneration/WGCNA.js';
import BaseModel from '../components/Model/BaseModel.js';
import MlpModel from '../components/Model/MLPModel.js';
import DeseqReactome from '../components/Deseq2/Reactome.js';
import PreprocessComponent from '../components/Preprocess';  
import { FaChevronUp } from 'react-icons/fa';



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
  text-align: center;
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

// const IconWrapper = styled.div`
//   margin-left: 10px;
// `;

const Icon = styled.div`
  position: absolute;
  right: 20px;
  font-size: 1.2rem;
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
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  border-top: 1px solid #000;
  border-right: 5px solid #000;
  border-bottom: 5px solid #000;
  border-left: 1px solid #000;  
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;

  &:hover {
    background-color: #33333;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 10px 0;
  color: #333;
  font-size: 0.9em;
  border-top: 1px solid #ddd;
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  
  /* 添加下劃線 */
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px; /* 粗細 */
    background-color: black; 
  }
`;
const FormContainer = styled.div`
  //display: ${(props) => (props.isProcessOpen ? 'grid' : 'none')};
  // grid-template-columns: repeat(3, 1fr);  
  // gap: 20px;
  // margin: 20px 0;
  // padding: 20px;
  // border-radius: 8px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


const ProjectPage = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { projectId } = useParams();
  const [geneFile, setGeneFile] = useState(null);
  const [heartFile, setHeartFile] = useState(null);
  const [isProcessOpen, setIsProcessOpen] = useState(false);

  const [openDropdowns, setOpenDropdowns] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  // const [dropdownStates, setDropdownStates] = useState({
  //   preprocess: false,
  //   deseq: false,
  //   featureGeneration: false,
  //   modeling: false,
  // });

  const [deseq2Selected, setDeseq2Selected] = useState(false);
  const [deseq2Result, setDeseq2Result] = useState(null);
  const [deseq2GSEAResult, setDeseq2GSEAResult] = useState(null);
  const [reactomeResult, setReactomeResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [deseq2Statistics, setDeseq2Statistics] = useState(null);
  const [generalGSEAResult, setGeneralGSEAResult] = useState(null);
  const [wgcnaResult, setWgcnaResult] = useState(null);
  const [baselineSelectionResult, setBaselineSelectionResult] = useState(null);
  const [geneCollectionResult, setGeneCollectionResult] = useState(null);
  const [geneSelection, setGeneSelection] = useState(null);
  const [baseModel, setBaseModel] = useState(null);
  const [mlpModel, setMlpModel] = useState(null);

  const [deseqShowResults, setDeseqShowResults] = useState(false); // Deseq2 show/hide state
  const [featureGenShowResults, setFeatureGenShowResults] = useState(false); // Feature Generation show/hide state
  const [modelShowResults, setModelShowResults] = useState(false); // Modeling show/hide state


  // const toggleDropdown = (index) => {
  //   setOpenDropdowns((prevState) => ({
  //     ...prevState,
  //     [index]: !prevState[index],
  //   }));
  // };


  // const handleCheckChange = (index) => {
  //   setCheckedItems((prevState) => ({
  //     ...prevState,
  //     [index]: !prevState[index],
  //   }));
  // };


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
    const file = event.target.files[0];
    console.log("File selected:", file); // 確認文件是否正確選擇
    setter(file);
  };

  const handleUpload = (file, type) => {
    const projectId = localStorage.getItem('projectId');
    console.log('Handle upload parameters:', { file, type, projectId });

    if (!projectId) {
      console.error("Project ID is not set");
      alert("Project ID is not set. Please check your configuration.");
      return;
    }
    if (!file) {
      console.error("No file selected");
      alert("No file selected. Please select a file before uploading.");
      return;
    }
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

  const parseDeseqStats = (data) => {
    return Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }).data;
  };



  return (
    <Layout>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsLoggedIn={setIsLoggedIn} />
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
          <UploadButton onClick={() => handleUpload(geneFile, 'gene')}>Upload</UploadButton >
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
          <UploadButton onClick={() => handleUpload(heartFile, 'heart')}>Upload</UploadButton >
          {/* <button onClick={() => handleUpload(heartFile, 'heart', true)}>Upload to GCP</button> */}
        </UploadSection>




        <PreprocessComponent projectId={projectId} />







        <TitleContainer onClick={() => setIsProcessOpen(!isProcessOpen)}>
          process selection
          <Icon>
            {isProcessOpen ? <FaChevronUp /> : <FaChevronDown />}
          </Icon>
        </TitleContainer>


        {isProcessOpen && (
          <FormContainer>

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
                  apiFunction={() => submitDeseqStats(projectId)}
                  onResult={setDeseq2Statistics}
                  parseFunction={parseDeseqStats}
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
                  //config={analysisConfigs.deseq2Reactome}
                  apiFunction={() => runReactomeAndStatus(projectId)}
                  onResult={setReactomeResult}
                />
              </ReactomeItem>

            </GridContainer>



            <div>
              <ShowButton onClick={() => setDeseqShowResults(!deseqShowResults)}>
                {deseqShowResults ? 'Hide Results' : 'Show Results'}
              </ShowButton>

              {deseqShowResults && deseq2GSEAResult && (
                <DeseqGSEA resultData={deseq2GSEAResult} />
              )}

              {deseqShowResults && deseq2Statistics && (
                <DeseqStats resultData={deseq2Statistics} />
              )}

              {deseqShowResults && reactomeResult && (
                <DeseqReactome resultData={reactomeResult} />
              )}

            </div>


            {/* Feature Generation Section */}
            <SectionTitle>Feature Generation</SectionTitle>
            <GridContainer>
              <GenericAnalysis
                title="General GSEA"
                config={analysisConfigs.GeneralGSEA}
                apiFunction={(params) => submitGeneralGSEA(projectId, params)}
                onResult={setGeneralGSEAResult}
              />

              <GenericAnalysis
                title="WGCNA"
                config={analysisConfigs.WGCNA}
                apiFunction={(params) => submitWGCNA(projectId, params)}
                onResult={setWgcnaResult}
              />
            </GridContainer>

            <div>
              <ShowButton onClick={() => setFeatureGenShowResults(!featureGenShowResults)}>
                {featureGenShowResults ? 'Hide Results' : 'Show Results'}
              </ShowButton>

              {featureGenShowResults && generalGSEAResult && (
                <GSEANoDeseq resultData={generalGSEAResult} />
              )}

              {featureGenShowResults && wgcnaResult && (
                <WGCNAResults resultData={wgcnaResult} />
              )}
            </div>


            <SectionTitle>Modeling</SectionTitle>
            <GridContainer>


              <Deseq2Item>
                <GenericAnalysis
                  title="Baseline Selection"
                  config={analysisConfigs.baselineSelection}
                  apiFunction={(params) => submitBaselineSelection(projectId, params)}
                  onResult={setBaselineSelectionResult}
                />
              </Deseq2Item>



              <Deseq2Item>
                <GenericAnalysis
                  title="Gene Collection"
                  config={analysisConfigs.geneCollection}
                  apiFunction={(params) => submitGeneCollection(projectId, params)}
                  onResult={setGeneCollectionResult}
                />
              </Deseq2Item>



              {/* this block is for model */}
              <Deseq2StaticsItem>
                <GenericAnalysis
                  title="Gene Selection"
                  config={analysisConfigs.geneSelection}
                  apiFunction={(params) => submitGeneSelection(projectId, params)}
                  onResult={setGeneSelection}
                />
              </Deseq2StaticsItem>



              <Deseq2GSEAItem>
                <GenericAnalysis
                  title="Base Model"
                  config={analysisConfigs.baseModel}
                  apiFunction={(params) => trainAndEvaluateBaseModel(projectId, params)}
                  onResult={setBaseModel}
                />
              </Deseq2GSEAItem>


              <ReactomeItem>
                <GenericAnalysis
                  title="MLP Model"
                  config={analysisConfigs.MLPModel}
                  apiFunction={(params) => trainAndEvaluateMlpModel(projectId, params)}
                  onResult={setMlpModel}
                />
              </ReactomeItem>

            </GridContainer>

            <div>
                <ShowButton onClick={() => setModelShowResults(!modelShowResults)}>
                  {modelShowResults ? 'Hide Results' : 'Show Results'}
                </ShowButton>


                {modelShowResults && baseModel && (
                  <BaseModel resultData={baseModel} />
                )}

                {modelShowResults && mlpModel && (
                  <MlpModel resultData={mlpModel} />
                )}

              </div>



          </FormContainer>)}




        <Footer>
          © Copyright Genenet Technology (UK). All Rights Reserved.
        </Footer>

      </MainContent>




    </Layout>
  );
};

export default ProjectPage;







// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import { uploadFile } from '../api';
// import styled from 'styled-components';
// import { FaCloudUploadAlt, FaCheckCircle, FaChevronDown } from 'react-icons/fa';
// import Sidebar from '../components/SideBar';
// // import CollapsibleSection from '../components/Parameters';
// // import Dropdown from '../components/ParameterSection';
// // import PreprocessResult from '../components/PreprocessResult';
// // import ResultModal from '../components/ResultModal';

// import GenericAnalysis from '../components/GenericAnalysis';
// import { submitDeseq2, submitDeseqGSEA, submitDeseqStats, submitGeneralGSEA, submitWGCNA, submitBaselineSelection, submitGeneCollection, submitGeneSelection, trainAndEvaluateBaseModel, trainAndEvaluateMlpModel, runReactomeAndStatus } from '../api';
// import { analysisConfigs } from '../config/analysisConfigs';
// import DeseqGSEA from '../components/Deseq2/DeseqGSEA.js';
// import DeseqStats from '../components/Deseq2/DeseqStats.js';
// import Papa from 'papaparse';
// import GSEANoDeseq from '../components/FeatureGeneration/GeneralGSEA.js';
// import WGCNAResults from '../components/FeatureGeneration/WGCNA.js';
// import BaseModel from '../components/Model/BaseModel.js';
// import MlpModel from '../components/Model/MLPModel.js';
// import DeseqReactome from '../components/Deseq2/Reactome.js';
// import PreprocessComponent from '../components/Preprocess';  
// import { FaChevronUp } from 'react-icons/fa';



// const Layout = styled.div`
//   display: flex;
//   height: 100vh; 
// `;

// const MainContent = styled.div`
//   flex: 1; 
//   padding: 20px;
//   overflow-y: auto;
//   background-color: #f0f0f0; 
// `;




// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr); 
//   gap: 20px;
//   margin-bottom: 40px;
//   position: relative;
// `;

// const Deseq2Item = styled.div`
//   grid-column: 1 / span 1; 
// `;

// const Deseq2StaticsItem = styled.div`
//   grid-column: 1 / span 1; 
// `;

// const Deseq2GSEAItem = styled.div`
//   grid-column: 2 / span 1; 
// `;

// const ReactomeItem = styled.div`
//   grid-column: 3 / span 1; 
// `;

// const PreprocessContainer = styled.div`
//   display: grid;
//   margin-bottom: 40px;
//   position: relative;
// `;

// const DropdownContainer = styled.div`
//   background-color: #ccc;
//   border-radius: 8px;
//   padding: 10px;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   position: relative; 
//   overflow: visible;  
// `;
// const SectionTitle = styled.h2`
//   font-size: 1.5em;
//   font-weight: bold;
//   margin-bottom: 20px;
//   text-transform: uppercase;
//   text-align: center;
// `;

// const SectionItem = styled.div`
//   background-color: #ccc;
//   padding: 10px;
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-weight: bold;
//   cursor: pointer;

//   &:hover {
//     background-color: #b3b3b3;
//   }
// `;

// // const IconWrapper = styled.div`
// //   margin-left: 10px;
// // `;

// const Icon = styled.div`
//   position: absolute;
//   right: 20px;
//   font-size: 1.2rem;
// `;




// const Title = styled.h1`
//   font-size: 2.5em;
//   text-align: center;
//   margin-bottom: 20px;
//   color: #333;
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
//   //margin-bottom: 20px;
//   margin: 0 5%; 
//   background-color: #f9f9f9;
//   position: relative;
//   cursor: pointer;

//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;

// const UploadIcon = styled.div`
//   font-size: 4em;
//   margin-bottom: 10px;
//   color: ${props => (props.fileSelected ? '#4CAF50' : '#333')};
// `;

// const UploadInstructions = styled.p`
//   margin-bottom: 20px;
//   color: #333;
// `;

// const FileName = styled.p`
//   margin-top: 10px;
//   color: #4CAF50;
//   font-weight: bold;
// `;

// const FileInput = styled.input`
//   display: none;
// `;

// const UploadButton = styled.button`
//   background-color: #b3b3b3; 
//   color: black; 
//   border: 2px solid black; 
//   border-radius: 25px; 
//   padding: 10px 40px;
//   font-size: 18px; 
//   cursor: pointer;
//   outline: none;
//   margin-top:10px;
//   transition: background-color 0.3s, transform 0.2s;

//   &:hover {
//     background-color: #a1a1a1;
//     transform: scale(1.05); 
//   }

//   &:active {
//     background-color: #909090; 
//     transform: scale(0.95); 
//   }
// `;


// const ShowButton = styled.button`
//   background-color: black;
//   color: white;
//   border: none;
//   border-radius: 10px;
//   border-top: 1px solid #000;
//   border-right: 5px solid #000;
//   border-bottom: 5px solid #000;
//   border-left: 1px solid #000;  
//   cursor: pointer;
//   padding: 10px 20px;
//   margin-top: 20px;

//   &:hover {
//     background-color: #33333;
//   }
// `;

// const ResultContainer = styled.div`
//   margin-top: 20px;
//   background-color: #f0f0f0;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const Footer = styled.footer`
//   text-align: center;
//   padding: 10px 0;
//   color: #333;
//   font-size: 0.9em;
//   border-top: 1px solid #ddd;
//   position: relative;
//   bottom: 0;
//   width: 100%;
//   margin-top: 20px;
// `;

// const TitleContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   padding: 10px;
//   font-size: 2rem;
//   font-weight: bold;
//   position: relative;
  
//   /* 添加下劃線 */
//   &:after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     height: 3px; /* 粗細 */
//     background-color: black; 
//   }
// `;
// const FormContainer = styled.div`
//   //display: ${(props) => (props.isProcessOpen ? 'grid' : 'none')};
//   // grid-template-columns: repeat(3, 1fr);  
//   // gap: 20px;
//   // margin: 20px 0;
//   // padding: 20px;
//   // border-radius: 8px;
//   // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;


// const AnalysisSectionContainer = styled.div`
//   border: 2px solid #ccc;
//   border-radius: 10px;
//   margin-bottom: 20px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// `;

// const SectionHeader = styled.div`
//   padding: 20px;
//   background-color: #f0f0f0;
//   cursor: pointer;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 10px;
// `;

// const SectionContent = styled.div`
//   padding: 20px;
//   display: ${(props) => (props.isOpen ? 'block' : 'none')};  /* 控制展開與收合 */
// `;

// const ParaIcon = styled.div`
//   font-size: 1.2rem;
// `;


// const ProjectPage = ({ setIsLoggedIn }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { projectId } = useParams();
//   const [geneFile, setGeneFile] = useState(null);
//   const [heartFile, setHeartFile] = useState(null);
//   const [isProcessOpen, setIsProcessOpen] = useState(false);

//   const [openDropdowns, setOpenDropdowns] = useState({});
//   const [checkedItems, setCheckedItems] = useState({});

//   // const [dropdownStates, setDropdownStates] = useState({
//   //   preprocess: false,
//   //   deseq: false,
//   //   featureGeneration: false,
//   //   modeling: false,
//   // });

//   const [deseq2Selected, setDeseq2Selected] = useState(false);
//   const [deseq2Result, setDeseq2Result] = useState(null);
//   const [deseq2GSEAResult, setDeseq2GSEAResult] = useState(null);
//   const [reactomeResult, setReactomeResult] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [deseq2Statistics, setDeseq2Statistics] = useState(null);
//   const [generalGSEAResult, setGeneralGSEAResult] = useState(null);
//   const [wgcnaResult, setWgcnaResult] = useState(null);
//   const [baselineSelectionResult, setBaselineSelectionResult] = useState(null);
//   const [geneCollectionResult, setGeneCollectionResult] = useState(null);
//   const [geneSelection, setGeneSelection] = useState(null);
//   const [baseModel, setBaseModel] = useState(null);
//   const [mlpModel, setMlpModel] = useState(null);

//   const [deseqShowResults, setDeseqShowResults] = useState(false); // Deseq2 show/hide state
//   const [featureGenShowResults, setFeatureGenShowResults] = useState(false); // Feature Generation show/hide state
//   const [modelShowResults, setModelShowResults] = useState(false); // Modeling show/hide state

//   const [isDeseqOpen, setIsDeseqOpen] = useState(false); // 控制 Deseq2 區塊的展開/收合
//   const [isFeatureGenOpen, setIsFeatureGenOpen] = useState(false); // 控制 Feature Generation 區塊的展開/收合
//   const [isModelOpen, setIsModelOpen] = useState(false); // 控制 Modeling 區塊的展開/收合
  

//   const toggleDeseqOpen = () => setIsDeseqOpen(!isDeseqOpen);
//   const toggleFeatureGenOpen = () => setIsFeatureGenOpen(!isFeatureGenOpen);
//   const toggleModelOpen = () => setIsModelOpen(!isModelOpen);


//   // const toggleDropdown = (index) => {
//   //   setOpenDropdowns((prevState) => ({
//   //     ...prevState,
//   //     [index]: !prevState[index],
//   //   }));
//   // };


//   // const handleCheckChange = (index) => {
//   //   setCheckedItems((prevState) => ({
//   //     ...prevState,
//   //     [index]: !prevState[index],
//   //   }));
//   // };


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
//     const file = event.target.files[0];
//     console.log("File selected:", file); // 確認文件是否正確選擇
//     setter(file);
//   };

//   const handleUpload = (file, type) => {
//     const projectId = localStorage.getItem('projectId');
//     console.log('Handle upload parameters:', { file, type, projectId });

//     if (!projectId) {
//       console.error("Project ID is not set");
//       alert("Project ID is not set. Please check your configuration.");
//       return;
//     }
//     if (!file) {
//       console.error("No file selected");
//       alert("No file selected. Please select a file before uploading.");
//       return;
//     }
//     mutation.mutate({
//       file: file,
//       projectId: projectId,
//       type: type
//     });
//   };


//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e, setter) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       setter(e.dataTransfer.files[0]);
//       e.dataTransfer.clearData();
//     }
//   };

//   const parseDeseqStats = (data) => {
//     return Papa.parse(data, {
//       header: true,
//       dynamicTyping: true,
//       skipEmptyLines: true,
//     }).data;
//   };



//   return (
//     <Layout>
//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsLoggedIn={setIsLoggedIn} />
//       <MainContent>
//         <Title>{`Project ${projectId}`}</Title>

//         <UploadSection>
//           <SubTitle>Gene Sequence Data</SubTitle>
//           <UploadArea
//             onClick={() => document.getElementById('geneFileInput').click()}
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, setGeneFile)}
//           >
//             <UploadIcon fileSelected={geneFile}>
//               {geneFile ? <FaCheckCircle /> : <FaCloudUploadAlt />}
//             </UploadIcon>
//             <UploadInstructions>*csv file only<br />*example here</UploadInstructions>
//             <FileInput
//               id="geneFileInput"
//               type="file"
//               onChange={handleFileChange(setGeneFile)}
//             />
//             {geneFile && <FileName>{geneFile.name}</FileName>}
//           </UploadArea>
//           <UploadButton onClick={() => handleUpload(geneFile, 'gene')}>Upload</UploadButton >
//           {/* <button onClick={() => handleUpload(geneFile, 'gene', true)}>Upload to GCP</button> */}
//         </UploadSection>

//         <UploadSection>
//           <SubTitle>Heart Beat Data</SubTitle>
//           <UploadArea
//             onClick={() => document.getElementById('heartFileInput').click()}
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, setHeartFile)}
//           >
//             <UploadIcon fileSelected={heartFile}>
//               {heartFile ? <FaCheckCircle /> : <FaCloudUploadAlt />}
//             </UploadIcon>
//             <UploadInstructions>*csv file only<br />*example here</UploadInstructions>
//             <FileInput
//               id="heartFileInput"
//               type="file"
//               onChange={handleFileChange(setHeartFile)}
//             />
//             {heartFile && <FileName>{heartFile.name}</FileName>}
//           </UploadArea>
//           <UploadButton onClick={() => handleUpload(heartFile, 'heart')}>Upload</UploadButton >
//           {/* <button onClick={() => handleUpload(heartFile, 'heart', true)}>Upload to GCP</button> */}
//         </UploadSection>




//         <PreprocessComponent projectId={projectId} />

//         <TitleContainer onClick={() => setIsProcessOpen(!isProcessOpen)}>
//           process selection
//           <Icon>
//             {isProcessOpen ? <FaChevronUp /> : <FaChevronDown />}
//           </Icon>
//         </TitleContainer>


//         {isProcessOpen && (
//           <FormContainer>

//             {/* Deseq2 Section */}

//               <AnalysisSectionContainer>
//       <SectionHeader onClick={toggleDeseqOpen}>
//         <SectionTitle>Deseq2</SectionTitle>
//         <Icon>{isDeseqOpen ? <FaChevronUp /> : <FaChevronDown />}</Icon>
//       </SectionHeader>
//       <SectionContent isOpen={isDeseqOpen}>
//         <GridContainer>



//           <Deseq2Item>
//             <GenericAnalysis
//               title="Deseq2"
//               config={analysisConfigs.deseq2}
//               apiFunction={(params) => submitDeseq2(projectId, params)}
//               onResult={setDeseq2Result}
//             />
//           </Deseq2Item>




//               <Deseq2StaticsItem>
//                 <GenericAnalysis
//                   title="Deseq2 Statistics"
//                   apiFunction={() => submitDeseqStats(projectId)}
//                   onResult={setDeseq2Statistics}
//                   parseFunction={parseDeseqStats}
//                 />
//               </Deseq2StaticsItem>

//               <Deseq2GSEAItem>
//                 <GenericAnalysis
//                   title="Deseq2 GSEA"
//                   config={analysisConfigs.deseq2GSEA}
//                   apiFunction={(params) => submitDeseqGSEA(projectId, params)}
//                   onResult={setDeseq2GSEAResult}
//                 />
//               </Deseq2GSEAItem>


//               <ReactomeItem>
//                 <GenericAnalysis
//                   title="Reactome Result"
//                   //config={analysisConfigs.deseq2Reactome}
//                   apiFunction={() => runReactomeAndStatus(projectId)}
//                   onResult={setReactomeResult}
//                 />
//               </ReactomeItem>

//             </GridContainer>
//             </SectionContent>
//             </AnalysisSectionContainer>



//             <div>
//               <ShowButton onClick={() => setDeseqShowResults(!deseqShowResults)}>
//                 {deseqShowResults ? 'Hide Results' : 'Show Results'}
//               </ShowButton>

//               {deseqShowResults && deseq2GSEAResult && (
//                 <DeseqGSEA resultData={deseq2GSEAResult} />
//               )}

//               {deseqShowResults && deseq2Statistics && (
//                 <DeseqStats resultData={deseq2Statistics} />
//               )}

//               {deseqShowResults && reactomeResult && (
//                 <DeseqReactome resultData={reactomeResult} />
//               )}

//             </div>


//             {/* Feature Generation Section */}
//             <AnalysisSectionContainer>
//               <SectionHeader onClick={toggleFeatureGenOpen}>
//                 <SectionTitle>Feature Generation</SectionTitle>
//                 <Icon>{isFeatureGenOpen ? <FaChevronUp /> : <FaChevronDown />}</Icon>
//               </SectionHeader>
//               <SectionContent isOpen={isFeatureGenOpen}>
//             <GridContainer>
//               <GenericAnalysis
//                 title="General GSEA"
//                 config={analysisConfigs.GeneralGSEA}
//                 apiFunction={(params) => submitGeneralGSEA(projectId, params)}
//                 onResult={setGeneralGSEAResult}
//               />

//               <GenericAnalysis
//                 title="WGCNA"
//                 config={analysisConfigs.WGCNA}
//                 apiFunction={(params) => submitWGCNA(projectId, params)}
//                 onResult={setWgcnaResult}
//               />
//             </GridContainer>
//             </SectionContent>
//             </AnalysisSectionContainer>

//             <div>
//               <ShowButton onClick={() => setFeatureGenShowResults(!featureGenShowResults)}>
//                 {featureGenShowResults ? 'Hide Results' : 'Show Results'}
//               </ShowButton>

//               {featureGenShowResults && generalGSEAResult && (
//                 <GSEANoDeseq resultData={generalGSEAResult} />
//               )}

//               {featureGenShowResults && wgcnaResult && (
//                 <WGCNAResults resultData={wgcnaResult} />
//               )}
//             </div>


//             <AnalysisSectionContainer>
//               <SectionHeader onClick={toggleModelOpen}>
//                 <SectionTitle>Modeling</SectionTitle>
//                 <Icon>{isModelOpen ? <FaChevronUp /> : <FaChevronDown />}</Icon>
//               </SectionHeader>
//               <SectionContent isOpen={isModelOpen}>
//             <GridContainer>


//               <Deseq2Item>
//                 <GenericAnalysis
//                   title="Baseline Selection"
//                   config={analysisConfigs.baselineSelection}
//                   apiFunction={(params) => submitBaselineSelection(projectId, params)}
//                   onResult={setBaselineSelectionResult}
//                 />
//               </Deseq2Item>



//               <Deseq2Item>
//                 <GenericAnalysis
//                   title="Gene Collection"
//                   config={analysisConfigs.geneCollection}
//                   apiFunction={(params) => submitGeneCollection(projectId, params)}
//                   onResult={setGeneCollectionResult}
//                 />
//               </Deseq2Item>



//               {/* this block is for model */}
//               <Deseq2StaticsItem>
//                 <GenericAnalysis
//                   title="Gene Selection"
//                   config={analysisConfigs.geneSelection}
//                   apiFunction={(params) => submitGeneSelection(projectId, params)}
//                   onResult={setGeneSelection}
//                 />
//               </Deseq2StaticsItem>



//               <Deseq2GSEAItem>
//                 <GenericAnalysis
//                   title="Base Model"
//                   config={analysisConfigs.baseModel}
//                   apiFunction={(params) => trainAndEvaluateBaseModel(projectId, params)}
//                   onResult={setBaseModel}
//                 />
//               </Deseq2GSEAItem>


//               <ReactomeItem>
//                 <GenericAnalysis
//                   title="MLP Model"
//                   config={analysisConfigs.MLPModel}
//                   apiFunction={(params) => trainAndEvaluateMlpModel(projectId, params)}
//                   onResult={setMlpModel}
//                 />
//               </ReactomeItem>

//             </GridContainer>

//             </SectionContent>
//             </AnalysisSectionContainer>

//             <div>
//                 <ShowButton onClick={() => setModelShowResults(!modelShowResults)}>
//                   {modelShowResults ? 'Hide Results' : 'Show Results'}
//                 </ShowButton>


//                 {modelShowResults && baseModel && (
//                   <BaseModel resultData={baseModel} />
//                 )}

//                 {modelShowResults && mlpModel && (
//                   <MlpModel resultData={mlpModel} />
//                 )}

//               </div>



//           </FormContainer>)}




//         <Footer>
//           © Copyright Genenet Technology (UK). All Rights Reserved.
//         </Footer>

//       </MainContent>


//     </Layout>
//   );
// };

// export default ProjectPage;
