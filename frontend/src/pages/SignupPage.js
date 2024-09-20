import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { registerUser } from '../api'; 
import Swal from 'sweetalert2';

import { FaUser, FaLock } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.8em;
  color: #000000;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #888888;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px 10px 10px 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
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
      <Container>
        <Logo src="genenetlogo_small.png" alt="Logo" />
        <Title>Create Your Account</Title>
        <InputContainer>
          <InputIcon><FaUser /></InputIcon>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputIcon><FaLock /></InputIcon>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <Button onClick={handleSignUp} disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </Container>
    );
  };
  

export default SignUpPage;
