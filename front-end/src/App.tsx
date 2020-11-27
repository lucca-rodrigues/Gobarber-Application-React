import React from 'react';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import GlobalStyle from './styles/Global';
import {AuthProvider} from './Context/AuthContext';

const App: React.FC = () => {
  return (
    <>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
