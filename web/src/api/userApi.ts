import { privateApi, publicApi } from './apiConfig';
import { User } from '../type/userInterface';
import { storage } from '../utils/storage';

export const loginUser = async (username: string, password: string): Promise<string> => {
  try {
    const response = await publicApi.post('/auth/login', { username, password });
    console.log(response.data);
    storage.setToken('access_token', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('API call error:', error);
    throw new Error('Failed to login');
  }
};

export const getProfileUser = async () => {
  const token = storage.getToken('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await privateApi.get('/users/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data', error);
    throw error;
  }
};
export const registerUser = async (user: User) => {
  try {
    const response = await publicApi.post(`/auth/register`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};
export const updateProfileUser = async (profile: User) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await privateApi.put(`/users/user/profile`, profile);

    return response.data;
  } catch (error) {
    console.error('Error updating profile data');
    throw error;
  }
};
export const getAllUsers = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await publicApi.get(`/users/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

export const uploadProfileImage = async (photo: File) => {
  try {
    const formData = new FormData();
    formData.append('file', photo);
    const response = await privateApi.put(`/users/upload-profile-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};
