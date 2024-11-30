import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LoginProps } from '../interfaces/LoginProps';


import { register } from "../api/authAPI";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: ''
  });
  const { setUser } = useOutletContext<LoginProps>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await register(registerData);

      setUser(user);
      navigate('/');
    } catch (err) {
      console.error('Failed to register', err);
    }
    
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={registerData.username || ''}
          autoComplete='username'
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={registerData.password || ''}
          autoComplete='current-password'
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Register;
