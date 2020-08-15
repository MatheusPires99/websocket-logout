import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

const RouteWrapper = ({ component: Component, isPrivate = false, ...rest }) => {
  const { user } = useAuth();

  const signed = !!user;

  if (!signed && isPrivate) {
    return <Redirect to="/signin" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};
export default RouteWrapper;
