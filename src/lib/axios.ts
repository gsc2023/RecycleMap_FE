import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const setAuthAxios = (accessToken: string) => {
  instance.defaults.headers['AccessToken'] = accessToken;
};

export const unsetAuthAxios = () => {
  delete instance.defaults.headers['AccessToken'];
}

export default instance;
