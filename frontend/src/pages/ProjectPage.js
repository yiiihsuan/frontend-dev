import React, { useState,useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { uploadFile, analyzeBeating } from '../api';
import styled from 'styled-components';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import Sidebar from '../components/SideBar';
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
import FileUploader from '../components/FileUploader';


const SectionContainer = ({ title, isOpen, toggleOpen, children }) => (
  <SectionWrapper>
    <SectionTitle onClick={toggleOpen}>
      {title}
      <ParaIcon>{isOpen ? <CiCircleChevUp /> : <CiCircleChevDown />}</ParaIcon>
    </SectionTitle>
    {isOpen && <GridContainer>{children}</GridContainer>}
  </SectionWrapper>
);

const SectionWrapper = styled.div`
  margin-top:10px;
  border: 2px solid #ccc; 
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 5px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

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

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  //border-radius: 8px;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  position: absolute;
  right: 20px;
  font-size: 1.2rem;
`;

const ParaIcon = styled.div`
  font-size: 1.5rem;
  color: #000;
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


const AnalysisResultContainer = styled.div`
  width: 100%; 
  text-align: center;
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin: 0 5%;  
`;

const BeatingPlotImage = styled.img`
  width: 100%; 
  height: auto;
  max-width: 1200px;  
  margin: 0 auto;  
`;


const ProjectPage = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { projectId } = useParams();
  const location = useLocation();
  const [geneFile, setGeneFile] = useState(null);
  const [heartFile, setHeartFile] = useState(null);
  const [heartVideoFile, setHeartVideoFile] = useState(null); 
  const [isProcessOpen, setIsProcessOpen] = useState(false);

  // const [deseq2Selected, setDeseq2Selected] = useState(false);
  const [deseq2Result, setDeseq2Result] = useState(null);
  const [deseq2GSEAResult, setDeseq2GSEAResult] = useState(null);
  const [reactomeResult, setReactomeResult] = useState(null);
  // const [showResults, setShowResults] = useState(false);
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


  const [isDeseqOpen, setIsDeseqOpen] = useState(false);
  const [isFeatureGenOpen, setIsFeatureGenOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const toggleDeseqOpen = () => setIsDeseqOpen(!isDeseqOpen);
  const toggleFeatureGenOpen = () => setIsFeatureGenOpen(!isFeatureGenOpen);
  const toggleModelOpen = () => setIsModelOpen(!isModelOpen);


  // const mutation = useMutation(uploadFile, {
  //   onSuccess: (data, variables) => {
  //     alert(`${variables.type} uploaded successfully`);
  //   },
  //   onError: (error, variables) => {
  //     console.error('Error:', error);
  //     alert(`Failed to upload ${variables.type}`);
  //   },
  // });

  const [beatingCount, setBeatingCount] = useState(null);
  const [beatingPlotUrl, setBeatingPlotUrl] = useState(null);


    const uploadMutation = useMutation(uploadFile, {
      onSuccess: (data, variables) => {
        alert(`${variables.type} uploaded successfully`);
      },
      onError: (error, variables) => {
        console.error('Error:', error);
        alert(`Failed to upload ${variables.type}`);
      },
    });
  

    const API_URL = process.env.REACT_APP_API_URL;

    const analyzeMutation = useMutation(analyzeBeating, {
      onSuccess: (data) => {
        alert(`File uploaded successfully`);
        setBeatingCount(data["Beating count"]); 
        setBeatingPlotUrl(`${API_URL}/${data["Beating plot url"]}`); 
      },
      onError: (error) => {
        console.error('Error:', error);
        alert(`Failed to upload file`);
      },
    });


  // const handleFileChange = (setter) => (event) => {
  //   const file = event.target.files[0];
  //   console.log("File selected:", file); // 確認文件是否正確選擇
  //   setter(file);
  // };



  // const handleUpload = (file, type) => {
  //   const projectId = localStorage.getItem('projectId');
  //   console.log('Handle upload parameters:', { file, type, projectId });

  //   if (!projectId) {
  //     console.error("Project ID is not set");
  //     alert("Project ID is not set. Please check your configuration.");
  //     return;
  //   }
  //   if (!file) {
  //     console.error("No file selected");
  //     alert("No file selected. Please select a file before uploading.");
  //     return;
  //   }
  //   mutation.mutate({
  //     file: file,
  //     projectId: projectId,
  //     type: type
  //   });
  // };

  const handleUpload = (file, type) => {
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

    if (type === "video") {
      analyzeMutation.mutate({ file: file, projectId: projectId });
    } else {
      uploadMutation.mutate({ file: file, projectId: projectId, type: type });
    }
  };

  const parseDeseqStats = (data) => {
    return Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }).data;
  };


  const clearLocalStorageResults = () => {
    localStorage.removeItem('Deseq2Result');
    localStorage.removeItem('Deseq2 GSEAResult');
    localStorage.removeItem('Deseq2 StatisticsResult');
    localStorage.removeItem('Gene CollectionResult');
    localStorage.removeItem('Gene SelectionResult');
    localStorage.removeItem('General GSEAResult');
    localStorage.removeItem('WGCNAResult');
    localStorage.removeItem('Base ModelResult');
    localStorage.removeItem('MLP ModelResult');
    localStorage.removeItem('Base ModelResult');
    localStorage.removeItem('Reactome ResultResult');
    localStorage.removeItem('projectId');
    console.log('LocalStorage cleared.');
  };

  // useEffect(() => {
  //   return () => {
  //     clearLocalStorageResults();
  //   };
  // }, []);

  useEffect(() => {
    if (!location.pathname.includes('/project/')) {
      clearLocalStorageResults();
    }
  }, [location]); 

  return (
    <Layout>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsLoggedIn={setIsLoggedIn} />
      <MainContent>
        <Title>{`Project ${projectId}`}</Title>
        {/* Gene Sequence Data Uploader */}
        <FileUploader
          title="Gene Sequence Data"
          file={geneFile}
          setFile={setGeneFile}
          uploadType="gene_counts"
          handleUpload={handleUpload}
        />

        {/* Heart Beat Data Uploader */}
        <FileUploader
          title="Heart Beat Data"
          file={heartFile}
          setFile={setHeartFile}
          uploadType="meta"
          handleUpload={handleUpload}
        />


        <FileUploader
          title="Heart Beat Video"
          file={heartVideoFile}
          setFile={setHeartVideoFile}
          uploadType="video" 
          handleUpload={handleUpload}
        />

           {/* {beatingCount !== null && beatingPlotUrl !== null && (
          <div className="analysis-result">
            <h2>Beating Analysis Results</h2>
            <p><strong>Beating Count:</strong> {beatingCount}</p>
            <img src={beatingPlotUrl} alt="Beating Plot" style={{ width: '50%', height: 'auto' }} />
          </div>
        )} */}

{beatingCount !== null && beatingPlotUrl !== null && (
<AnalysisResultContainer>
  <h2>Beating Analysis Results</h2>
  <p><strong>Beating Count:</strong> {beatingCount}</p>
  <BeatingPlotImage src={beatingPlotUrl} alt="Beating Plot" />
</AnalysisResultContainer>
)}


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
            {/* <SectionTitle>Deseq2</SectionTitle> */}

            <SectionContainer title="deseq2" isOpen={isDeseqOpen} toggleOpen={toggleDeseqOpen}>
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
            </SectionContainer>





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
            {/* <SectionTitle>Feature Generation</SectionTitle>
            <GridContainer> */}
            <SectionContainer title="Feature Generation" isOpen={isFeatureGenOpen} toggleOpen={toggleFeatureGenOpen}>
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
            </SectionContainer>

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


            {/* <SectionTitle>Modeling</SectionTitle>
            <GridContainer> */}

            <SectionContainer title="Modeling" isOpen={isModelOpen} toggleOpen={toggleModelOpen}>


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

            </SectionContainer>

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









































