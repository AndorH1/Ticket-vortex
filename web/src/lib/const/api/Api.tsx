import axios from 'axios';
const API_URL = 'http://localhost:3000';

interface User {
  photo: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  role: string;
  country: string;
  city: string;
  password: string;
  username: string;
}
interface Event {
  eventId: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  type: string;
}

interface Ticket {
  eventId: string;
  price: string;
  category: string;
  quantity: number;
}
interface Tickets {
  ticketId: string;
  amount: number;
}

interface Reservation {
  eventId: string;
  tickets: Tickets[];
  amount: number;
}

/////////////////////////     USER
export const loginUser = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw new Error('Failed to login');
  }
};
export const getProfileUser = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/users/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data', error);
    throw error;
  }
};

export const registerUser = async (user: User) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user, {
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

export const updateProfileUser = async (username: string, profile: User) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(`${API_URL}/users/user/profile`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile data');
    throw error;
  }
};
export const getAllUsers = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await axios.get(`${API_URL}/users/getAll`, {
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
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const formData = new FormData();
    formData.append('file', photo);
    const response = await axios.post(`${API_URL}/users/upload-profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

///////////////////////// START EVENTS

export const getAllEvents = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await axios.get(`${API_URL}/event/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data', error);
    throw error;
  }
};

export const getEventById = async (id: string) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/event/${id}/tickets&reservations`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching event data', error);
    throw error;
  }
};

export const updateEvent = async (id: string, eventData: Event) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(`${API_URL}/event/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event data', error);
    throw error;
  }
};

export const addEvent = async (event: Event) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.post(`${API_URL}/event/create`, event, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/event/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('faild to delete event');
  }
};

///////////////////////// END EVENTS

/////////////////////////     TICKET
export const getAllTickets = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await axios.get(`${API_URL}/ticket/getAllTickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data', error);
    throw error;
  }
};
export const addTicket = async (ticket: Ticket) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.post(`${API_URL}/ticket/createTicket`, ticket, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add ticket');
  }
};

export const getTicketById = async (id: string) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/ticket/${id}`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket data', error);
    throw error;
  }
};

export const updateTicket = async (id: string, ticketData: Ticket) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(`${API_URL}/ticket/${id}`, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event data', error);
    throw error;
  }
};
export const deleteTicket = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/ticket/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('faild to delete event');
  }
};

/////////////////////////     END TICKET

/////////////////////////     START RESERVATION

export const getAllReservations = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await axios.get(`${API_URL}/reservation/getAllReservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data', error);
    throw error;
  }
};
export const getReservationById = async (id: string) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/reservation/${id}`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket data', error);
    throw error;
  }
};

export const updateReservation = async (_id: string, reservationData: Reservation) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(`${API_URL}/reservation/${_id}`, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating reservation data', error);
    throw error;
  }
};
export const updateReservationById = async (id: string, reservationData: Reservation) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(`${API_URL}/reservation/${id}`, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event data', error);
    throw error;
  }
};

export const deleteReservation = async (_id: string) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.delete(`${API_URL}/reservation/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error to delete event');
  }
};
/////////////////////////     END RESERVATION
