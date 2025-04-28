import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
    { path: '/profile', label: 'Profile', icon: 'lucide:user' },
    { path: '/sessions', label: 'Sessions', icon: 'lucide:calendar' },
    { path: '/mentors', label: 'Mentors', icon: 'lucide:users' },
    { path: '/feedback', label: 'Feedback', icon: 'lucide:message-square' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="xl" className="shadow-sm">
        <NavbarBrand>
          <Button 
            isIconOnly 
            variant="light" 
            className="mr-2" 
            onPress={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Icon icon="lucide:menu" className="text-xl" />
          </Button>
          <RouterLink to="/" className="flex items-center gap-2">
            <Icon icon="lucide:mentor" className="text-primary text-2xl" />
            <p className="font-bold text-inherit text-xl">MentorHub</p>
          </RouterLink>
        </NavbarBrand>
        
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" className="p-0">
                  <div className="flex items-center gap-2">
                    <Avatar 
                      src={user?.avatar} 
                      name={user?.name} 
                      size="sm" 
                      className="transition-transform"
                    />
                    <span className="hidden sm:block font-medium text-sm">{user?.name}</span>
                    <Icon icon="lucide:chevron-down" className="text-sm" />
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem key="profile" as={RouterLink} to="/profile">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:user" />
                    <span>My Profile</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="settings">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:settings" />
                    <span>Settings</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="logout" onPress={logout} className="text-danger" color="danger">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:log-out" />
                    <span>Logout</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside 
          className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-0 -ml-64'
          }`}
        >
          <div className="p-4">
            <div className="mb-6 mt-2">
              <div className="flex items-center gap-3 px-2 py-3">
                <Avatar src={user?.avatar} name={user?.name} size="md" />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{user?.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                </div>
              </div>
            </div>
            
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon icon={item.icon} className="text-xl" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;