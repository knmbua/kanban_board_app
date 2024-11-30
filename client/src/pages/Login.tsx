import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LoginProps } from '../interfaces/LoginProps';

import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    errorMessage: ''
  });
  const { setUser } = useOutletContext<LoginProps>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await login(loginData);

      setUser(user);
      navigate('/');
    } catch (err: any) {
      if (err.response.data) {
        setLoginData({
          ...loginData,
          errorMessage: err.response.data.message
        });
      } else {
        setLoginData({
          ...loginData,
          errorMessage: 'A login error occurred'
        });
      }
    }
    
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        {loginData.errorMessage && <p className='error'>{loginData.errorMessage}</p>}

        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          autoComplete='current-password'
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          autoComplete='current-password'
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;
