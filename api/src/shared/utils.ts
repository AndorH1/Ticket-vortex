import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export const phantomPhoto =
  'https://firebasestorage.googleapis.com/v0/b/bicyhub-e12e1.appspot.com/o/ProfilePics%2Fac11aa2add3b0193c8769e0a17d13535.jpg?alt=media&token=e6b8f76d-e0b3-43b4-b031-d2dff7d351e9';
