import { Dimensions, Platform } from 'react-native';

export const screenHeight = Dimensions.get('screen').height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const baseURLNestBackend = 'http://192.168.1.22:3000';

export const StatusCodes = {
  OK: 200,
  MULTIPLE_CHOICES: 300,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export const phantomPhotos = {
  profile:
    'https://firebasestorage.googleapis.com/v0/b/bicyhub-e12e1.appspot.com/o/ProfilePics%2Fac11aa[…]?alt=media&token=e6b8f76d-e0b3-43b4-b031-d2dff7d351e9',
};

export const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} ${formattedTime}`;
};