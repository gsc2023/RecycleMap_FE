import { create } from "zustand";

interface token {
  id: string;
  setId: (id: string) => void;
}

const useTokenStore = create<token>()((set) => ({
  id: "0",
  setId: (id) => set((state) => ({ id: id })),
}));

export default useTokenStore;