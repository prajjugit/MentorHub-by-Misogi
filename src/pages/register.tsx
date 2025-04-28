import React from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Card, CardBody, Input, Button, Link, RadioGroup, Radio, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

/**
 * RegisterPage component handles user registration
 * 
 * This component:
 * - Renders a registration form
 * - Validates user input
 * - Calls the registration service
 * - Redirects to dashboard on success
 * 
 * For Clerk integration:
 * - Replace the form with Clerk's <SignUp /> component
 * - Or use Clerk's useSignUp hook with a custom form
 */
const RegisterPage: React.FC = () => {
  // Form state
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [role, setRole] = React.useState<'mentor' | 'mentee'>('mentee');
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Auth context and routing
  const { register } = useAuth();
  const history = useHistory();

  /**
   * Handles form submission for registration
   * 
   * For Clerk integration:
   * - Replace with Clerk's signUp method
   * - Handle user creation flow according to Clerk's documentation
   * - Add custom user metadata for the mentor/mentee role
   * 
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!name || !email || !password || !confirmPassword) {
      addToast({
        title: "Error",
        description: "Please fill in all fields",
        severity: "danger",
      });
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      addToast({
        title: "Error",
        description: "Passwords do not match",
        severity: "danger",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Call the register method from auth context
      // REPLACE THIS: For Clerk integration, use Clerk's signUp method
      // Example: 
      // const signUpResult = await clerk.signUp.create({
      //   firstName: name.split(' ')[0],
      //   lastName: name.split(' ').slice(1).join(' '),
      //   emailAddress: email,
      //   password,
      // });
      // await signUpResult.createdSessionId;
      // await clerk.user.update({ publicMetadata: { role } });
      await register(name, email, password, role);
      
      // Show success message
      addToast({
        title: "Success",
        description: "Your account has been created successfully",
        severity: "success",
      });
      
      // Redirect to dashboard
      history.push('/dashboard');
    } catch (error) {
      // Show error message
      addToast({
        title: "Error",
        description: "Failed to create account",
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
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Create an account</h1>
            <p className="text-gray-600 text-sm sm:text-base">Join MentorHub to connect with mentors and mentees</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onValueChange={setName}
              startContent={
                <Icon icon="lucide:user" className="text-default-400 text-lg" />
              }
              isRequired
            />
            
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
              placeholder="Create a password"
              value={password}
              onValueChange={setPassword}
              startContent={
                <Icon icon="lucide:lock" className="text-default-400 text-lg" />
              }
              isRequired
            />
            
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onValueChange={setConfirmPassword}
              startContent={
                <Icon icon="lucide:lock" className="text-default-400 text-lg" />
              }
              isRequired
            />

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">I want to join as a:</label>
              <RadioGroup 
                orientation="horizontal" 
                value={role} 
                onValueChange={setRole as (value: string) => void}
              >
                <Radio value="mentee">Mentee</Radio>
                <Radio value="mentor">Mentor</Radio>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              color="primary" 
              className="w-full"
              isLoading={isLoading}
            >
              Create Account
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
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="primary">
              Sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterPage;