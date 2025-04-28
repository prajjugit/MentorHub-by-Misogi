import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="xl" className="shadow-sm">
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center gap-2">
            <Icon icon="lucide:mentor" className="text-primary text-2xl" />
            <p className="font-bold text-inherit text-xl">MentorHub</p>
          </RouterLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={location.pathname === '/'}>
            <Link as={RouterLink} to="/" color="foreground">Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#features" color="foreground">Features</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#testimonials" color="foreground">Testimonials</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#faq" color="foreground">FAQ</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {isAuthenticated ? (
            <>
              <NavbarItem>
                <Button as={RouterLink} to="/dashboard" color="primary" variant="flat">
                  Dashboard
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button color="default" variant="light" onPress={logout}>
                  Logout
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Button as={RouterLink} to="/login" color="default" variant="flat">
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button as={RouterLink} to="/register" color="primary">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon icon="lucide:mentor" className="text-primary text-2xl" />
                <span className="font-bold text-xl">MentorHub</span>
              </div>
              <p className="text-gray-600 mb-4">
                Connecting junior developers with experienced mentors for growth and learning.
              </p>
              <div className="flex gap-4">
                <Link href="#" aria-label="Twitter">
                  <Icon icon="logos:twitter" className="text-2xl" />
                </Link>
                <Link href="#" aria-label="LinkedIn">
                  <Icon icon="logos:linkedin-icon" className="text-2xl" />
                </Link>
                <Link href="#" aria-label="GitHub">
                  <Icon icon="logos:github-icon" className="text-2xl" />
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="#" color="foreground" className="text-gray-600">How it works</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">Features</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">Pricing</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" color="foreground" className="text-gray-600">About us</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">Careers</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">Blog</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">Contact us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" color="foreground" className="text-gray-600">Terms of Service</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">Privacy Policy</Link></li>
                <li><Link href="#" color="foreground" className="text-gray-600">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} MentorHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;