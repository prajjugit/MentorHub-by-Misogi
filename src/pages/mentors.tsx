import React from 'react';
import { Card, CardBody, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination } from '@heroui/react';
import { Icon } from '@iconify/react';
import { MentorCard } from '../components/mentor-card';
import { generateMockMentors } from '../data/mock-data';

/**
 * MentorsPage component displays and filters available mentors
 * 
 * This component handles:
 * - Displaying mentor cards
 * - Searching and filtering mentors
 * - Pagination of mentor results
 * 
 * When integrating with a backend API:
 * - Replace mock data with actual API calls
 * - Implement server-side filtering and pagination
 * - Add loading states and error handling
 */
const MentorsPage: React.FC = () => {
  // UI state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [skillFilter, setSkillFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("rating");
  const [page, setPage] = React.useState(1);
  
  // REPLACE THIS: Fetch actual mentor data from your API
  // Example:
  // const [allMentors, setAllMentors] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [error, setError] = React.useState(null);
  // 
  // React.useEffect(() => {
  //   const fetchMentors = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await api.get('/mentors', {
  //         params: {
  //           search: searchQuery,
  //           skill: skillFilter !== 'all' ? skillFilter : undefined,
  //           sortBy,
  //           page,
  //           limit: 9
  //         }
  //       });
  //       setAllMentors(response.data.mentors);
  //       setTotalPages(response.data.totalPages);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchMentors();
  // }, [searchQuery, skillFilter, sortBy, page]);
  
  // Mock data for development
  const allMentors = React.useMemo(() => generateMockMentors(20), []);
  
  /**
   * Filter and sort mentors based on search query, skill filter, and sort option
   */
  const filteredMentors = React.useMemo(() => {
    let mentors = [...allMentors];
    
    if (searchQuery) {
      mentors = mentors.filter(mentor => 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (skillFilter !== "all") {
      mentors = mentors.filter(mentor => 
        mentor.skills.some(skill => skill.toLowerCase() === skillFilter.toLowerCase())
      );
    }
    
    // Sort mentors
    if (sortBy === "rating") {
      mentors.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "sessions") {
      mentors.sort((a, b) => b.sessionCount - a.sessionCount);
    } else if (sortBy === "newest") {
      mentors.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
    }
    
    return mentors;
  }, [allMentors, searchQuery, skillFilter, sortBy]);
  
  /**
   * Paginate filtered mentors
   */
  const paginatedMentors = React.useMemo(() => {
    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage;
    return filteredMentors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMentors, page]);
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredMentors.length / 9);

  // List of skills for filtering
  // REPLACE THIS: Fetch skills from your API
  const skillOptions = [
    "all", "JavaScript", "React", "TypeScript", "Node.js", "Python", 
    "Java", "C#", "Angular", "Vue.js", "AWS", "DevOps"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Find Mentors</h1>
      </div>

      <Card className="card-shadow border-none">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search mentors by name or skill..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="flex-1"
            />
            
            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered"
                    endContent={<Icon icon="lucide:chevron-down" />}
                  >
                    {skillFilter === "all" ? "All Skills" : skillFilter}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Filter by skill"
                  onAction={(key) => setSkillFilter(key as string)}
                  selectedKeys={[skillFilter]}
                  selectionMode="single"
                  className="max-h-64 overflow-y-auto"
                >
                  {skillOptions.map(skill => (
                    <DropdownItem key={skill}>
                      {skill === "all" ? "All Skills" : skill}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered"
                    endContent={<Icon icon="lucide:chevron-down" />}
                  >
                    {sortBy === "rating" ? "Highest Rated" : 
                     sortBy === "sessions" ? "Most Sessions" : "Newest"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Sort mentors"
                  onAction={(key) => setSortBy(key as string)}
                  selectedKeys={[sortBy]}
                  selectionMode="single"
                >
                  <DropdownItem key="rating">Highest Rated</DropdownItem>
                  <DropdownItem key="sessions">Most Sessions</DropdownItem>
                  <DropdownItem key="newest">Newest</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>

      {paginatedMentors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Pagination 
              total={totalPages} 
              page={page} 
              onChange={setPage}
              showControls
            />
          </div>
        </>
      ) : (
        <Card className="card-shadow border-none">
          <CardBody className="py-16 text-center">
            <Icon 
              icon="lucide:search-x" 
              className="text-gray-400 text-5xl mx-auto mb-4" 
            />
            <h3 className="text-xl font-medium mb-2">No mentors found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find mentors.
            </p>
            <Button 
              color="primary"
              onPress={() => {
                setSearchQuery("");
                setSkillFilter("all");
                setSortBy("rating");
              }}
            >
              Clear Filters
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MentorsPage;