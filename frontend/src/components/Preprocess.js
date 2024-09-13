import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { submitPreprocess, fetchPreprocessBarPlot, fetchPreprocessViolinPlot, fetchPreprocessHeatmap } from '../api';

// const TitleContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 2rem;
//   font-weight: bold;
//   position: relative;
// `;

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


const Icon = styled.div`
  position: absolute;
  right: 20px;
  font-size: 1.2rem;
`;

const FormContainer = styled.div`
  display: ${(props) => (props.isOpen ? 'grid' : 'none')};
  grid-template-columns: repeat(3, 1fr);  
  gap: 20px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;  
  justify-content: space-between;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
  flex: 1;  
  margin-right: 10px;  
`;

const Input = styled.input`
  flex: 2;  
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33333;
  }
`;

const PlotContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const PlotImage = styled.img`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;



  const PreprocessComponent = ({ projectId }) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [barPlotUrl, setBarPlotUrl] = useState(null);
    const [violinPlotUrl, setViolinPlotUrl] = useState(null);
    const [violinLogPlotUrl, setViolinLogPlotUrl] = useState(null);
    const [heatmapUrl, setHeatmapUrl] = useState(null);
  
    const mutation = useMutation((params) => submitPreprocess(projectId, params), {
      onSuccess: async () => {
        console.log('Preprocess Success');
        try {
        const barPlotResponse = await fetchPreprocessBarPlot(projectId, {});
        const violinPlotResponse = await fetchPreprocessViolinPlot(projectId, {
          "target_col": "beat_per_min",
          "sample_col": "sample",
          "control_col": "drug",
          "log_transform": false, 
        });
        const violinLogPlotResponse = await fetchPreprocessViolinPlot(projectId, {
          "target_col": "beat_per_min",
          "sample_col": "sample",
          "control_col": "drug",
          "log_transform": true, 
        });
        const heatmapResponse = await fetchPreprocessHeatmap(projectId);

   
        setBarPlotUrl(barPlotResponse.url);
        setViolinPlotUrl(violinPlotResponse.url);
        setViolinLogPlotUrl(violinLogPlotResponse.url);  
        setHeatmapUrl(heatmapResponse.url);
        } catch (error) {
          console.error('Error fetching plots:', error);
        }
      },
      onError: (error) => {
        console.error('Preprocess Error', error);
      },
    });



  const handleSubmit = () => {
    // const params = {
    //   sample_col: 'sample',
    //   raw_gene_col: 'Name',
    //   response_col: 'beat_per_min',
    //   min_val: 5,
    //   min_percent: 90,
    //   select_meta_groupby_cols: ['drug', 'hours', 'sample', 'duplicate_id'],
    //   control_col: 'drug',
    //   control_val: 'untreated',
    //   vehicle_control_val: 'dmso',
    //   gene_col: 'gene_id',
    //   target_col: 'beat_per_min',
    // };

    const params = {
        sample_col: sampleCol,
        raw_gene_col: rawGeneCol,
        response_col: responseCol,
        min_val: minVal,
        min_percent: minPercent,
        select_meta_groupby_cols: selectMetaGroupbyCols.split(','),
        control_col: controlCol,
        control_val: controlVal,
        vehicle_control_val: vehicleControlVal,
        gene_col: geneCol,
        target_col: targetCol,
      };

    mutation.mutate(params, {
      onSuccess: (data) => {
        console.log('Preprocess Success', data);
      },
      onError: (error) => {
        console.error('Preprocess Error', error);
      },
    });
  };

  return (
    <>
      <TitleContainer onClick={() => setIsOpen(!isOpen)}>
        preprocess
        <Icon>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Icon>
      </TitleContainer>

      <FormContainer isOpen={isOpen}>
        <InputContainer>
          <Label>Sample Column</Label>
          <Input type="text" defaultValue="sample" />
        </InputContainer>

        <InputContainer>
          <Label>Raw Gene Column</Label>
          <Input type="text" defaultValue="Name" />
        </InputContainer>

        <InputContainer>
          <Label>Response Column</Label>
          <Input type="text" defaultValue="beat_per_min" />
        </InputContainer>

        <InputContainer>
          <Label>Min Value</Label>
          <Input type="number" defaultValue={5} />
        </InputContainer>

        <InputContainer>
          <Label>Min Percent</Label>
          <Input type="number" defaultValue={90} />
        </InputContainer>

        <InputContainer>
         <Label>Select Meta Groupby Columns</Label>
         <Input type="text" defaultValue="drug,hours,sample,duplicate_id" />
        </InputContainer>

        <InputContainer>
          <Label>Control Column</Label>
          <Input type="text" defaultValue="drug" />
        </InputContainer>

        <InputContainer>
          <Label>Control Value</Label>
          <Input type="text" defaultValue="untreated" />
        </InputContainer>

        <InputContainer>
          <Label>Vehicle Control Value</Label>
          <Input type="text" defaultValue="dmso" />
        </InputContainer>

        <InputContainer>
          <Label>Gene Column</Label>
          <Input type="text" defaultValue="gene_id" />
        </InputContainer>

        <InputContainer>
          <Label>Target Column</Label>
          <Input type="text" defaultValue="beat_per_min" />
        </InputContainer>

        <SubmitButton onClick={handleSubmit}>Run Preprocess</SubmitButton>

        {mutation.isLoading && <p>Loading...</p>}
        {mutation.isError && <p>Error occurred</p>}
        {mutation.isSuccess && <p>Preprocess completed!</p>}
      </FormContainer>

      <PlotContainer>
        {barPlotUrl && <PlotImage src={barPlotUrl} alt="Bar Plot" />}
        {violinPlotUrl && <PlotImage src={violinPlotUrl} alt="Violin Plot" />}
        {violinLogPlotUrl && <PlotImage src={violinLogPlotUrl} alt="Log Violin Plot" />}
        {heatmapUrl && <PlotImage src={heatmapUrl} alt="Heatmap" />}
      </PlotContainer>
    </>
  );
};

export default PreprocessComponent;


