import React from 'react';

/**
 * User interface representing the authenticated user's data
 * 
 * When integrating with Clerk or another auth provider:
 * 1. Update this interface to match the user object structure from your auth provider
 * 2. Add any additional fields needed by your application
 */
interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'mentee';
  avatar: string;
}

/**
 * Authentication context interface defining the shape of the auth context
 * 
 * When integrating with Clerk or another auth provider:
 * 1. Update these methods to match the auth provider's API
 * 2. Add any additional methods needed (e.g., passwordReset, updateProfile)
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'mentor' | 'mentee') => Promise<void>;
  logout: () => void;
}

// Create the auth context with undefined as default value
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider component that manages authentication state
 * 
 * To integrate with Clerk:
 * 1. Replace this component with <ClerkProvider>
 * 2. Use Clerk's hooks (useAuth, useUser) instead of the custom hooks below
 * 3. Update the login, register, and logout methods to use Clerk's API
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // Check if user is already logged in from localStorage
  // When using Clerk, this would be handled by the Clerk provider
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * Mock login function - replace with actual API call
   * 
   * For Clerk integration:
   * - Use Clerk's signIn method instead
   * - Handle authentication tokens and session management
   */
  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    if (email && password) {
      // REPLACE THIS: Call your authentication API here
      // Example: const response = await api.post('/auth/login', { email, password });
      
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: Math.random() > 0.5 ? 'mentor' : 'mentee',
        avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${Math.floor(Math.random() * 100)}`
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  /**
   * Mock registration function - replace with actual API call
   * 
   * For Clerk integration:
   * - Use Clerk's signUp method instead
   * - Handle user creation and initial profile setup
   */
  const register = async (name: string, email: string, password: string, role: 'mentor' | 'mentee') => {
    // Mock registration - in a real app, this would call an API
    if (name && email && password && role) {
      // REPLACE THIS: Call your registration API here
      // Example: const response = await api.post('/auth/register', { name, email, password, role });
      
      const mockUser: User = {
        id: '1',
        name,
        email,
        role,
        avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${Math.floor(Math.random() * 100)}`
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid registration data');
    }
  };

  /**
   * Logout function - clears user data and authentication state
   * 
   * For Clerk integration:
   * - Use Clerk's signOut method instead
   */
  const logout = () => {
    // REPLACE THIS: Call your logout API here if needed
    // Example: await api.post('/auth/logout');
    
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Create the auth context value object with all methods and state
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * 
 * For Clerk integration:
 * - Replace with Clerk's useAuth or useUser hooks
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};