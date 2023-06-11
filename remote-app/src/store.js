import create from "zustand";

const useCountStore = create((set) => ({
  count: 10,
  increase: () => set((state) => ({ count: state.count + 1 })),
  removeAll: () => set({ count: 0 }),
}));

export default useCountStore;
