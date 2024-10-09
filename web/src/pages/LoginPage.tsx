import React from 'react';
import { NavBar } from '../components/shared';
import { LoginForm } from '../components/PageComponents/Forms';

const LoginPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
};

export default LoginPage;
