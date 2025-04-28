import React from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';
import { SessionCard } from '../components/session-card';
import { generateMockSessions } from '../data/mock-data';

/**
 * SessionsPage component displays and manages user sessions
 * 
 * This component handles:
 * - Displaying upcoming, past, and pending sessions
 * - Filtering and searching sessions
 * - Session management actions
 * 
 * When integrating with a backend API:
 * - Replace mock data with actual API calls
 * - Add loading states and error handling
 * - Implement real-time updates for session status changes
 */
const SessionsPage: React.FC = () => {
  // Get user from auth context
  const { user } = useAuth();
  const isMentor = user?.role === 'mentor';
  
  // UI state
  const [selected, setSelected] = React.useState("upcoming");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  
  // REPLACE THIS: Fetch actual session data from your API
  // Example:
  // const [upcomingSessions, setUpcomingSessions] = React.useState([]);
  // const [pastSessions, setPastSessions] = React.useState([]);
  // const [pendingSessions, setPendingSessions] = React.useState([]);
  // 
  // React.useEffect(() => {
  //   const fetchSessions = async () => {
  //     const upcomingResponse = await api.get('/sessions/upcoming');
  //     setUpcomingSessions(upcomingResponse.data);
  //     
  //     const pastResponse = await api.get('/sessions/past');
  //     setPastSessions(pastResponse.data);
  //     
  //     if (isMentor) {
  //       const pendingResponse = await api.get('/sessions/pending');
  //       setPendingSessions(pendingResponse.data);
  //     }
  //   };
  //   fetchSessions();
  // }, [isMentor]);
  
  // Mock data for development
  const upcomingSessions = React.useMemo(() => generateMockSessions(5), []);
  const pastSessions = React.useMemo(() => generateMockSessions(8, true), []);
  const pendingSessions = React.useMemo(() => generateMockSessions(3, false, true), []);
  
  /**
   * Filter sessions based on search query and type filter
   */
  const filteredSessions = React.useMemo(() => {
    let sessions = [];
    
    switch (selected) {
      case "upcoming":
        sessions = upcomingSessions;
        break;
      case "past":
        sessions = pastSessions;
        break;
      case "pending":
        sessions = pendingSessions;
        break;
      default:
        sessions = upcomingSessions;
    }
    
    if (searchQuery) {
      sessions = sessions.filter(session => 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.menteeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filter !== "all") {
      sessions = sessions.filter(session => session.type === filter);
    }
    
    return sessions;
  }, [selected, searchQuery, filter, upcomingSessions, pastSessions, pendingSessions]);

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Sessions</h1>
        {isMentor && (
          <Button 
            color="primary"
            startContent={<Icon icon="lucide:calendar" />}
            className="w-full sm:w-auto"
          >
            Manage Availability
          </Button>
        )}
      </div>

      <Card className="card-shadow border-none">
        <CardBody className="p-0">
          <Tabs 
            aria-label="Sessions" 
            selectedKey={selected} 
            onSelectionChange={setSelected as (key: React.Key) => void}
            className="w-full"
          >
            <Tab key="upcoming" title="Upcoming" />
            <Tab key="past" title="Past" />
            {isMentor && <Tab key="pending" title="Pending Requests" />}
          </Tabs>
        </CardBody>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
        <Input
          placeholder="Search sessions..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          className="sm:max-w-xs"
        />
        
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="bordered"
              endContent={<Icon icon="lucide:chevron-down" />}
            >
              {filter === "all" ? "All Types" : 
               filter === "career" ? "Career Advice" : 
               filter === "code" ? "Code Review" : "Technical Guidance"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Filter sessions"
            onAction={(key) => setFilter(key as string)}
            selectedKeys={[filter]}
            selectionMode="single"
          >
            <DropdownItem key="all">All Types</DropdownItem>
            <DropdownItem key="career">Career Advice</DropdownItem>
            <DropdownItem key="code">Code Review</DropdownItem>
            <DropdownItem key="technical">Technical Guidance</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {filteredSessions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSessions.map((session) => (
            <SessionCard 
              key={session.id} 
              session={session} 
              isPast={selected === "past"}
              isPending={selected === "pending"}
            />
          ))}
        </div>
      ) : (
        <Card className="card-shadow border-none">
          <CardBody className="py-12 sm:py-16 text-center">
            <Icon 
              icon={selected === "pending" ? "lucide:inbox" : "lucide:calendar-x"} 
              className="text-gray-400 text-4xl sm:text-5xl mx-auto mb-4" 
            />
            <h3 className="text-lg sm:text-xl font-medium mb-2">No {selected} sessions found</h3>
            <p className="text-gray-500 mb-4 sm:mb-6">
              {selected === "upcoming" 
                ? "You don't have any upcoming sessions scheduled." 
                : selected === "past" 
                ? "You haven't completed any sessions yet." 
                : "You don't have any pending session requests."}
            </p>
            {selected === "upcoming" && !isMentor && (
              <Button 
                color="primary"
                as="a"
                href="/mentors"
              >
                Find a Mentor
              </Button>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default SessionsPage;