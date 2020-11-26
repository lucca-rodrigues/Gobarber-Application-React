import React from 'react';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import GlobalStyle from './styles/Global';
import AuthContext from './Context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider value={{name: 'Lucas'}}>
        <SignIn />
      </AuthContext.Provider>
      <GlobalStyle />
    </>
  );
}

export default App;
