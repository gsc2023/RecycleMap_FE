import { create } from 'zustand';
import { setAuthAxios, unsetAuthAxios } from '../lib/axios';
import { MethodWrap, OnlyState } from './base';

interface LoggedIn {
  login: true;
  uid: string;
  email: string;
  displayName: string;
  accessToken: string;
}

interface LoggedOut {
  login: false;
}

interface MethodParam {
  login: {
    uid: string;
    email: string;
    displayName: string;
    accessToken: string;
  };
  logout: void;
}

interface MemberVars {
  user: LoggedIn | LoggedOut;
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const item = localStorage.getItem('firebase:ac');
if (item) {
  const data = JSON.parse(item);
  setAuthAxios(data.user.accessToken);
}
const INIT_STATE: MemberVars = item ? JSON.parse(item) : {
  user: {
    login: false,
  },
};


const useStore = create<StateType>((set) => ({
  ...INIT_STATE,
  login(p) {
    setAuthAxios(p.accessToken);
    const ns = { user: { ...p, login: true, } };
    localStorage.setItem('firebase:ac', JSON.stringify(ns));
    set(ns);
  },
  logout() {
    unsetAuthAxios();
    const ns = { user: { login: false } };
    localStorage.setItem('firebase:ac', JSON.stringify(ns));
    set({ user: { login: false } });
  },
}));

export default useStore as OnlyState<StateType>;
