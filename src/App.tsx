import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import MainLayout from './layouts/main-layout';
import DashboardLayout from './layouts/dashboard-layout';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';
import ProfilePage from './pages/profile';
import SessionsPage from './pages/sessions';
import MentorsPage from './pages/mentors';
import FeedbackPage from './pages/feedback';
import PrivateRoute from './components/private-route';

/**
 * Main App component that handles routing for the application
 * 
 * This component wraps all routes with the AuthProvider to make authentication
 * state available throughout the app. To integrate with Clerk or another auth provider:
 * 1. Replace AuthProvider with the auth provider of your choice
 * 2. Update the PrivateRoute component to use the new auth provider's authentication check
 * 3. Update the auth-context.tsx file with the new auth provider's methods
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Switch>

        {/* Public routes that don't require authentication */}
        <Route exact path="/">
          <MainLayout>
            <HomePage />
          </MainLayout>

        </Route>
        <Route path="/login">
          <MainLayout>
            <LoginPage />
          </MainLayout>
        </Route>

        <Route path="/register">
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        </Route>
        
        {/* Protected routes that require authentication */}
        <PrivateRoute path="/dashboard">
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        </PrivateRoute>

        <PrivateRoute path="/profile">
          <DashboardLayout>
            <ProfilePage />
          </DashboardLayout>
        </PrivateRoute>

        <PrivateRoute path="/sessions">
          <DashboardLayout>
            <SessionsPage />
          </DashboardLayout>
        </PrivateRoute>

        <PrivateRoute path="/mentors">
          <DashboardLayout>
            <MentorsPage />
          </DashboardLayout>
        </PrivateRoute>
        
        <PrivateRoute path="/feedback">
          <DashboardLayout>
            <FeedbackPage />
          </DashboardLayout>
        </PrivateRoute>
        
        {/* Redirect any unmatched routes to home */}
        <Redirect to="/" />
      </Switch>
    </AuthProvider>
  );
};

export default App;