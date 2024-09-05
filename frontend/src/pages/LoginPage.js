
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import { loginUser } from '../api';  

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #f5f5f5;
// `;

// const Title = styled.h1`
//   font-size: 2em;
//   color: #614425;
// `;

// const Input = styled.input`
//   margin: 10px 0;
//   padding: 10px;
//   width: 300px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
// `;

// const Button = styled.button`
//   margin: 2%;
//   padding: 1% 3%;
//   font-family: 'Luckiest Guy', "Chocolate Classical Sans", sans-serif, cursive;
//   font-size: 16px;
//   background-color: #6E332A;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #6E332A;
//   }
// `;

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const mutation = useMutation(
//     ({ username, password }) => loginUser(username, password),
//     {
//       onSuccess: (data) => {
//         console.log('Login successful', data);

//         localStorage.setItem('token', data.access_token);

//         onLogin();  
//         navigate('/home');  
//       },
//       onError: (error) => {
//         console.error('Login failed', error);
//       },
//     }
//   );

//   const handleLogin = () => {
//     mutation.mutate({ username, password });
//   };

//   return (
//     <Container>
//       <Title>Login</Title>
//       <Input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <Input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button onClick={handleLogin} disabled={mutation.isLoading}>
//         {mutation.isLoading ? 'Logging in...' : 'Login'}
//       </Button>
//       {mutation.isError && <div>Error: {mutation.error.message}</div>}
//     </Container>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { loginUser } from '../api';  
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

const SignUpText = styled.p`
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

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation(
    ({ username, password }) => loginUser(username, password),
    {
      onSuccess: (data) => {
        console.log('Login successful', data);
        localStorage.setItem('token', data.access_token);
        onLogin();
        navigate('/home');
      },
      onError: (error) => {
        console.error('Login failed', error);
      },
    }
  );

  const handleLogin = () => {
    mutation.mutate({ username, password });
  };

  return (
    <Container>
      <Logo src="genenetlogo_small.png" alt="Logo" />
      <Title>Genenet GeneX Platform</Title>
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
      <Button onClick={handleLogin} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Logging in...' : 'log in'}
      </Button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      {/* <SignUpText>
        <a href="/sign-up">sign up here</a>
      </SignUpText> */}

<SignUpText>
        Don't have an account?{' '}
        <span onClick={() => navigate('/sign-up')} style={{ cursor: 'pointer' }}>
          Sign up here
        </span>
      </SignUpText>
    </Container>
  );
};

export default LoginPage;

