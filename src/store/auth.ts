import { create } from 'zustand';
import { MethodWrap, OnlyState } from './base';
import { login, logout } from '../lib/axios';

interface MemberVars {
  authToken: string | null;
}

interface MethodParam {
  login: string;
  logout: void;
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const INIT_STATE: MemberVars = {
  authToken: null,
};

const useStore = create<StateType>((set) => ({
  ...INIT_STATE,
  login(authToken) {
    set(() => ({ authToken }));
    login(authToken);
  },
  logout() {
    set(() => ({ authToken: null }));
    logout();
  }
}));

export default useStore as OnlyState<StateType>;
