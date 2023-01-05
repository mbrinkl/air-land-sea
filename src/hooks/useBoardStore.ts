import create from 'zustand';

interface IBoardStoreState {
  hoveredCardInfo: string;
  setHoveredCardInfo: (value: string) => void;
}

export const useBoardStore = create<IBoardStoreState>()((set) => ({
  hoveredCardInfo: '',
  setHoveredCardInfo: (value) => set(() => ({ hoveredCardInfo: value })),
}));
