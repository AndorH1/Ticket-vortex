import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TokenState = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  clearToken: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (newToken: string | null) => {
        set({ token: newToken });
      },

      clearToken: () => {
        set({ token: null });
      },
    }),
    {
      name: 'ACCESS_TOKEN',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
