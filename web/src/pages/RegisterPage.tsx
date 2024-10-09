import { Register } from '../components/PageComponents/Forms';
import { Footer, NavBar } from '../components/shared/';
import React from 'react';

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <>
      <NavBar />
      <Register />
    </>
  );
};
export default RegisterPage;
