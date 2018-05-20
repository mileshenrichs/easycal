import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Abstraction of <Route /> to make sure checkAuth() is called
 * during each page render
 */
export default function ProtectedRoute({ trueComponent, decisionFunc, ...rest }) {
  return (
    <Route
      {...rest}
      component={decisionFunc() ? trueComponent : trueComponent}
    />
  )
}