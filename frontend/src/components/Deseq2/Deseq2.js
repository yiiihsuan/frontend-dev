import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { runDeseq } from '../../api';
import styled from 'styled-components';

const Deseq2Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FinishedIndicator = styled.span`
  color: green;
  margin-left: 10px;
`;

const Deseq2 = ({ formData, projectId }) => {
  const [isFinished, setIsFinished] = useState(false);

  const { mutate: doDESeq } = useMutation(
    () => runDeseq(projectId, formData),
    {
      onSuccess: () => setIsFinished(true),
      onError: (error) => {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      }
    }
  );

  useEffect(() => {
    doDESeq();
  }, [doDESeq]);

  return (
    <Deseq2Container>
      <h3>DESeq2</h3>
      {isFinished && <FinishedIndicator>✔️ Finished</FinishedIndicator>}
    </Deseq2Container>
  );
};

export default Deseq2;
