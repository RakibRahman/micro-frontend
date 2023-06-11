import { create } from "zustand";

const useCountStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  removeAll: () => set({ count: 0 }),
}));

export default useCountStore;
