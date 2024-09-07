import { create } from 'zustand';

interface Store {
  time: string;
  setTime: (newTime: string) => void;
}
const useSelectedFoodTimeStore = create<Store>((set) => ({
  time: '',
  setTime: (newTime) => set({ time: newTime }),
}));

export default useSelectedFoodTimeStore;
