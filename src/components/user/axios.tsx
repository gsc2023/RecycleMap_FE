import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://49.50.174.35:4000',
});

export const login = (accessToken: string) => {
  instance.defaults.headers['AccessToken'] = accessToken;
};

export const logout = () => {
  delete instance.defaults.headers['AccessToken'];
};

export default instance;