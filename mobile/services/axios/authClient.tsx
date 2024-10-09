import { post } from './client';
import { getCurrentUser } from './userClient';
import { useCurrentUserStore } from '../../store/UserStore';
import { useTokenStore } from '../../store/TokenStore';
import { clearAuthToken, setAuthToken } from './api';
import { User, UserSchema } from '../schemas/UserSchema';
import { UserRegister } from '../schemas/UserSchema';

const endpointsNest = {
  login: '/auth/login',
  register: '/auth/register',
  profile: '/users/user/profile',
};

export const useLogin = () => {
  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; user?: User; token?: string }> => {
    try {
      const response = await post<{ access_token: string }>(
        endpointsNest.login,
        { username, password },
        'public'
      );
      const accessToken = response.data.access_token;
      setAuthToken(accessToken);

      const responseCheckUser = await getCurrentUser();

      if (responseCheckUser && UserSchema.parse(responseCheckUser.data)) {
        return { success: true, user: responseCheckUser.data, token: accessToken };
      }

      return { success: false };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    }
  };

  return { login };
};

export const useLogout = () => {
  const { setUser } = useCurrentUserStore();
  const { setToken } = useTokenStore();

  const logout = () => {
    clearAuthToken();
    setUser(null);
    setToken(null);
  };

  return { logout };
};

export const useRegister = () => {
  const register = async (user: UserRegister) => {
    await post(endpointsNest.register, user);
  };
  return { register };
};
