import { User } from '../schemas/UserSchema';
import { get, put, del } from './client';
import { UserList } from '../../utils/globalTypes';
import { ZodError } from 'zod';
import axios from 'axios';

const endpointsNest = {
  getAllUsers: '/users/getAll',
  getCurrentUser: '/users/user/profile',
  putUser: '/users/user/profile',
  getSearchTermUser: (searchTerm: string) => `/users/search/{searchTerm}?searchTerm=${searchTerm}`,
  getUserId: (userId: string) => `users/${userId}`,
  updatePassword: '/users/password',
  deleteCurrentUser: `users/{currentUser}`,
  uploadPicture: '/users/upload-profile-image',
};

export const getAllUsers = async (): Promise<UserList> => {
  try {
    const { data } = await get<UserList>(endpointsNest.getAllUsers);
    if (!data || !data.length || !data?.[0]?.id) {
      return [];
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCurrentUser = async (): Promise<{ data: User; status: number } | null> => {
  try {
    const response = await get<User>(endpointsNest.getCurrentUser, 'private');
    if (!response.data || !response.data?.id) {
      return null;
    }
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Invalid user format:', error);
    } else {
      console.error('Failed to fetch the current user:', error);
    }
    return null;
  }
};

export const updateUser = async (user: User) => {
  try {
    const response = await put(endpointsNest.putUser, user, 'private');
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const response = await put(
      endpointsNest.updatePassword,
      { oldPassword, newPassword },
      'private'
    );
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMyUser = async () => {
  try {
    const response = await del(endpointsNest.deleteCurrentUser, 'private');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchTermUser = async (searchTerm: string): Promise<UserList> => {
  try {
    if (!searchTerm) {
      return [];
    }
    const { data } = await get<UserList>(endpointsNest.getSearchTermUser(searchTerm), 'private');
    if (!data || !data.length || !data?.[0]?.id) {
      return [];
    }
    return data;
  } catch (error) {
    console.error(error);
    return [] as UserList;
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const { data } = await get<User>(endpointsNest.getUserId(userId), 'private');
    if (!data || !data?.id) {
      return null;
    }
    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Invalid user format:', error);
    } else {
      console.error('Failed to fetch the user:', error);
    }
    return null;
  }
};

export const uploadPicture = async (
  file: FormData
): Promise<{
  data: string;
  status: number;
}> => {
  try {
    const response = await put<{
      data: string;
      status: number;
    }>(endpointsNest.uploadPicture, file, 'private', {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Failed to upload the picture:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error(`Response headers:`, error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
