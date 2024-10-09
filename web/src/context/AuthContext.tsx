import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { storage } from '../utils/storage';
import { User } from '../type/userInterface';
import { loginUser, registerUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { privateApi } from '../api/apiConfig';

interface AuthState {
  access_token?: string;
  isLoggedIn: boolean;
  role?: string;
}

interface AuthContextType extends AuthState {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  register: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  access_token: storage.getToken('access_token') || undefined,
  role: undefined,
  isLoggedIn: !!storage.getToken('access_token'),
};

type Action =
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER_INFO'; payload: User };

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        access_token: action.payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return { ...state, access_token: undefined, isLoggedIn: false, role: undefined };
    case 'SET_USER_INFO':
      return {
        ...state,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: LoginData): Promise<void> => {
    try {
      const token = await loginUser(data.username, data.password);
      storage.setToken('access_token', token);
      dispatch({ type: 'LOGIN', payload: token });
      navigate('/profile');
      console.log('Login successful');
    } catch (error) {
      console.error('Failed to login', error);
      throw error;
    }
  };

  const logout = () => {
    storage.removeToken('access_token');
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    console.log('Logout successful');
    navigate('/welcome');
  };

  const register = async (user: User) => {
    try {
      await registerUser(user);
    } catch (error) {
      console.error('Failed to register user', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (state.isLoggedIn) {
        try {
          const response = await privateApi.get('/users/user/profile');
          if (response.status >= 200 && response.status < 300) {
            const userInfo: User = response.data; // Expecting role, username, verified
            dispatch({ type: 'SET_USER_INFO', payload: userInfo });
            setUser(userInfo);
            console.log('User info fetched successfully:', userInfo);
          } else {
            console.error(`Failed to fetch user info: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error occurred during user info fetching:', error);
        }
      }
    };

    fetchUserInfo();
  }, [state.isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        access_token: state.access_token,
        isLoggedIn: state.isLoggedIn,
        role: state.role,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface LoginData {
  username: string;
  password: string;
}
