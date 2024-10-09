import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserSchema } from '../services/schemas/UserSchema';

interface CurrentUserState {
  user: User | null;
  setUser: (newUser: User | null) => void;
}

export const useCurrentUserStore = create<CurrentUserState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (newUser: User | null) => {
        if (newUser !== null) {
          try {
            UserSchema.parse(newUser);
          } catch (error) {
            console.error('Invalid user format:', error);
            return;
          }
        }
        set({ user: newUser });
      },
    }),
    {
      name: 'CURRENT_USER',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);