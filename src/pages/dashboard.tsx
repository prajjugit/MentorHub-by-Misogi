import React from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SessionCard } from '../components/session-card';
import { generateMockSessions, generateMockChartData } from '../data/mock-data';

/**
 * DashboardPage component displays the user's dashboard
 * 
 * This component shows:
 * - Key metrics and statistics
 * - Sessions chart
 * - Upcoming sessions
 * - Recent feedback
 * 
 * When integrating with a backend API:
 * - Replace mock data with actual API calls
 * - Add loading states and error handling
 */
const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const isMentor = user?.role === 'mentor';
  
  // Mock data for development
  const sessions = React.useMemo(() => generateMockSessions(3), []);
  const chartData = React.useMemo(() => generateMockChartData(), []);
  
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <Button 
          as={RouterLink} 
          to={isMentor ? "/sessions" : "/mentors"} 
          color="primary"
          startContent={<Icon icon={isMentor ? "lucide:calendar" : "lucide:users"} />}
          className="w-full sm:w-auto"
        >
          {isMentor ? "Manage Sessions" : "Find Mentors"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="card-shadow border-none">
          <CardBody className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isMentor ? "Total Sessions" : "Sessions Attended"}
                </p>
                <p className="text-xl sm:text-2xl font-bold mt-1">24</p>
              </div>
              <div className="bg-primary-100 p-2 sm:p-3 rounded-full">
                <Icon icon="lucide:calendar" className="text-primary text-lg sm:text-xl" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="card-shadow border-none">
          <CardBody className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isMentor ? "Average Rating" : "Mentors Connected"}
                </p>
                <p className="text-xl sm:text-2xl font-bold mt-1">
                  {isMentor ? "4.8" : "7"}
                </p>
              </div>
              <div className="bg-secondary-100 p-2 sm:p-3 rounded-full">
                <Icon 
                  icon={isMentor ? "lucide:star" : "lucide:users"} 
                  className="text-secondary text-lg sm:text-xl" 
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="card-shadow border-none">
          <CardBody className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {isMentor ? "Hours Mentored" : "Hours Learning"}
                </p>
                <p className="text-xl sm:text-2xl font-bold mt-1">36</p>
              </div>
              <div className="bg-primary-100 p-2 sm:p-3 rounded-full">
                <Icon icon="lucide:clock" className="text-primary text-lg sm:text-xl" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Chart and Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="card-shadow border-none lg:col-span-2">
          <CardHeader className="pb-0">
            <h2 className="text-base sm:text-lg font-semibold">Sessions per Week</h2>
          </CardHeader>
          <CardBody className="overflow-hidden">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="#0077FF" 
                    fill="#0077FF" 
                    fillOpacity={0.1} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card className="card-shadow border-none">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
            <Button 
              as={RouterLink} 
              to="/sessions" 
              variant="light" 
              color="primary"
              size="sm"
            >
              View All
            </Button>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Icon icon="lucide:calendar-x" className="text-gray-400 text-4xl mx-auto mb-2" />
                  <p className="text-gray-500">No upcoming sessions</p>
                  <Button 
                    as={RouterLink} 
                    to={isMentor ? "/sessions" : "/mentors"} 
                    color="primary" 
                    variant="flat" 
                    size="sm"
                    className="mt-4"
                  >
                    {isMentor ? "Manage Availability" : "Find a Mentor"}
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card className="card-shadow border-none">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Feedback</h2>
          <Button 
            as={RouterLink} 
            to="/feedback" 
            variant="light" 
            color="primary"
            size="sm"
          >
            View All
          </Button>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gray-50">
                <CardBody className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Icon 
                          key={j} 
                          icon="lucide:star" 
                          className={j < 4 ? "text-yellow-400" : "text-gray-300"} 
                          width={16} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">4.0</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    "Great session! The mentor was very helpful and provided clear explanations."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <img 
                          src={`https://img.heroui.chat/image/avatar?w=100&h=100&u=${20 + i}`} 
                          alt="User" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium">
                        {isMentor ? "John D." : "Sarah M."}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardPage;