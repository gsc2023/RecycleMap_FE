import { create } from 'zustand';
import { MethodWrap, OnlyState } from './base';

interface MemberVars {
  count: number;
}

interface MethodParam {
  increse: void;
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const INIT_STATE: MemberVars = {
  count: 0,
};

const useStore = create<StateType>((set) => ({
  ...INIT_STATE,
  increse() {
    set((state) => ({ count: state.count + 1 }));
  },
}));

export default useStore as OnlyState<StateType>;
