// src/components/Preprocess.js

import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { submitPreprocess } from '../api';

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
  margin: 20px 0;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1; 
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const PreprocessComponent = ({ projectId }) => {
  const mutation = useMutation((params) => submitPreprocess(projectId, params));

  const handleSubmit = () => {
    const params = {
      sample_col: 'sample',
      raw_gene_col: 'Name',
      response_col: 'beat_per_min',
      min_val: 5,
      min_percent: 90,
      select_meta_groupby_cols: ['drug', 'hours', 'sample', 'duplicate_id'],
      control_col: 'drug',
      control_val: 'untreated',
      vehicle_control_val: 'dmso',
      gene_col: 'gene_id',
      target_col: 'beat_per_min',
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
    <FormContainer>
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
  );
};

export default PreprocessComponent;
