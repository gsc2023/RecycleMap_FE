import axios from 'axios';

const instance = axios.create({
  baseURL: '',
});

export const login = (accessToken: string) => {
  instance.defaults.headers['AccessToken'] = accessToken;
};

export const logout = () => {
  delete instance.defaults.headers['AccessToken'];
};

export default instance;
