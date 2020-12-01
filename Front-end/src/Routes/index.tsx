import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';
import ForgotPassword from '../Pages/ForgotPassword';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/forgot" component={ForgotPassword} />
    </Switch>
  )
}

export default Routes;
