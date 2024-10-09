import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './route/AppRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AuthProvider>
          <AppRoute />
        </AuthProvider>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
