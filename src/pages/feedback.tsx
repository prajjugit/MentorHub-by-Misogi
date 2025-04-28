import React from 'react';
import { Card, CardBody, CardHeader, Tabs, Tab, Avatar, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';
import { generateMockFeedback } from '../data/mock-data';

/**
 * FeedbackItem interface representing feedback data
 * 
 * When integrating with a backend API:
 * 1. Update this interface to match your API's feedback data structure
 * 2. Add any additional fields needed by your application
 */
interface FeedbackItem {
  id: string;
  sessionId: string;
  sessionTitle: string;
  rating: number;
  comment: string;
  date: string;
  fromName: string;
  fromAvatar: string;
  toName: string;
  toAvatar: string;
}

/**
 * FeedbackPage component displays feedback received and given by the user
 * 
 * This component handles:
 * - Displaying feedback in two tabs (received and given)
 * - Rendering feedback cards with ratings and comments
 * 
 * When integrating with a backend API:
 * - Replace mock data with actual API calls
 * - Add loading states and error handling
 */
const FeedbackPage: React.FC = () => {
  // Get user from auth context
  const { user } = useAuth();
  
  // UI state
  const [selected, setSelected] = React.useState("received");
  
  // REPLACE THIS: Fetch actual feedback data from your API
  // Example:
  // const [receivedFeedback, setReceivedFeedback] = React.useState([]);
  // const [givenFeedback, setGivenFeedback] = React.useState([]);
  // 
  // React.useEffect(() => {
  //   const fetchFeedback = async () => {
  //     const receivedResponse = await api.get('/feedback/received');
  //     setReceivedFeedback(receivedResponse.data);
  //     
  //     const givenResponse = await api.get('/feedback/given');
  //     setGivenFeedback(givenResponse.data);
  //   };
  //   fetchFeedback();
  // }, []);
  
  // Mock data for development
  const receivedFeedback = React.useMemo(() => generateMockFeedback(8, true), []);
  const givenFeedback = React.useMemo(() => generateMockFeedback(5, false), []);
  
  // Get current feedback based on selected tab
  const currentFeedback = selected === "received" ? receivedFeedback : givenFeedback;

  /**
   * FeedbackCard component displays a single feedback item
   * 
   * @param feedback - The feedback data to display
   */
  const FeedbackCard: React.FC<{ feedback: FeedbackItem }> = ({ feedback }) => {
    return (
      <Card className="card-shadow border-none">
        <CardBody className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <Avatar src={feedback.fromAvatar} size="sm" className="mr-3" />
              <div>
                <p className="font-medium">{feedback.fromName}</p>
                <p className="text-xs text-gray-500">{feedback.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i} 
                  icon="lucide:star" 
                  className={i < feedback.rating ? "text-yellow-400" : "text-gray-300"} 
                  width={16} 
                />
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <Chip size="sm" variant="flat" color="primary" className="mb-2">
              {feedback.sessionTitle}
            </Chip>
            <p className="text-gray-700">{feedback.comment}</p>
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <Icon icon="lucide:calendar" className="mr-1" width={14} />
            <span>Session ID: {feedback.sessionId}</span>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Feedback</h1>
      </div>

      <Card className="card-shadow border-none">
        <CardBody className="p-0">
          <Tabs 
            aria-label="Feedback" 
            selectedKey={selected} 
            onSelectionChange={setSelected as (key: React.Key) => void}
            className="w-full"
          >
            <Tab key="received" title="Feedback Received" />
            <Tab key="given" title="Feedback Given" />
          </Tabs>
        </CardBody>
      </Card>

      {currentFeedback.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentFeedback.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      ) : (
        <Card className="card-shadow border-none">
          <CardBody className="py-16 text-center">
            <Icon 
              icon="lucide:message-square-off" 
              className="text-gray-400 text-5xl mx-auto mb-4" 
            />
            <h3 className="text-xl font-medium mb-2">No feedback yet</h3>
            <p className="text-gray-500">
              {selected === "received" 
                ? "You haven't received any feedback yet." 
                : "You haven't given any feedback yet."}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default FeedbackPage;