

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

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
// `;

// const GridItemTitle = styled.div`
//   margin-top: 10px;
//   font-weight: bold;
//   text-align: center;
// `;

// const PreprocessResult = () => {
//   // 假数据
//   const [barPlotUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
//   const [violinPlotUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
//   const [violinLogPlotUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
//   const [heatmapUrl] = useState('https://images.unsplash.com/photo-1706694442016-bd539e1d102b?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  
//   const [isSubmitted] = useState(true); // 手动设置为 true，以确保内容渲染

//   useEffect(() => {
//     // 这里本来是 API 调用的逻辑，现在注释掉
//     // if (isPreprocessFinished) {
//     //   fetchPlot({ plotType: 'bar', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug' } });
//     //   fetchPlot({ plotType: 'violin', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug', log_transform: false } });
//     //   fetchPlot({ plotType: 'violin_log', params: { target_col: 'beat_per_min', sample_col: 'sample', control_col: 'drug', log_transform: true } });
//     //   fetchPlot({ plotType: 'heatmap', params: {} });
//     // }
//   }, []);

//   return (
//     <ResultContainer>
//       <h2>Preprocess Result</h2>
//       {isSubmitted && (
//         <GridContainer>
//           <GridItem>
//             <img src={barPlotUrl} alt="Bar Plot" width="100%" />
//             <GridItemTitle>Bar Plot</GridItemTitle>
//           </GridItem>

//           <GridItem>
//             <img src={violinPlotUrl} alt="Violin Plot" width="100%" />
//             <GridItemTitle>Violin Plot</GridItemTitle>
//           </GridItem>

//           <GridItem>
//             <img src={violinLogPlotUrl} alt="Log Violin Plot" width="100%" />
//             <GridItemTitle>Log Violin Plot</GridItemTitle>
//           </GridItem>

//           <GridItem>
//             <img src={heatmapUrl} alt="Heatmap" width="100%" />
//             <GridItemTitle>Heatmap</GridItemTitle>
//           </GridItem>
//         </GridContainer>
//       )}
//     </ResultContainer>
//   );
// };

// export default PreprocessResult;


import React from 'react';
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

const PreprocessResult = ({ result }) => {
  if (!result) {
    return <p>Loading...</p>; 
  }

  const { barPlotUrl, violinPlotUrl, violinLogPlotUrl, heatmapUrl } = result;

  return (
    <ResultContainer>
      <h2>Preprocess Result</h2>
      <GridContainer>
        {barPlotUrl && (
          <GridItem>
            <img src={barPlotUrl} alt="Bar Plot" width="100%" />
            <GridItemTitle>Bar Plot</GridItemTitle>
          </GridItem>
        )}

        {violinPlotUrl && (
          <GridItem>
            <img src={violinPlotUrl} alt="Violin Plot" width="100%" />
            <GridItemTitle>Violin Plot</GridItemTitle>
          </GridItem>
        )}

        {violinLogPlotUrl && (
          <GridItem>
            <img src={violinLogPlotUrl} alt="Log Violin Plot" width="100%" />
            <GridItemTitle>Log Violin Plot</GridItemTitle>
          </GridItem>
        )}

        {heatmapUrl && (
          <GridItem>
            <img src={heatmapUrl} alt="Heatmap" width="100%" />
            <GridItemTitle>Heatmap</GridItemTitle>
          </GridItem>
        )}
      </GridContainer>
    </ResultContainer>
  );
};

export default PreprocessResult;


