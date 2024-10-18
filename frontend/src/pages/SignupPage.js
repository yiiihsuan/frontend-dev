import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api';
import Swal from 'sweetalert2';


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
  font-size: 5.5rem;
  text-align: left;
  font-family: 'Londrina Sketch', 'Courier New', Courier, monospace;
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
  width: 350px;
  background: none;
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

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  width: 320px;
  font-size: 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;


const LoginText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333333;

  a {
    color: #333333;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #000000;
    }
  }
`;

const SignUpPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const mutation = useMutation(
        ({ username, password }) => registerUser(username, password),
        {
            onSuccess: () => {
                Swal.fire({
                    title: 'Account created!',
                    text: 'Your account has been successfully created.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/');
                });
            },
            onError: (error) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message || 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            },
        }
    );

    const handleSignUp = () => {
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
            <LoginButton onClick={handleSignUp} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Creating account...' : 'Create account'}
            </LoginButton>

                        <LoginText>
                Already have an account?{' '}
                 <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    Log in here
                </span>
             </LoginText>
           


          </LoginContainer>
        </RightSection>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default SignUpPage;

