import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import GlobalStyle from './styles/Global';
import {AuthProvider} from './Context/AuthContext';
import Routes from './Routes'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
      <ToastContainer />
      <GlobalStyle />
    </Router>
  );
}

export default App;
