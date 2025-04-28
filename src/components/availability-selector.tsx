import React from 'react';
import { Button, Chip, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';

/**
 * AvailabilitySelector component allows mentors to set their availability
 * 
 * This component handles:
 * - Selecting days of the week
 * - Selecting available time slots for each day
 * - Saving availability settings
 * 
 * When integrating with a backend API:
 * - Load initial availability from the API
 * - Save updated availability to the API
 */
export const AvailabilitySelector: React.FC = () => {
  // Define days of the week
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Define possible time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];
  
  // Currently selected day
  const [selectedDay, setSelectedDay] = React.useState('Monday');
  
  // Selected time slots for each day
  // REPLACE THIS: Load initial availability from your API
  // Example: React.useEffect(() => {
  //   const fetchAvailability = async () => {
  //     const response = await api.get('/user/availability');
  //     setSelectedSlots(response.data.availability);
  //   };
  //   fetchAvailability();
  // }, []);
  const [selectedSlots, setSelectedSlots] = React.useState<Record<string, string[]>>({
    Monday: ['10:00 AM', '10:30 AM', '2:00 PM', '2:30 PM'],
    Tuesday: ['9:00 AM', '9:30 AM', '3:00 PM', '3:30 PM'],
    Wednesday: ['11:00 AM', '11:30 AM', '4:00 PM', '4:30 PM'],
    Thursday: ['1:00 PM', '1:30 PM', '5:00 PM', '5:30 PM'],
    Friday: ['10:00 AM', '10:30 AM', '3:00 PM', '3:30 PM'],
    Saturday: [],
    Sunday: []
  });
  
  /**
   * Toggles a time slot for the selected day
   * 
   * @param time - The time slot to toggle
   */
  const toggleTimeSlot = (time: string) => {
    setSelectedSlots(prev => {
      const currentDaySlots = [...(prev[selectedDay] || [])];
      
      if (currentDaySlots.includes(time)) {
        return {
          ...prev,
          [selectedDay]: currentDaySlots.filter(slot => slot !== time)
        };
      } else {
        return {
          ...prev,
          [selectedDay]: [...currentDaySlots, time].sort((a, b) => {
            return timeSlots.indexOf(a) - timeSlots.indexOf(b);
          })
        };
      }
    });
  };
  
  /**
   * Saves the mentor's availability
   * 
   * When integrating with a backend API:
   * - Replace with an actual API call to save availability
   * - Handle success/error states appropriately
   */
  const handleSaveAvailability = () => {
    // REPLACE THIS: Call your API to save availability
    // Example: await api.post('/user/availability', { availability: selectedSlots });
    
    // Simulate API call success
    addToast({
      title: "Success",
      description: "Availability updated successfully",
      severity: "success",
    });
  };
  
  /**
   * Copies availability from the previous day
   */
  const copyFromPreviousDay = () => {
    const dayIndex = weekdays.indexOf(selectedDay);
    if (dayIndex > 0) {
      const previousDay = weekdays[dayIndex - 1];
      setSelectedSlots(prev => ({
        ...prev,
        [selectedDay]: [...prev[previousDay]]
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {weekdays.map((day) => (
          <Button
            key={day}
            size="sm"
            variant={selectedDay === day ? 'solid' : 'bordered'}
            color={selectedDay === day ? 'primary' : 'default'}
            onPress={() => setSelectedDay(day)}
          >
            {day.substring(0, 3)}
          </Button>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">{selectedDay}</h3>
        <Button 
          size="sm" 
          variant="light" 
          color="primary"
          onPress={copyFromPreviousDay}
          isDisabled={selectedDay === 'Monday'}
          startContent={<Icon icon="lucide:copy" width={14} />}
        >
          Copy from previous
        </Button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            size="sm"
            variant={selectedSlots[selectedDay]?.includes(time) ? 'solid' : 'bordered'}
            color={selectedSlots[selectedDay]?.includes(time) ? 'primary' : 'default'}
            onPress={() => toggleTimeSlot(time)}
          >
            {time}
          </Button>
        ))}
      </div>
      
      <div className="pt-2">
        <h3 className="text-sm font-medium mb-2">Selected Time Slots:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSlots[selectedDay]?.length > 0 ? (
            selectedSlots[selectedDay].map((time) => (
              <Chip 
                key={time} 
                onClose={() => toggleTimeSlot(time)}
                variant="flat"
                color="primary"
              >
                {time}
              </Chip>
            ))
          ) : (
            <p className="text-sm text-gray-500">No time slots selected for {selectedDay}</p>
          )}
        </div>
      </div>
      
      <Button 
        color="primary" 
        className="w-full mt-4"
        onPress={handleSaveAvailability}
      >
        Save Availability
      </Button>
    </div>
  );
};