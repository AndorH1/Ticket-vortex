import { privateApi } from './apiConfig';

export const getAllUsersByAdmin = async () => {
  try {
    const response = await privateApi.get(`/admin/getAll/Admin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await privateApi.get(`/admin/role/${username}`, {
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

export const getUserByIdAdmin = async (id: string) => {
  try {
    const response = await privateApi.get(`/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event data', error);
    throw error;
  }
};

export const updateUserRole = async (username: string, newRole: string) => {
  try {
    console.log(`${username}`, `${newRole}`);
    const response = await privateApi.put(`/admin/role/${username}`, { username, newRole });
    return response.data;
  } catch (error) {
    console.error('Error updating user role', error);
    throw error;
  }
};

export const updateUsrVerify = async (id: string) => {
  try {
    const response = await privateApi.put(`/admin/verify/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error updating user role', error);
    throw error;
  }
};
export const deleteUserByAdmin = async (username: string) => {
  try {
    const response = await privateApi.delete(`/admin/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete ticket');
  }
};
