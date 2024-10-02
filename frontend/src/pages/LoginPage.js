// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate,Route,  Navigate  } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import { loginUser } from '../api';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #ffffff;
// `;

// const Logo = styled.img`
//   width: 100px;
//   margin-bottom: 20px;
// `;

// const Title = styled.h1`
//   font-size: 1.8em;
//   color: #000000;
//   margin-bottom: 30px;
// `;

// const InputContainer = styled.div`
//   position: relative;
//   margin-bottom: 20px;
// `;

// const InputIcon = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 10px;
//   transform: translateY(-50%);
//   color: #888888;
// `;

// const Input = styled.input`
//   width: 300px;
//   padding: 10px 10px 10px 40px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background-color: #f5f5f5;
// `;

// const Button = styled.button`
//   margin-top: 20px;
//   padding: 10px;
//   width: 320px;
//   font-size: 16px;
//   background-color: #000000;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #333333;
//   }
// `;

// const SignUpText = styled.p`
//   margin-top: 10px;
//   font-size: 14px;
//   color: #333333;

//   a {
//     color: #333333;
//     text-decoration: underline;
//     cursor: pointer;

//     &:hover {
//       color: #000000;
//     }
//   }
// `;

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();  // 從 useAuth 中獲取 login 函數
//   const navigate = useNavigate();

//   const mutation = useMutation(
//     ({ username, password }) => loginUser(username, password),
//     {
//       onSuccess: (data) => {
//         login(data.access_token); // 調用 login 函數設置登入狀態
//         navigate('/home');  // 登入後重定向到 /home
//       },
//       onError: (error) => {
//         console.error('Login failed', error);
//       },
//     }
//   );

//   const handleLogin = (e) => {
//     e.preventDefault();
//     mutation.mutate({ username, password });
//   };

//   return (
//     <Container>
//       <form onSubmit={handleLogin}>
//         <FaUser />
//         <input 
//           type="text" 
//           placeholder="Username" 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} 
//         />
//         <FaLock />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//         />
//         <button type="submit" disabled={mutation.isLoading}>
//           {mutation.isLoading ? 'Logging in...' : 'Log in'}
//         </button>
//         {mutation.isError && <div>Error: {mutation.error.message}</div>}
//       </form>
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
import { useAuth } from '../context/AuthContext';


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

const LoginPage = () => {
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
//       <Logo src="genenetlogo_small.png" alt="Logo" />
//       <Title>Genenet GeneX Platform</Title>
//       <InputContainer>
//         <InputIcon><FaUser /></InputIcon>
//         <Input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </InputContainer>
//       <InputContainer>
//         <InputIcon><FaLock /></InputIcon>
//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </InputContainer>
//       <Button onClick={handleLogin} disabled={mutation.isLoading}>
//         {mutation.isLoading ? 'Logging in...' : 'log in'}
//       </Button>
//       {mutation.isError && <div>Error: {mutation.error.message}</div>}
//       <SignUpText>
//         Don't have an account?{' '}
//         <span onClick={() => navigate('/sign-up')} style={{ cursor: 'pointer' }}>
//           Sign up here
//         </span>
//       </SignUpText>
//     </Container>
//   );
// };

// export default LoginPage;

