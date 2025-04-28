// Mock data generators for the MentorHub application

/**
 * Generate random session data for development and testing
 * 
 * REPLACE THIS: In production, fetch real session data from your API
 * 
 * @param count - Number of sessions to generate
 * @param isPast - Whether to generate past sessions
 * @param isPending - Whether to generate pending session requests
 * @returns Array of mock session objects
 */
export const generateMockSessions = (count: number, isPast = false, isPending = false) => {
  const sessions = [];
  const sessionTypes = ['career', 'code', 'technical'];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    
    if (isPast) {
      // Past sessions are 1-30 days in the past
      date.setDate(date.getDate() - Math.floor(Math.random() * 30) - 1);
    } else {
      // Future sessions are 1-14 days in the future
      date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1);
    }
    
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    // Random hour between 9 AM and 5 PM
    const hour = 9 + Math.floor(Math.random() * 8);
    const minute = Math.random() > 0.5 ? '00' : '30';
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const time = `${displayHour}:${minute} ${period}`;
    
    sessions.push({
      id: `session-${i + 1}`,
      title: [
        'JavaScript Best Practices', 
        'React Component Design', 
        'Career Growth in Tech',
        'Code Review Session',
        'System Design Basics',
        'Frontend Performance',
        'Backend Architecture',
        'Interview Preparation'
      ][Math.floor(Math.random() * 8)],
      date: formattedDate,
      time: time,
      duration: ['30 min', '45 min', '60 min'][Math.floor(Math.random() * 3)],
      mentorName: ['Alex Johnson', 'Sarah Miller', 'David Chen', 'Emily Wong', 'Michael Brown'][Math.floor(Math.random() * 5)],
      mentorAvatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${10 + i}`,
      menteeName: ['John Smith', 'Jane Doe', 'Robert Lee', 'Lisa Park', 'Tom Wilson'][Math.floor(Math.random() * 5)],
      menteeAvatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${20 + i}`,
      status: isPast ? 'completed' : isPending ? 'pending' : 'scheduled',
      type: sessionTypes[Math.floor(Math.random() * sessionTypes.length)] as 'career' | 'code' | 'technical',
      notes: isPending ? 'I would like to discuss my career transition from backend to frontend development.' : undefined,
      meetingUrl: 'https://meet.google.com'
    });
  }
  
  return sessions;
};

/**
 * Generate random mentor data for development and testing
 * 
 * REPLACE THIS: In production, fetch real mentor data from your API
 * 
 * @param count - Number of mentors to generate
 * @returns Array of mock mentor objects
 */
export const generateMockMentors = (count: number) => {
  const mentors = [];
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js',
    'Python', 'Java', 'C#', 'Ruby', 'PHP', 'Go', 'Rust',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'SQL', 'MongoDB', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST API', 'Microservices'
  ];
  
  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple',
    'Netflix', 'Airbnb', 'Uber', 'Twitter', 'LinkedIn',
    'Stripe', 'Shopify', 'Slack', 'Spotify', 'Adobe'
  ];
  
  const titles = [
    'Senior Software Engineer', 'Lead Developer', 'Full Stack Engineer',
    'Frontend Architect', 'Backend Developer', 'DevOps Engineer',
    'Engineering Manager', 'Tech Lead', 'Principal Engineer',
    'CTO', 'VP of Engineering'
  ];
  
  const bios = [
    'Experienced developer with a passion for clean code and mentoring junior engineers.',
    'I love helping others grow in their tech careers. Specialized in frontend development and UI/UX.',
    'Backend specialist with 10+ years of experience building scalable systems.',
    'Former FAANG engineer who enjoys teaching system design and architecture.',
    'Full stack developer who can help with career advice and technical interviews.',
    'I focus on practical, real-world coding skills that will help you advance your career.',
    'Passionate about helping underrepresented groups succeed in tech.'
  ];
  
  for (let i = 0; i < count; i++) {
    // Generate 3-6 random skills
    const mentorSkills = [];
    const skillCount = 3 + Math.floor(Math.random() * 4);
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());
    
    for (let j = 0; j < skillCount; j++) {
      mentorSkills.push(shuffledSkills[j]);
    }
    
    // Generate join date (1-12 months ago)
    const joinDate = new Date();
    joinDate.setMonth(joinDate.getMonth() - (Math.floor(Math.random() * 12) + 1));
    
    mentors.push({
      id: `mentor-${i + 1}`,
      name: ['Alex Johnson', 'Sarah Miller', 'David Chen', 'Emily Wong', 'Michael Brown', 'Jessica Lee', 'Daniel Kim', 'Rachel Green', 'James Wilson', 'Sophia Martinez'][i % 10],
      avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${30 + i}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      bio: bios[Math.floor(Math.random() * bios.length)],
      rating: 3.5 + Math.random() * 1.5,
      sessionCount: Math.floor(Math.random() * 50) + 5,
      skills: mentorSkills,
      joinDate: joinDate.toISOString()
    });
  }
  
  return mentors;
};

/**
 * Generate random feedback data for development and testing
 * 
 * REPLACE THIS: In production, fetch real feedback data from your API
 * 
 * @param count - Number of feedback items to generate
 * @param isReceived - Whether to generate received feedback (vs. given)
 * @returns Array of mock feedback objects
 */
export const generateMockFeedback = (count: number, isReceived = true) => {
  const feedback = [];
  
  for (let i = 0; i < count; i++) {
    // Generate date (1-30 days ago)
    const date = new Date();
    date.setDate(date.getDate() - (Math.floor(Math.random() * 30) + 1));
    
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    feedback.push({
      id: `feedback-${i + 1}`,
      sessionId: `session-${Math.floor(Math.random() * 100) + 1}`,
      sessionTitle: [
        'JavaScript Best Practices', 
        'React Component Design', 
        'Career Growth in Tech',
        'Code Review Session',
        'System Design Basics'
      ][Math.floor(Math.random() * 5)],
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars mostly
      comment: [
        'Great session! The mentor was very knowledgeable and provided clear explanations.',
        'Very helpful advice that I can apply immediately to my work.',
        'Excellent mentoring session. I learned a lot and got answers to all my questions.',
        'The mentor was patient and took time to understand my specific challenges.',
        'Insightful feedback on my code. I appreciate the constructive criticism.',
        'The session exceeded my expectations. Looking forward to the next one!'
      ][Math.floor(Math.random() * 6)],
      date: formattedDate,
      fromName: isReceived ? 
        ['John Smith', 'Jane Doe', 'Robert Lee', 'Lisa Park', 'Tom Wilson'][Math.floor(Math.random() * 5)] :
        ['Alex Johnson', 'Sarah Miller', 'David Chen', 'Emily Wong', 'Michael Brown'][Math.floor(Math.random() * 5)],
      fromAvatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${isReceived ? 20 + i : 10 + i}`,
      toName: isReceived ?
        ['Alex Johnson', 'Sarah Miller', 'David Chen', 'Emily Wong', 'Michael Brown'][Math.floor(Math.random() * 5)] :
        ['John Smith', 'Jane Doe', 'Robert Lee', 'Lisa Park', 'Tom Wilson'][Math.floor(Math.random() * 5)],
      toAvatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${isReceived ? 10 + i : 20 + i}`
    });
  }
  
  return feedback;
};

/**
 * Generate mock chart data for the dashboard
 * 
 * REPLACE THIS: In production, fetch real analytics data from your API
 * 
 * @returns Array of data points for the sessions chart
 */
export const generateMockChartData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    data.push({
      name: day,
      sessions: Math.floor(Math.random() * 5) + 1
    });
  }
  
  return data;
};

/**
 * Generate time slots for mentor availability
 * 
 * REPLACE THIS: In production, generate time slots based on user preferences
 * 
 * @returns Array of time slot strings
 */
export const generateTimeSlots = () => {
  const slots = [];
  
  // Generate time slots from 9 AM to 5:30 PM in 30-minute increments
  for (let hour = 9; hour <= 17; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    
    slots.push(`${displayHour}:00 ${period}`);
    
    if (hour !== 17) { // Don't add 5:30 PM
      slots.push(`${displayHour}:30 ${period}`);
    }
  }
  
  return slots;
};