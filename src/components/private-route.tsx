import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

/**
 * Props for the PrivateRoute component
 * Extends RouteProps from react-router-dom
 */
interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

/**
 * PrivateRoute component that restricts access to authenticated users only
 * 
 * For Clerk integration:
 * 1. Replace useAuth with Clerk's useAuth hook
 * 2. Update the authentication check to use Clerk's isSignedIn or similar property
 * 
 * @param children - The components to render if authenticated
 * @param rest - Additional route props
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  // Get authentication status from auth context
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // If authenticated, render the children components
        // Otherwise, redirect to login page and store the attempted location
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;