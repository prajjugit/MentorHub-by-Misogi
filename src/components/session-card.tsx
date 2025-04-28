import React from 'react';
import { Card, CardBody, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

/**
 * Session interface representing a mentoring session
 * 
 * When integrating with a backend API:
 * 1. Update this interface to match your API's session data structure
 * 2. Add any additional fields needed by your application
 */
interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  mentorName: string;
  mentorAvatar: string;
  menteeName: string;
  menteeAvatar: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  type: 'career' | 'code' | 'technical';
  notes?: string;
  meetingUrl?: string;
}

/**
 * Props for the SessionCard component
 */
interface SessionCardProps {
  session: Session;
  isPast?: boolean;
  isPending?: boolean;
}

/**
 * SessionCard component displays a single mentoring session
 * 
 * This component handles:
 * - Displaying session details
 * - Session actions (join, reschedule, approve/decline)
 * - Feedback submission for past sessions
 * 
 * @param session - The session data to display
 * @param isPast - Whether this is a past session (enables feedback)
 * @param isPending - Whether this is a pending session request
 */
export const SessionCard: React.FC<SessionCardProps> = ({ session, isPast = false, isPending = false }) => {
  const { user } = useAuth();
  const isMentor = user?.role === 'mentor';
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedback, setFeedback] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  
  /**
   * Returns the appropriate icon for the session type
   * 
   * @param type - The session type
   * @returns The icon name for the session type
   */
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'career':
        return 'lucide:briefcase';
      case 'code':
        return 'lucide:code';
      case 'technical':
        return 'lucide:code-2';
      default:
        return 'lucide:message-square';
    }
  };
  
  /**
   * Returns the appropriate color for the session type
   * 
   * @param type - The session type
   * @returns The color for the session type
   */
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'career':
        return 'secondary';
      case 'code':
        return 'primary';
      case 'technical':
        return 'success';
      default:
        return 'default';
    }
  };
  
  /**
   * Returns the appropriate color for the session status
   * 
   * @param status - The session status
   * @returns The color for the session status
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  /**
   * Handles feedback submission for past sessions
   * 
   * When integrating with a backend API:
   * - Replace with an actual API call to submit feedback
   * - Handle success/error states appropriately
   */
  const handleSubmitFeedback = () => {
    // Validate rating
    if (rating === 0) {
      addToast({
        title: "Error",
        description: "Please select a rating",
        severity: "danger",
      });
      return;
    }
    
    // REPLACE THIS: Call your API to submit feedback
    // Example: await api.post(`/sessions/${session.id}/feedback`, { rating, feedback });
    
    // Simulate API call success
    addToast({
      title: "Success",
      description: "Feedback submitted successfully",
      severity: "success",
    });
    onOpenChange(false);
  };
  
  /**
   * Handles joining a meeting for scheduled sessions
   * 
   * When integrating with a video API (like Zoom, Google Meet):
   * - Update to use the actual meeting URL from your API
   * - Add any authentication or meeting tokens needed
   */
  const handleJoinMeeting = () => {
    // REPLACE THIS: Use the actual meeting URL from your API
    window.open(session.meetingUrl || 'https://meet.google.com', '_blank');
  };
  
  /**
   * Handles approving a pending session request
   * 
   * When integrating with a backend API:
   * - Replace with an actual API call to approve the session
   * - Update the UI based on the API response
   */
  const handleApproveRequest = () => {
    // REPLACE THIS: Call your API to approve the session
    // Example: await api.post(`/sessions/${session.id}/approve`);
    
    // Simulate API call success
    addToast({
      title: "Success",
      description: "Session request approved",
      severity: "success",
    });
  };
  
  /**
   * Handles declining a pending session request
   * 
   * When integrating with a backend API:
   * - Replace with an actual API call to decline the session
   * - Update the UI based on the API response
   */
  const handleDeclineRequest = () => {
    // REPLACE THIS: Call your API to decline the session
    // Example: await api.post(`/sessions/${session.id}/decline`);
    
    // Simulate API call success
    addToast({
      title: "Success",
      description: "Session request declined",
      severity: "danger",
    });
  };

  return (
    <>
      <Card className="card-shadow border-none">
        <CardBody className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{session.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Chip 
                  size="sm" 
                  variant="flat" 
                  color={getTypeColor(session.type)}
                  startContent={<Icon icon={getTypeIcon(session.type)} width={14} />}
                >
                  {session.type === 'career' ? 'Career Advice' : 
                   session.type === 'code' ? 'Code Review' : 'Technical Guidance'}
                </Chip>
                {!isPending && (
                  <Chip size="sm" color={getStatusColor(session.status)}>
                    {session.status}
                  </Chip>
                )}
              </div>
            </div>
            
            {isPending && (
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  color="success" 
                  isIconOnly
                  variant="light"
                  onPress={handleApproveRequest}
                  aria-label="Approve"
                >
                  <Icon icon="lucide:check" />
                </Button>
                <Button 
                  size="sm" 
                  color="danger" 
                  isIconOnly
                  variant="light"
                  onPress={handleDeclineRequest}
                  aria-label="Decline"
                >
                  <Icon icon="lucide:x" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center">
              <Icon icon="lucide:calendar" className="text-default-500 mr-2" width={16} />
              <span className="text-sm">{session.date}</span>
            </div>
            
            <div className="flex items-center">
              <Icon icon="lucide:clock" className="text-default-500 mr-2" width={16} />
              <span className="text-sm">{session.time} ({session.duration})</span>
            </div>
            
            <div className="flex items-center">
              <Icon 
                icon={isMentor ? "lucide:user" : "lucide:user-check"} 
                className="text-default-500 mr-2" 
                width={16} 
              />
              <div className="flex items-center">
                <span className="text-sm">
                  {isMentor ? `Mentee: ${session.menteeName}` : `Mentor: ${session.mentorName}`}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {isPast ? (
              <Button 
                color="primary" 
                variant="flat" 
                size="sm"
                className="flex-1"
                onPress={onOpen}
                startContent={<Icon icon="lucide:message-square" />}
              >
                {isMentor ? "Rate Mentee" : "Rate Mentor"}
              </Button>
            ) : isPending ? (
              <div className="w-full text-sm text-gray-500 mt-2">
                <p className="font-medium">Request Notes:</p>
                <p>{session.notes || "No additional notes provided."}</p>
              </div>
            ) : (
              <>
                <Button 
                  color="primary" 
                  size="sm"
                  className="flex-1"
                  onPress={handleJoinMeeting}
                  startContent={<Icon icon="lucide:video" />}
                >
                  Join Meeting
                </Button>
                <Button 
                  variant="flat" 
                  size="sm"
                  className="flex-1"
                  startContent={<Icon icon="lucide:calendar-x" />}
                >
                  Reschedule
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Rate Your Session</ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">How would you rate your session with {isMentor ? session.menteeName : session.mentorName}?</p>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-1 focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Icon 
                          icon="lucide:star" 
                          width={32} 
                          className={
                            (hoverRating ? star <= hoverRating : star <= rating) 
                              ? "text-yellow-400" 
                              : "text-gray-300"
                          } 
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                </div>
                
                <Textarea
                  label="Feedback"
                  placeholder="Share your thoughts about the session..."
                  value={feedback}
                  onValueChange={setFeedback}
                  minRows={4}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmitFeedback}>
                  Submit Feedback
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};