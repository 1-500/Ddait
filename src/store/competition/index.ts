import { create } from 'zustand';

interface CreateRoomState {
  title: string;
  maxMembers: number;
  competitionType: string;
  competitionTheme: string;
  startDate: {
    year: string;
    month: string;
    day: string;
  };
  endDate: {
    year: string;
    month: string;
    day: string;
  };
  isPrivate: boolean;
  hasSmartWatch: boolean;
  theme: string;

  setTitle: (title: string) => void;
  setMaxMembers: (maxMembers: number) => void;
  setTheme: (theme: string) => void;
  setCompetitionType: (competitionType: string) => void;
  setCompetitionTheme: (competitionTheme: string) => void;
  setStartDate: (startDate: { year: string; month: string; day: string }) => void;
  setEndDate: (endDate: { year: string; month: string; day: string }) => void;
  setIsPrivate: (isPrivate: boolean) => void;
  setHasSmartWatch: (hasSmartWatch: boolean) => void;
}

const useCreateRoomStateStore = create<CreateRoomState>((set) => ({
  title: '',
  maxMembers: 0,
  theme: '',
  competitionType: '',
  competitionTheme: '',
  startDate: { year: '2024', month: '8', day: '30' },
  endDate: { year: '0000', month: '0', day: '0' },
  isPrivate: false,
  hasSmartWatch: false,

  setTitle: (title) => set({ title }),
  setMaxMembers: (maxMembers) => set({ maxMembers }),
  setTheme: (theme) => set({ theme }),
  setCompetitionType: (competitionType) => set({ competitionType }),
  setCompetitionTheme: (competitionTheme) => set({ competitionTheme }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setIsPrivate: (isPrivate) => set({ isPrivate }),
  setHasSmartWatch: (hasSmartWatch) => set({ hasSmartWatch }),
}));
export default useCreateRoomStateStore;
