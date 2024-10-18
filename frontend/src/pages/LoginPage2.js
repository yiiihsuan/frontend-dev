import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';




const OverlayImage = styled.img`
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3; 
  z-index: 1;
`;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; 
  min-height:100vh;
  background-color: #060326;
`;

const ContentWrapper = styled.div`
  flex: 1; 
  display: flex;
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
  font-size: 4.8rem;
  text-align: left;
  font-family: "Chakra Petch",'Londrina Sketch', 'Courier New', Courier, monospace;
  margin-bottom: 1rem;
`;

const BottomImage = styled.img`
  width: 75%;
  margin: 0 auto;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  background: none;
`;


const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid white; 
  padding: 10px 0; 
  margin-bottom: 1rem;
  width: 100%;
  background: none; 
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
  background-color: transparent; 
  color: white; 
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  color: white;
  font-size: 1rem;
  border: 2px solid white;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  background-color: transparent;
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

const SignUpText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: white;

  a {
    color: white;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #F5F5F5;
    }
  }
`;

// const Footer = styled.footer`
//   text-align: center;
//   padding: 10px 0;
//   color: #333;
//   font-size: 0.9em;
//   border-top: 1px solid #ddd;
//   position: relative;
//   bottom: 0;
//   width: 100%;
//   margin-top: 20px;
// `;

const Footer = styled.footer`
  text-align: center;
  padding: 8px 0;
  color: white;
  font-size: 0.9em;
  border-top: 1px solid #ddd;
  width: 100%; 
  background-color: black;
`;

const LogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: white;
  margin-left: 10px;
  position:relative;
  text-decoration: underline;
  z-index:20;

  img {
    width: 13px;
    height: 13px;
    margin-right: 5px;
  }

  // &:hover {
  //   text-decoration: underline;
  // }
`;

const LoginPage2 = () => {
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
          <BottomImage src="/genenet2.png" alt="AI illustration" />
        </LeftSection>


        <RightSection>
          <LoginContainer>
            <InputWrapper>
              <FaUser style={{ color: 'white', marginRight: '10px' }} />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <FaLock style={{ color: 'white', marginRight: '10px' }} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
            <LoginButton onClick={handleLogin} disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Logging in...' : 'log in'}
            </LoginButton>
            {mutation.isError && <div>Error: {mutation.error.message}</div>}
            <SignUpText>
              Don't have an account?{' '}
              <span onClick={() => navigate('/sign-up')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                Sign up here
              </span>
            </SignUpText>
          </LoginContainer>
        </RightSection>


      </ContentWrapper>

      <Footer>
        © Copyright Genenet Technology (UK). All Rights Reserved. Learn more on
        <LogoLink href="http://homepage.genenet.co/" target="_blank" rel="noopener noreferrer" >
          <img src="/genenetlogo_small.png" alt="Genenet Logo" />
          Genenet Technology
        </LogoLink>
      </Footer>




    </PageWrapper>
  );
};

export default LoginPage2;
