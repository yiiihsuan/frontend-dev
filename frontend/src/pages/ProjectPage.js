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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import VideoFileUploader from '../components/VideoFileUploader'; 


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
  const [heartVideoFiles, setHeartVideoFiles] = useState([]); 
  const [isProcessOpen, setIsProcessOpen] = useState(false);


  // const [deseq2Result, setDeseq2Result] = useState(null);
  // const [deseq2GSEAResult, setDeseq2GSEAResult] = useState(null);
  // const [reactomeResult, setReactomeResult] = useState(null);
  // const [deseq2Statistics, setDeseq2Statistics] = useState(null);
  // const [generalGSEAResult, setGeneralGSEAResult] = useState(null);
  // const [wgcnaResult, setWgcnaResult] = useState(null);
  // const [baselineSelectionResult, setBaselineSelectionResult] = useState(null);
  // const [geneCollectionResult, setGeneCollectionResult] = useState(null);
  // const [geneSelection, setGeneSelection] = useState(null);
  // const [baseModel, setBaseModel] = useState(null);
  // const [mlpModel, setMlpModel] = useState(null);

  const [deseq2Result, setDeseq2Result] = useState(() => {
    const storedData = localStorage.getItem('Deseq2Result');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [deseq2GSEAResult, setDeseq2GSEAResult] = useState(() => {
    const storedData = localStorage.getItem('Deseq2 GSEAResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [reactomeResult, setReactomeResult] = useState(() => {
    const storedData = localStorage.getItem('Reactome ResultResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [deseq2Statistics, setDeseq2Statistics] = useState(() => {
    const storedData = localStorage.getItem('Deseq2 StatisticsResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [generalGSEAResult, setGeneralGSEAResult] = useState(() => {
    const storedData = localStorage.getItem('General GSEAResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [wgcnaResult, setWgcnaResult] = useState(() => {
    const storedData = localStorage.getItem('WGCNAResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [baselineSelectionResult, setBaselineSelectionResult] = useState(() => {
    const storedData = localStorage.getItem('Baseline SelectionResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [geneCollectionResult, setGeneCollectionResult] = useState(() => {
    const storedData = localStorage.getItem('Gene CollectionResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [geneSelection, setGeneSelection] = useState(() => {
    const storedData = localStorage.getItem('Gene SelectionResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [baseModel, setBaseModel] = useState(() => {
    const storedData = localStorage.getItem('Base ModelResult');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [mlpModel, setMlpModel] = useState(() => {
    const storedData = localStorage.getItem('MLP ModelResult');
    return storedData ? JSON.parse(storedData) : null;
  });





  const [deseqShowResults, setDeseqShowResults] = useState(false); 
  const [featureGenShowResults, setFeatureGenShowResults] = useState(false); 
  const [modelShowResults, setModelShowResults] = useState(false); 


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



  const handleUpload = (file, type) => {
    if (!projectId) {
      console.error("Project ID is not set");
      alert("Project ID is not set.");
      return;
    }
    if (!file) {
      console.error("No file selected");
      alert("No file selected.");
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

  const handleUploadVideo = (file) => {
    console.log(`Uploading: ${file.name}`);
    setHeartVideoFiles(prevFiles => [...prevFiles, file]); // 將上傳的檔案添加到狀態中
  };

  const getFilesByPrefix = (prefix) => {
    return heartVideoFiles.filter(file => file.name.startsWith(prefix));
  };


  // const downloadPDF = async () => {
  //   const doc = new jsPDF();
  //   const element = document.getElementById('results-container'); 
    
  //   const canvas = await html2canvas(element);
  //   const imgData = canvas.toDataURL('image/png');

  //   doc.addImage(imgData, 'PNG', 10, 10); 
  //   doc.save('ProjectResults.pdf'); 
  // };


  //換頁
  // const downloadPDF = async () => {
  //   const doc = new jsPDF('p', 'mm', 'a4'); // A4
  //   const element = document.getElementById('pdf-content'); 
  
  //   const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  //   const imgData = canvas.toDataURL('image/png');
  
  //   const imgWidth = doc.internal.pageSize.getWidth() - 20; // 圖片寬度&邊距
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width; // 根據比例計算高度
  
  //   let heightLeft = imgHeight; // 剩餘高度
  //   let position = 10; // 初始位置
    
  //   // 如果圖片高度超過一頁
  //   while (heightLeft > 0) {
  //     doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //     heightLeft -= doc.internal.pageSize.getHeight(); // 減少剩餘高度
  
  //     if (heightLeft > 0) {
  //       doc.addPage(); // 添加新頁
  //       position = 0; // 更新位置回到頁面頂部
  //     } else {
  //       position -= imgHeight; // 更新位置，處理可能的偏移
  //     }
  //   }
  
  //   doc.save('ProjectResults.pdf'); 
  // };

  //頁面會重複
  // const downloadPDF = async () => {
  //   const doc = new jsPDF('p', 'mm', 'a4'); // A4
  //   const blocks = document.querySelectorAll('#pdf-content .pdf-section'); // 獲取所有區塊
  
  //   for (const block of blocks) {
  //     const canvas = await html2canvas(block, { scale: 2, useCORS: true });
  //     const imgData = canvas.toDataURL('image/png');
  
  //     const imgWidth = doc.internal.pageSize.getWidth() - 20; // 圖片寬度&邊距
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width; // 根據比例計算高度
  
  //     let heightLeft = imgHeight; // 剩餘高度
  //     let position = 10; // 初始位置
  
  //     // 如果圖片高度超過一頁
  //     while (heightLeft > 0) {
  //       doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //       heightLeft -= doc.internal.pageSize.getHeight(); // 減少剩餘高度
  
  //       if (heightLeft > 0) {
  //         doc.addPage(); // 添加新頁
  //         position = 0; // 更新位置回到頁面頂部
  //       }
  //     }
      
  //     // 如果不是最後一個區塊，則添加新頁
  //     if (block !== blocks[blocks.length - 1]) {
  //       doc.addPage();
  //     }
  //   }
  
  //   doc.save('ProjectResults.pdf'); 
  // };
  async function downloadPDF() {
    const doc = new jsPDF('p', 'mm', 'a4'); 
    let position = 0; 
    const pageHeight = doc.internal.pageSize.getHeight(); 

    const blocks = document.querySelectorAll('#pdf-content .pdf-section'); 

    for (const block of blocks) {
        const canvas = await html2canvas(block, {
            scale: window.devicePixelRatio * 2, 
            useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');
        
        const imgWidth = doc.internal.pageSize.getWidth() - 20; 
        let imgHeight = (canvas.height * imgWidth) / canvas.width; 

        let sy = 0; 
        while (imgHeight > 0) {
            if (position + imgHeight > pageHeight) {
                const heightOnPage = pageHeight - position; 
                const sliceHeight = (heightOnPage * canvas.height) / imgHeight; 

                doc.addImage(imgData, 'PNG', 10, position, imgWidth, heightOnPage, undefined, 'FAST', 0, sy);
                sy += sliceHeight; 
                imgHeight -= heightOnPage;
                doc.addPage(); 
                position = 0; 
            } else {
                doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight, undefined, 'FAST', 0, sy);
                position += imgHeight; 
                break; 
            }
        }
        if (block !== blocks[blocks.length - 1]) {
            doc.addPage();
            position = 0; 
        }
    }

    doc.save('ProjectResults.pdf'); 
}

  


  // const downloadPDF = async () => {
  //   const doc = new jsPDF();
  //   const element = document.getElementById('results-container'); 
    
  //   // 確保該元素不為空
  //   if (element.innerHTML.trim() === '') {
  //     console.error('Element is empty. No content to capture.');
  //     return;
  //   }
  
  //   try {
  //     // 使用 html2canvas 將元素轉換為畫布
  //     const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  //     const imgData = canvas.toDataURL('image/png');
      
  //     // 創建新的 Image 對象來測試圖片的加載
  //     const img = new Image();
  //     img.src = beatingPlotUrl; // 使用你的圖片 URL
  //     img.onload = () => {
  //       const imgWidth = 190; // PDF 的寬度設置
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width; // 根據寬度調整高度
  
  //       // 添加圖片到 PDF
  //       doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
  //       doc.save('ProjectResults.pdf');
  //     };
  
  //     img.onerror = () => {
  //       console.error('Failed to load image. Please check the URL.');
  //     };
  //   } catch (error) {
  //     console.error('Error capturing element:', error);
  //   }
  // };

  // const waitForImages = () => {
  //   const images = document.querySelectorAll('img');
  //   const loadPromises = Array.from(images).map(img => {
  //     return new Promise((resolve) => {
  //       if (img.complete) {
  //         resolve(); 
  //       } else {
  //         img.onload = resolve;
  //         img.onerror = resolve; 
  //       }
  //     });
  //   });
  
  //   return Promise.all(loadPromises);
  // };

  // const downloadPDF = async () => {
  //   const doc = new jsPDF();
  //   const element = document.getElementById('pdf-content'); 
    
  //   if (element.innerHTML.trim() === '') {
  //     console.error('Element is empty. No content to capture.');
  //     return;
  //   }

  //   await waitForImages();
  
  //   setTimeout(async () => {
  //   try {
  //     const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  //     const imgData = canvas.toDataURL('image/png');
  
  //     const imgWidth = 190; 
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width; 
  
  //     doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
  //     doc.save('ProjectResults.pdf');
  //   } catch (error) {
  //     console.error('Error capturing element:', error);
  //   }
  //   }, 2000); 
  // };

  // const handleUploadFiles = (prefix) => {
  //   const filesToUpload = files.filter(file => file.name.startsWith(prefix));
  //   filesToUpload.forEach(file => handleUpload(file, file.type)); 
  //   setFiles(prevFiles => prevFiles.filter(file => !filesToUpload.includes(file))); 
  // };


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


        {/* <VideoFileUploader
          title="Heart Beat Video"
          file={heartVideoFile}
          setFile={setHeartVideoFile}
          uploadType="video" 
          handleUpload={handleUpload}
        /> */}

           {/* {beatingCount !== null && beatingPlotUrl !== null && (
          <div className="analysis-result">
            <h2>Beating Analysis Results</h2>
            <p><strong>Beating Count:</strong> {beatingCount}</p>
            <img src={beatingPlotUrl} alt="Beating Plot" style={{ width: '50%', height: 'auto' }} />
          </div>
        )} */}

<VideoFileUploader
  title="Heart Beat Video"
  handleUpload={handleUpload}
  projectId={projectId}
/>


      {/* <FilePreviewSection>
        <FilePreviewBlock>
          <h3>Test Files</h3>
          {getFilesByPrefix('test_').map((file, index) => (
          <FileName key={index}>{file.name}</FileName>
          ))}
          <UploadButton onClick={() => handleUploadFiles('test_')}>Upload Test Files</UploadButton>
        </FilePreviewBlock>

        <FilePreviewBlock>
          <h3>Control Files</h3>
          {getFilesByPrefix('control_').map((file, index) => (
          <FileName key={index}>{file.name}</FileName>
        ))}
        <UploadButton onClick={() => handleUploadFiles('control_')}>Upload Control Files</UploadButton>
        </FilePreviewBlock>

        <FilePreviewBlock>
          <h3>Treatment Files</h3>
          {getFilesByPrefix('treatment_').map((file, index) => (
          <FileName key={index}>{file.name}</FileName>
        ))}
        <UploadButton onClick={() => handleUploadFiles('treatment_')}>Upload Treatment Files</UploadButton>
        </FilePreviewBlock>
      </FilePreviewSection> */}


{beatingCount !== null && beatingPlotUrl !== null && (
<AnalysisResultContainer>
  <h2>Beating Analysis Results</h2>
  <p><strong>Beating Count:</strong> {beatingCount}</p>
  <BeatingPlotImage src={beatingPlotUrl} alt="Beating Plot" />
</AnalysisResultContainer>
)}

<button onClick={downloadPDF}>Download PDF</button>

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


            <div id="pdf-content">

          <div class="pdf-section">

            <SectionContainer title="deseq2" isOpen={isDeseqOpen} toggleOpen={toggleDeseqOpen}>
              <Deseq2Item>
                <GenericAnalysis
                  title="Deseq2"
                  config={analysisConfigs.deseq2}
                  apiFunction={(params) => submitDeseq2(projectId, params)}
                  onResult={setDeseq2Result}
                />
              </Deseq2Item>



              <Deseq2StaticsItem >
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


 

              {deseq2GSEAResult && (
                <DeseqGSEA id="results-container" resultData={deseq2GSEAResult} />
              )}

</div>

<div class="pdf-section">
     
              {deseq2Statistics && (
                <DeseqStats resultData={deseq2Statistics} />
              )}

</div>

<div class="pdf-section">
     
              {reactomeResult && (
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

            <div class="pdf-section">
              {generalGSEAResult && (
                <GSEANoDeseq resultData={generalGSEAResult} />
              )}

</div>

<div class="pdf-section">
              {wgcnaResult && (
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


             <div class="pdf-section">

              {baseModel && (
                <BaseModel resultData={baseModel} />
              )}

              {mlpModel && (
                <MlpModel resultData={mlpModel} />
              )}
        
              </div>
            </div>  
            {/* pdf content */}

          </FormContainer>)}
        <Footer>
          © Copyright Genenet Technology (UK). All Rights Reserved.
        </Footer>
      </MainContent>
    </Layout>
  );
};

export default ProjectPage;









































