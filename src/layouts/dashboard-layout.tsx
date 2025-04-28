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
  // Track screen size for responsive sidebar logic
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < 640);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(() => window.innerWidth >= 640);

  // Update isMobile and sidebar state on resize
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Open sidebar on desktop, closed on mobile
    };
    window.addEventListener('resize', handleResize);
    // Run on mount
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hamburger toggles sidebar
  const toggleSidebar = () => setIsSidebarOpen((open) => !open);

  // Overlay click closes sidebar on mobile
  const handleOverlayClick = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  // Sidebar closes after nav on mobile
  const handleNavClick = () => {
    if (isMobile) setIsSidebarOpen(false);
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

      <div className="flex flex-col sm:flex-row flex-grow relative">
        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity duration-200"
            aria-hidden="true"
            onClick={handleOverlayClick}
          />
        )}
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`
            bg-gray-50 border-r border-gray-200
            w-64 transition-transform duration-300
            fixed z-40 top-0 left-0 h-full
            sm:static sm:z-auto sm:h-auto sm:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            ${!isMobile ? 'block' : ''}
          `}
          aria-label="Sidebar navigation"
          tabIndex={isSidebarOpen || !isMobile ? 0 : -1}
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
                  onClick={handleNavClick}
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