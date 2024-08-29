import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


const SectionContainer = styled.div`
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #ddd;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  background-color: #b3b3b3;
  border-radius: 8px;
  font-weight: bold;
`;

const SectionContent = styled.div`
  max-height: ${(props) => (props.isOpen ? '1000px' : '0')}; 
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SectionContainer>
      <SectionHeader onClick={toggleSection}>
        {title}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </SectionHeader>
      <SectionContent isOpen={isOpen}>
        {children}
      </SectionContent>
    </SectionContainer>
  );
};

export default CollapsibleSection;
