import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';


const PageWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  background-color: #060326;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3; 
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  z-index: 2; 
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
  color: white;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 3rem;
  text-align: left;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 2rem;
`;

const BottomImage = styled.img`
  width: 80%;
  margin: 0 auto;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
`;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background: white;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 1rem;
//   width: 100%;
// `;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid white; 
  padding: 10px 0; 
  margin-bottom: 1rem;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  color: white;
  font-size: 1rem;
  border: 2px solid white;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  &:hover {
    background-color: #333;
    color: white;
  }
`;

const SignUpLink = styled.a`
  margin-top: 10px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const HomePage2 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  
    const navigate = useNavigate();
  
    const mutation = useMutation(
      ({ username, password }) => loginUser(username, password),
      {
        onSuccess: (data) => {
          login(data.access_token); 
          navigate('/home'); 
        },
        onError: (error) => {
          console.error('Login failed', error);
        },
      }
    );
  
    const handleLogin = (e) => {
      e.preventDefault();
      mutation.mutate({ username, password });
    };
  return (
    <PageWrapper>
     
      <OverlayImage src="/background.png" alt="Background Overlay" />

 
      <ContentWrapper>
    
        <LeftSection>
          <Header>We turn cells into AI computers</Header>
          <BottomImage src="/genenet.png" alt="AI illustration" />
        </LeftSection>


        <RightSection>
          <LoginContainer>
            <InputWrapper>
              <FaUser style={{ marginRight: '10px' }} />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <FaLock style={{ marginRight: '10px' }} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
            <LoginButton onClick={handleLogin}>Log in</LoginButton>
            <SignUpLink href="/sign-up">Sign up here</SignUpLink>
          </LoginContainer>
        </RightSection>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default HomePage2;
