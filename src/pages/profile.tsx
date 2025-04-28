import React from 'react';
import { Card, CardBody, CardHeader, Input, Textarea, Button, Avatar, Chip, Tabs, Tab, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';
import { AvailabilitySelector } from '../components/availability-selector';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const isMentor = user?.role === 'mentor';
  
  const [name, setName] = React.useState(user?.name || '');
  const [bio, setBio] = React.useState('');
  const [skills, setSkills] = React.useState<string[]>(['JavaScript', 'React', 'TypeScript']);
  const [newSkill, setNewSkill] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      addToast({
        title: "Success",
        description: "Profile updated successfully",
        severity: "success",
      });
    }, 1000);
  };
  
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button 
          color="primary"
          onPress={handleSaveProfile}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-shadow border-none">
            <CardHeader>
              <h2 className="text-lg font-semibold">Basic Information</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <Avatar 
                    src={user?.avatar} 
                    className="w-24 h-24"
                    isBordered
                  />
                  <Button 
                    variant="flat" 
                    color="primary" 
                    size="sm"
                    className="mt-2"
                  >
                    Change Photo
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    value={name}
                    onValueChange={setName}
                  />
                  
                  <Input
                    label="Email"
                    placeholder="Your email"
                    value={user?.email || ''}
                    isReadOnly
                  />
                  
                  <div>
                    <Chip color={isMentor ? "primary" : "secondary"} className="capitalize">
                      {user?.role}
                    </Chip>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card className="card-shadow border-none">
            <CardHeader>
              <h2 className="text-lg font-semibold">About Me</h2>
            </CardHeader>
            <CardBody>
              <Textarea
                label="Bio"
                placeholder="Tell others about yourself, your experience, and what you can help with"
                value={bio}
                onValueChange={setBio}
                minRows={4}
              />
            </CardBody>
          </Card>
          
          <Card className="card-shadow border-none">
            <CardHeader>
              <h2 className="text-lg font-semibold">Skills & Expertise</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Input
                  label="Add Skills"
                  placeholder="Type a skill and press Enter"
                  value={newSkill}
                  onValueChange={setNewSkill}
                  onKeyDown={handleAddSkill}
                  description="Press Enter to add a skill"
                />
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Chip
                      key={skill}
                      onClose={() => handleRemoveSkill(skill)}
                      variant="flat"
                      color="primary"
                    >
                      {skill}
                    </Chip>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-gray-500 text-sm">No skills added yet</p>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {isMentor && (
            <Card className="card-shadow border-none">
              <CardHeader>
                <h2 className="text-lg font-semibold">Availability</h2>
              </CardHeader>
              <CardBody>
                <AvailabilitySelector />
              </CardBody>
            </Card>
          )}
          
          <Card className="card-shadow border-none">
            <CardHeader>
              <h2 className="text-lg font-semibold">Account Settings</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <Button 
                variant="flat" 
                color="primary" 
                className="w-full justify-start"
                startContent={<Icon icon="lucide:lock" />}
              >
                Change Password
              </Button>
              
              <Button 
                variant="flat" 
                color="primary" 
                className="w-full justify-start"
                startContent={<Icon icon="lucide:bell" />}
              >
                Notification Settings
              </Button>
              
              <Button 
                variant="flat" 
                color="danger" 
                className="w-full justify-start"
                startContent={<Icon icon="lucide:trash-2" />}
              >
                Delete Account
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;