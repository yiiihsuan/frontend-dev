import React from 'react';
import styled from 'styled-components';


const PageContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin-bottom: 2rem;
`;


const Document = () => {
  return (
    <PageContainer>
      <Title>Document</Title>

      <Section>
        <Subtitle>Gene Sequence Analysis</Subtitle>
        <Description>Upload the CSV file</Description>
        <Image src="/gene_counts_example.png" alt="Gene Sequence Analysis" />
      </Section>

      <Section>
        <Subtitle>Heart Beat Analysis</Subtitle>
        <Description>Upload the CSV file</Description>
        <Image src="/meta_sample.png" alt="Heart Beat Analysis" />
      </Section>

      <Section>
        <Subtitle>Heart Beat Video Analysis</Subtitle>
        <Description>
          You can upload multiple files with AVI / MP4 format
        </Description>
      </Section>
    </PageContainer>
  );
};

export default Document;
