import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Card, CardBody, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-12 sm:py-20">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Connect with Expert Mentors to Accelerate Your Career
              </h1>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
                Schedule one-on-one mentoring sessions with experienced developers who can help you grow your skills and advance your career.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Button 
                  as={RouterLink} 
                  to="/register" 
                  color="secondary" 
                  size="lg"
                  className="font-medium w-full sm:w-auto"
                >
                  Get Started
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/mentors" 
                  variant="bordered" 
                  color="default" 
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm font-medium w-full sm:w-auto"
                >
                  Browse Mentors
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10 w-full">
              <img 
                src="https://img.heroui.chat/image/ai?w=600&h=400&u=mentoring" 
                alt="Mentoring session" 
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">500+</div>
              <p className="text-gray-600 text-sm sm:text-base">Active Mentors</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">10,000+</div>
              <p className="text-gray-600 text-sm sm:text-base">Mentoring Sessions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">95%</div>
              <p className="text-gray-600 text-sm sm:text-base">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How MentorHub Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Our platform makes it easy to connect with experienced mentors and schedule productive mentoring sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="card-shadow border-none">
              <CardBody className="text-center p-6 sm:p-8">
                <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Icon icon="lucide:user-plus" className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up as a mentor or mentee and create your profile highlighting your skills and experience.
                </p>
              </CardBody>
            </Card>

            <Card className="card-shadow border-none">
              <CardBody className="text-center p-8">
                <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Icon icon="lucide:calendar" className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Schedule Sessions</h3>
                <p className="text-gray-600">
                  Browse available mentors, view their availability, and request sessions at convenient times.
                </p>
              </CardBody>
            </Card>

            <Card className="card-shadow border-none">
              <CardBody className="text-center p-8">
                <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Icon icon="lucide:video" className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Meet and Learn</h3>
                <p className="text-gray-600">
                  Connect via video chat for your mentoring session and get personalized guidance and feedback.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from developers who have used MentorHub to advance their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-shadow border-none">
                <CardBody className="p-8">
                  <div className="flex items-center mb-6">
                    <Avatar src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${10 + i}`} className="mr-4" />
                    <div>
                      <h4 className="font-semibold">{["Alex Johnson", "Sarah Miller", "David Chen"][i-1]}</h4>
                      <p className="text-sm text-gray-500">{["Frontend Developer", "UX Designer", "Full Stack Engineer"][i-1]}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    {[
                      "MentorHub connected me with a senior developer who helped me improve my React skills. The mentoring sessions were incredibly valuable for my career growth.",
                      "I was stuck on a complex UI problem, and my mentor helped me find an elegant solution. The platform made scheduling and feedback super easy.",
                      "As someone transitioning into tech, having a dedicated mentor made all the difference. The structured sessions and feedback helped me land my first developer job."
                    ][i-1]}
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, j) => (
                      <Icon key={j} icon="lucide:star" className="text-yellow-400" />
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about MentorHub.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                q: "How do I become a mentor?",
                a: "Sign up for an account, select 'Mentor' as your role, complete your profile with your skills and experience, and set your availability. Our team will review your profile and approve you as a mentor."
              },
              {
                q: "How much does it cost to use MentorHub?",
                a: "MentorHub is free for both mentors and mentees. We believe in making mentorship accessible to everyone in the tech community."
              },
              {
                q: "How long are mentoring sessions?",
                a: "Standard mentoring sessions are 30 minutes, but mentors can set custom session lengths based on their preferences and availability."
              },
              {
                q: "Can I cancel or reschedule a session?",
                a: "Yes, you can cancel or reschedule a session up to 24 hours before the scheduled time without any penalty."
              },
              {
                q: "How does the feedback system work?",
                a: "After each session, both mentors and mentees can rate each other and leave comments. This feedback helps improve future sessions and builds reputation on the platform."
              }
            ].map((item, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join MentorHub today and connect with experienced mentors who can help you reach your goals.
          </p>
          <Button 
            as={RouterLink} 
            to="/register" 
            color="secondary" 
            size="lg"
            className="font-medium"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;