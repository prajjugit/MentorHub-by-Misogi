import React from 'react';
import { Card, CardBody, Avatar, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { generateTimeSlots } from '../data/mock-data';

/**
 * Mentor interface representing a mentor's profile data
 * 
 * When integrating with a backend API:
 * 1. Update this interface to match your API's mentor data structure
 * 2. Add any additional fields needed by your application
 */
interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  rating: number;
  sessionCount: number;
  skills: string[];
  joinDate: string;
}

/**
 * Props for the MentorCard component
 */
interface MentorCardProps {
  mentor: Mentor;
}

/**
 * MentorCard component displays a mentor's profile and allows requesting sessions
 * 
 * This component handles:
 * - Displaying mentor information
 * - Session request form with date/time selection
 * - Submitting session requests
 * 
 * @param mentor - The mentor data to display
 */
export const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [sessionType, setSessionType] = React.useState<'career' | 'code' | 'technical'>('career');
  const [notes, setNotes] = React.useState('');
  
  /**
   * Generate available dates for the next 7 days
   * 
   * When integrating with a backend API:
   * - Replace with actual available dates from the mentor's calendar
   * - Consider timezone differences and existing bookings
   */
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      dates.push(formattedDate);
    }
    
    return dates;
  }, []);
  
  /**
   * Get time slots for session booking
   * 
   * When integrating with a backend API:
   * - Replace with actual available time slots from the mentor's calendar
   * - Filter out already booked slots
   */
  const timeSlots = React.useMemo(() => {
    return generateTimeSlots();
  }, []);
  
  /**
   * Handles submitting a session request
   * 
   * When integrating with a backend API:
   * - Replace with an actual API call to request a session
   * - Handle success/error states appropriately
   */
  const handleRequestSession = () => {
    if (!selectedDate || !selectedTime) {
      addToast({
        title: "Error",
        description: "Please select a date and time",
        severity: "danger",
      });
      return;
    }
    
    addToast({
      title: "Success",
      description: "Session request sent successfully",
      severity: "success",
    });
    onOpenChange(false);
  };

  return (
    <>
      <Card className="card-shadow border-none">
        <CardBody className="p-5">
          <div className="flex items-center gap-4 mb-4">
            <Avatar src={mentor.avatar} className="w-16 h-16" isBordered />
            <div>
              <h3 className="font-semibold text-lg">{mentor.name}</h3>
              <p className="text-sm text-gray-600">{mentor.title}</p>
              <p className="text-xs text-gray-500">{mentor.company}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
            {mentor.bio}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {mentor.skills.slice(0, 4).map((skill, index) => (
              <Chip key={index} size="sm" variant="flat" color="primary">
                {skill}
              </Chip>
            ))}
            {mentor.skills.length > 4 && (
              <Chip size="sm" variant="flat">
                +{mentor.skills.length - 4} more
              </Chip>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i} 
                    icon="lucide:star" 
                    className={i < Math.floor(mentor.rating) ? "text-yellow-400" : "text-gray-300"} 
                    width={16} 
                  />
                ))}
              </div>
              <span className="ml-1 text-sm">{mentor.rating.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Icon icon="lucide:users" className="mr-1" width={14} />
              <span>{mentor.sessionCount} sessions</span>
            </div>
          </div>
          
          <Button 
            color="primary" 
            className="w-full"
            onPress={onOpen}
          >
            Request Session
          </Button>
        </CardBody>
      </Card>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Request Session with {mentor.name}</ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Select Session Type</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={sessionType === 'career' ? 'solid' : 'bordered'}
                        color={sessionType === 'career' ? 'primary' : 'default'}
                        onPress={() => setSessionType('career')}
                        startContent={<Icon icon="lucide:briefcase" />}
                        className="justify-start"
                      >
                        Career Advice
                      </Button>
                      <Button
                        variant={sessionType === 'code' ? 'solid' : 'bordered'}
                        color={sessionType === 'code' ? 'primary' : 'default'}
                        onPress={() => setSessionType('code')}
                        startContent={<Icon icon="lucide:code" />}
                        className="justify-start"
                      >
                        Code Review
                      </Button>
                      <Button
                        variant={sessionType === 'technical' ? 'solid' : 'bordered'}
                        color={sessionType === 'technical' ? 'primary' : 'default'}
                        onPress={() => setSessionType('technical')}
                        startContent={<Icon icon="lucide:code-2" />}
                        className="justify-start"
                      >
                        Technical
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Select Date</h3>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {availableDates.map((date, index) => (
                        <Button
                          key={index}
                          variant={selectedDate === date ? 'solid' : 'bordered'}
                          color={selectedDate === date ? 'primary' : 'default'}
                          onPress={() => setSelectedDate(date)}
                          className="min-w-[100px]"
                        >
                          {date}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Select Time</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time, index) => (
                          <Button
                            key={index}
                            variant={selectedTime === time ? 'solid' : 'bordered'}
                            color={selectedTime === time ? 'primary' : 'default'}
                            onPress={() => setSelectedTime(time)}
                            size="sm"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Textarea
                    label="Additional Notes"
                    placeholder="Share what you'd like to discuss in the session..."
                    value={notes}
                    onValueChange={setNotes}
                    minRows={3}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleRequestSession}>
                  Send Request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};