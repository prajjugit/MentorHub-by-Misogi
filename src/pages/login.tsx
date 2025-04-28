import React from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Card, CardBody, Input, Button, Link, Checkbox, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

/**
 * LoginPage component handles user authentication
 * 
 * This component:
 * - Renders a login form
 * - Validates user input
 * - Calls the authentication service
 * - Redirects to dashboard on success
 * 
 * For Clerk integration:
 * - Replace the form with Clerk's <SignIn /> component
 * - Or use Clerk's useSignIn hook with a custom form
 */
const LoginPage: React.FC = () => {
  // Form state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  
  // Auth context and routing
  const { login } = useAuth();
  const history = useHistory();

  /**
   * Handles form submission for login
   * 
   * For Clerk integration:
   * - Replace with Clerk's signIn method
   * - Handle authentication flow according to Clerk's documentation
   * 
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!email || !password) {
      addToast({
        title: "Error",
        description: "Please enter both email and password",
        severity: "danger",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Call the login method from auth context
      // REPLACE THIS: For Clerk integration, use Clerk's signIn method
      // Example: await clerk.signIn.create({ identifier: email, password });
      await login(email, password);
      
      // Show success message
      addToast({
        title: "Success",
        description: "You have successfully logged in",
        severity: "success",
      });
      
      // Redirect to dashboard
      history.push('/dashboard');
    } catch (error) {
      // Show error message
      addToast({
        title: "Error",
        description: "Invalid email or password",
        severity: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8 px-2 sm:py-12 sm:px-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-sm sm:max-w-md card-shadow border-none mx-2 sm:mx-0">
        <CardBody className="p-4 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Welcome back</h1>
            <p className="text-gray-600 text-sm sm:text-base">Sign in to your MentorHub account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onValueChange={setEmail}
              startContent={
                <Icon icon="lucide:mail" className="text-default-400 text-lg" />
              }
              isRequired
            />
            
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              startContent={
                <Icon icon="lucide:lock" className="text-default-400 text-lg" />
              }
              isRequired
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <Checkbox 
                isSelected={rememberMe} 
                onValueChange={setRememberMe}
                size="sm"
              >
                Remember me
              </Checkbox>
              <Link href="#" size="sm">Forgot password?</Link>
            </div>

            <Button 
              type="submit" 
              color="primary" 
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="bordered" 
                className="w-full"
                startContent={<Icon icon="logos:google-icon" className="text-lg" />}
              >
                Google
              </Button>
              <Button 
                variant="bordered" 
                className="w-full"
                startContent={<Icon icon="logos:github-icon" className="text-lg" />}
              >
                GitHub
              </Button>
            </div>
          </div>

          <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
            Don't have an account?{' '}
            <Link as={RouterLink} to="/register" color="primary">
              Sign up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;