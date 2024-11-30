import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route '/auth/login' with the userInfo
  const res = await axios.post('/auth/login', userInfo);

  // TODO: return the user object from the response
  return res.data;
}

const register = async (userInfo: UserLogin) => {
  const res = await axios.post('/auth/register', userInfo);

  return res.data;
}

export const getUser = async () => {
  // TODO: Make a GET request to '/auth/user' to get the logged in user's data
  const res = await axios.get('/auth/user');

  // TODO: return the user object from the response
  return res.data;

}

export const logOut = async () => {
  // TODO: Make a GET request to '/auth/logout' to delete the user's cookie and log them out
  await axios.get('/auth/logout');

}


export { login, register };
