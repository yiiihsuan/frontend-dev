// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import ResultModal from '../components/ResultModal';
// import { useMutation } from 'react-query'; // 引入 react-query 的 useMutation
// import { fetchPlotData } from '../api'; // 从 api.js 中导入 API 函数


// const ResultContainer = styled.div`
//   margin-top: 20px;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 20px;
// `;

// const GridItem = styled.div`
//   position: relative;
//   cursor: pointer;
// `;

// const GridItemTitle = styled.div`
//   margin-top: 10px;
//   font-weight: bold;
//   text-align: center;
// `;

// const PreprocessResult = ({ projectId, isPreprocessFinished }) => {
//   const [barPlotUrl, setBarPlotUrl] = useState(null);
//   const [violinPlotUrl, setViolinPlotUrl] = useState(null);
//   const [violinLogPlotUrl, setViolinLogPlotUrl] = useState(null);
//   const [heatmapUrl, setHeatmapUrl] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalImageUrl, setModalImageUrl] = useState(null);
//   const [imageTitle, setImageTitle] = useState(null);

//   // 使用 useMutation 创建 API 调用的钩子
//   const { mutate: fetchPlot } = useMutation(
//     ({ plotType, params }) => fetchPlotData(projectId, plotType, params),
//     {
//       onSuccess: (data, { plotType }) => {
//         if (plotType === 'bar') setBarPlotUrl(data.url);
//         if (plotType === 'violin') setViolinPlotUrl(data.url);
//         if (plotType === 'violin_log') setViolinLogPlotUrl(data.url);
//         if (plotType === 'heatmap') setHeatmapUrl(data.url);
//         setIsSubmitted(true);
//       },
//       onError: (error) => {
//         console.error('Error fetching plot:', error);
//       },
//     }
//   );

//   useEffect(() => {
//     if (isPreprocessFinished) {
//       fetchPlot({ plotType: 'bar', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug' } });
//       fetchPlot({ plotType: 'violin', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug', log_transform: false } });
//       fetchPlot({ plotType: 'violin_log', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug', log_transform: true } });
//       fetchPlot({ plotType: 'heatmap', params: {} });
//     }
//   }, [isPreprocessFinished]);

//   const handleImageClick = (url, title) => {
//     setModalImageUrl(url);
//     setIsModalOpen(true);
//     setImageTitle(title);
//   };

//   return (
//     <ResultContainer>
//       {isSubmitted && (
//         <GridContainer>
//           <GridItem onClick={() => handleImageClick(barPlotUrl, 'Bar Plot')}>
//             {barPlotUrl && <img src={barPlotUrl} alt="Bar Plot" width="100%" />}
//             <GridItemTitle>Bar Plot</GridItemTitle>
//           </GridItem>

//           <GridItem onClick={() => handleImageClick(violinPlotUrl, 'Violin Plot')}>
//             {violinPlotUrl && <img src={violinPlotUrl} alt="Violin Plot" width="100%" />}
//             <GridItemTitle>Violin Plot</GridItemTitle>
//           </GridItem>

//           <GridItem onClick={() => handleImageClick(violinLogPlotUrl, 'Log Violin Plot')}>
//             {violinLogPlotUrl && <img src={violinLogPlotUrl} alt="Log Violin Plot" width="100%" />}
//             <GridItemTitle>Log Violin Plot</GridItemTitle>
//           </GridItem>

//           <GridItem onClick={() => handleImageClick(heatmapUrl, 'Heatmap')}>
//             {heatmapUrl && <img src={heatmapUrl} alt="Heatmap" width="100%" />}
//             <GridItemTitle>Heatmap</GridItemTitle>
//           </GridItem>
//         </GridContainer>
//       )}

//       <ResultModal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         contentLabel={imageTitle}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//           },
//         }}
//       >
//         <h2>{imageTitle}</h2>
//         {modalImageUrl && <img src={modalImageUrl} alt={imageTitle} width="100%" />}
//         <button onClick={() => setIsModalOpen(false)}>Close</button>
//         <button href={modalImageUrl} download>Download</button>
//       </ResultModal>
//     </ResultContainer>
//   );
// };

// export default PreprocessResult;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const GridItem = styled.div`
  position: relative;
`;

const GridItemTitle = styled.div`
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`;

const PreprocessResult = () => {
  // 假数据
  const [barPlotUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  const [violinPlotUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  const [violinLogPlotUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  const [heatmapUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  
  const [isSubmitted] = useState(true); // 手动设置为 true，以确保内容渲染

  useEffect(() => {
    // 这里本来是 API 调用的逻辑，现在注释掉
    // if (isPreprocessFinished) {
    //   fetchPlot({ plotType: 'bar', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug' } });
    //   fetchPlot({ plotType: 'violin', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug', log_transform: false } });
    //   fetchPlot({ plotType: 'violin_log', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug', log_transform: true } });
    //   fetchPlot({ plotType: 'heatmap', params: {} });
    // }
  }, []);

  return (
    <ResultContainer>
      <h2>Preprocess Result</h2>
      {isSubmitted && (
        <GridContainer>
          <GridItem>
            <img src={barPlotUrl} alt="Bar Plot" width="100%" />
            <GridItemTitle>Bar Plot</GridItemTitle>
          </GridItem>

          <GridItem>
            <img src={violinPlotUrl} alt="Violin Plot" width="100%" />
            <GridItemTitle>Violin Plot</GridItemTitle>
          </GridItem>

          <GridItem>
            <img src={violinLogPlotUrl} alt="Log Violin Plot" width="100%" />
            <GridItemTitle>Log Violin Plot</GridItemTitle>
          </GridItem>

          <GridItem>
            <img src={heatmapUrl} alt="Heatmap" width="100%" />
            <GridItemTitle>Heatmap</GridItemTitle>
          </GridItem>
        </GridContainer>
      )}
    </ResultContainer>
  );
};

export default PreprocessResult;

