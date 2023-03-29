import { create } from 'zustand';
import { MethodWrap, OnlyState } from './base';

interface MemberVars {
  bookmarks: string[];
}

interface MethodParam {
  toggleBookMark: string;
  initBookMarks: string[];
}

type StateType = MemberVars & MethodWrap<MethodParam>;

const INIT_STATE: MemberVars = {
  bookmarks: [],
};

const useStore = create<StateType>((set) => ({
  ...INIT_STATE,
  toggleBookMark(p) {
    set((state) => {
      let ns = [...state.bookmarks];
      const idx = ns.findIndex(i => i === p);
      if (idx === -1) {
        ns.push(p);
      } else {
        ns.splice(idx, 1);
      }
      return {
        bookmarks: ns,
      }
    });
  },
  initBookMarks(p) {
    set({ bookmarks: p });
  },
}));

export default useStore as OnlyState<StateType>;
