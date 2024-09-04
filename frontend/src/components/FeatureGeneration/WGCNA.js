// import React from 'react';
// import styled from 'styled-components';

// const ResultContainer = styled.div`
//   margin-top: 20px;
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
// `;

// const GeneSetContainer = styled.div`
//   margin-bottom: 20px;
// `;

// const GeneList = styled.ul`
//   list-style-type: none;
//   padding-left: 0;

//   li {
//     margin-bottom: 5px;
//   }
// `;

// const KmeLinkContainer = styled.div`
//   text-align: center;
//   margin-top: 20px;

//   a {
//     display: inline-block;
//     padding: 10px 20px;
//     background-color: #007bff;
//     color: white;
//     border-radius: 8px;
//     text-decoration: none;

//     &:hover {
//       background-color: #0056b3;
//     }
//   }
// `;

// const WGCNAResults = ({ resultData }) => {

//   // Check if the resultData object is valid and contains the expected properties
//   if (!resultData || !resultData.WGCNA_gene_set || !resultData.KME_membership_url) {
//     return <ResultContainer><p>No data available.</p></ResultContainer>;
//   }

//   return (
//     <ResultContainer>
//       <h4>WGCNA Results</h4>

//       <GeneSetContainer>
//         <h5>WGCNA Gene Set</h5>
//         <GeneList>
//           {resultData.WGCNA_gene_set.map((gene, index) => (
//             <li key={index}>{gene}</li>
//           ))}
//         </GeneList>
//       </GeneSetContainer>

//       <KmeLinkContainer>
//         <h5>KME Membership Data</h5>
//         <a href={resultData.KME_membership_url} target="_blank" rel="noopener noreferrer">
//           Download KME Membership Data
//         </a>
//       </KmeLinkContainer>
//     </ResultContainer>
//   );
// };

// export default WGCNAResults;


import React, { useEffect } from 'react';
import styled from 'styled-components';

// Styled-components for styling
const ResultContainer = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const GeneSetContainer = styled.div`
  margin-bottom: 20px;
`;

const GeneList = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 5px;
  }
`;

const KmeLinkContainer = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    display: inline-block;
    padding: 10px 20px;
    background-color: #b3b3b3;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      background-color: #33333;
    }
  }
`;

const WGCNAResults = ({ resultData }) => {
  // Log the resultData for debugging
  useEffect(() => {
    console.log('WGCNAResults Component Mounted');
    console.log('Received resultData:', resultData);
  }, [resultData]);

  // Check if resultData is missing or invalid
  if (!resultData) {
    console.log('No resultData received, returning "No data available" message.');
    return <ResultContainer><p>No data available.</p></ResultContainer>;
  }

  if (!Array.isArray(resultData.WGCNA_gene_set)) {
    console.error('Expected WGCNA_gene_set to be an array, but got:', resultData.WGCNA_gene_set);
    return <ResultContainer><p>Invalid data format.</p></ResultContainer>;
  }

  if (!resultData.KME_membership_url) {
    console.warn('No KME_membership_url found in resultData.');
  }

  return (
    <ResultContainer>
      <h4>WGCNA Results</h4>

      <GeneSetContainer>
        <h5>WGCNA Gene Set</h5>
        <GeneList>
          {resultData.WGCNA_gene_set.map((gene, index) => (
            <li key={index}>{gene}</li>
          ))}
        </GeneList>
      </GeneSetContainer>

      <KmeLinkContainer>
        <h5>KME Membership Data</h5>
        <a href={resultData.KME_membership_url} target="_blank" rel="noopener noreferrer">
          Download KME Membership Data
        </a>
      </KmeLinkContainer>
    </ResultContainer>
  );
};

export default WGCNAResults;
