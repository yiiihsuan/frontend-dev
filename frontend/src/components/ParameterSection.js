import React from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DropdownContainer = styled.div`
  background-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const DropdownContent = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #aaa;
  background-color: #ccc;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  box-sizing: border-box; 
  width: 100%;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  flex: 1;
  text-align: left;
  font-weight: bold;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 45%; 
`;

const Input = styled.input`
  flex: 2;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #aaa;
  min-width: 100px; 
  max-width: 50%; 
  box-sizing: border-box; 
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #666666;
  }
`;

const Dropdown = ({ title, items = [], inputValues = [], isOpen, onToggle, checked, onCheckChange, onInputChange, onSubmit }) => (
  <DropdownContainer>
    <DropdownHeader onClick={onToggle}>
      <HeaderLeft>
        <Checkbox checked={checked} onChange={onCheckChange} />
        {title}
      </HeaderLeft>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </DropdownHeader>
    {isOpen && (
      <DropdownContent>
        {items.map((item, index) => (
          <DropdownItem key={index}>
            <Label htmlFor={item}>{item}</Label>
            <Input
              id={item}
              value={inputValues[index]}
              onChange={(e) => onInputChange(index, e.target.value)}
            />
          </DropdownItem>
        ))}
        <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
      </DropdownContent>
    )}
  </DropdownContainer>
);

export default Dropdown;
