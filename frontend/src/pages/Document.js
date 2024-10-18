import React from 'react';
import styled from 'styled-components';


const PageContainer = styled.div`
  padding: 2rem;
  background-color: #f0f0f0;
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
        <Description>Upload the CSV file in the following format:</Description>
        <Description><b>Name:</b> The gene name or identifier (e.g., MTATP6P1, NPPA).</Description>
        <Description><b>Length:</b> The length of the gene.</Description>
        <Description><b>EffectiveLength:</b> Adjusted gene length based on sequencing context.</Description>
        <Description><b>TPM:</b> Transcripts per million (TPM) value for gene expression.</Description>
        <Description><b>NumReads:</b> Number of reads mapped to the gene.</Description>
        <Description><b>Sample:</b> Sample identifier (e.g., B1).</Description>
        <Description><b>Name_cleaned:</b> Cleaned gene name or ID, free from formatting issues.</Description>
        <Description><b>gene_symbol:</b> Official symbol for the gene (e.g., NPPA, HSPB7).</Description>
        <Description><b>gene_product:</b> The product or function of the gene (e.g., protein name).</Description>
        <Description><b>type_of_gene:</b> Type of gene (e.g., protein-coding, pseudo).</Description>
        <Description><b>ensembl_id:</b> Ensembl ID of the gene (e.g., ENSG00000248527).</Description>
        <Image src="/gene_counts_example.png" alt="Gene Sequence Analysis" />
      </Section>

      <Section>
        <Subtitle>Heart Beat Analysis</Subtitle>
        <Description>Upload the CSV file in the following format:</Description>
        <Description><b>drug_sample:</b> Unique identifier for the drug sample (e.g., dmso_a1, doxorubicin_e1).</Description>
        <Description><b>drug:</b> Name of the drug used in the experiment (e.g., DMSO, Bortezomib).</Description>
        <Description><b>video_id:</b> Unique identifier for the video used for analysis (e.g., 839, 854).</Description>
        <Description><b>beat_per_min:</b> Heartbeat rate per minute recorded during the experiment (e.g., 58, 40).</Description>
        <Description><b>Note:</b> Any additional information or notes for the specific record (optional).</Description>
        <Description><b>sample:</b> Sample identifier used in the experiment (e.g., A1, E1, D1).</Description>
        <Description><b>hours:</b> Duration in hours the experiment was conducted (e.g., 24).</Description>
        <Description><b>duplicate_id:</b> Identifier to mark duplicate records (e.g., 1).</Description>

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
