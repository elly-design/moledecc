import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/About.module.css';

// Use the base motion components directly
const motionComponents = {
  div: motion.div,
  section: motion.section,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  button: motion.button,
} as const;

// Create a type for viewport props
type ViewportProps = {
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
  };
};

// Custom motion component with proper viewport props
type MotionDivProps = React.ComponentProps<typeof motion.div> & ViewportProps;

const MotionDiv = motion.div;
// Icons from react-icons
import { 
  FaGraduationCap, 
  FaLightbulb, 
  FaUsers, 
  FaChartBar, 
  FaCheckCircle, 
  FaArrowRight, 
  FaTimes, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaGlobe,
  FaClock,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaDownload
} from 'react-icons/fa';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import Journey from '../components/Journey';

// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'CEO & Founder',
    bio: '20+ years of experience in organizational leadership and strategic development. Passionate about driving innovation and growth.',
    image: '/images/team/team-1.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'sarah@example.com',
      phone: '+1 (555) 123-4567'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Technology visionary with expertise in digital transformation and software architecture. Leads our technical strategy and innovation.',
    image: '/images/team/team-2.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'michael@example.com',
      phone: '+1 (555) 234-5678'
    }
  },
  {
    id: 3,
    name: 'Amina Diallo',
    role: 'Head of Operations',
    bio: 'Operations specialist with a focus on process optimization and team leadership. Ensures seamless project delivery.',
    image: '/images/team/team-3.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'amina@example.com',
      phone: '+1 (555) 345-6789'
    }
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Lead Developer',
    bio: 'Full-stack developer with expertise in modern web technologies. Leads our development team in creating robust solutions.',
    image: '/images/team/team-4.jpg',
    social: {
      linkedin: '#',
      github: '#',
      email: 'david@example.com',
      phone: '+1 (555) 456-7890'
    }
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    role: 'UX/UI Designer',
    bio: 'Creative designer focused on creating intuitive and beautiful user experiences. Passionate about human-centered design.',
    image: '/images/team/team-5.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'emily@example.com',
      phone: '+1 (555) 567-8901'
    }
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Marketing Director',
    bio: 'Marketing strategist with expertise in digital marketing and brand development. Drives our market presence and growth.',
    image: '/images/team/team-6.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'james@example.com',
      phone: '+1 (555) 678-9012'
    }
  }
];

// Team Member Card Component
const TeamMemberCard: React.FC<{
  member: typeof teamMembers[0];
  onClose: () => void;
}> = ({ member, onClose }) => (
  <motion.div 
    className="team-member-modal"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
  >
    <button onClick={onClose} className="close-button">
      <FaTimes className="w-6 h-6" />
    </button>
    <div className="modal-content">
      <div className="modal-image">
        <FaUser className="w-full h-full text-gray-300" />
      </div>
      <div className="modal-details">
        <h3>{member.name}</h3>
        <p className="role">{member.role}</p>
        <p className="bio">{member.bio}</p>
        <div className="contact-info">
          <a href={`mailto:${member.social.email}`}>
            <FaEnvelope className="w-5 h-5" />
            {member.social.email}
          </a>
          <a href={`tel:${member.social.phone}`}>
            <FaPhone className="w-5 h-5" />
            {member.social.phone}
          </a>
        </div>
        <div className="social-links">
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-5 h-5" />
            </a>
          )}
          {member.social.github && (
            <a href={member.social.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const About: React.FC = () => {
  const [showTeam, setShowTeam] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  
  const milestones = [
    {
      year: '2007',
      title: 'Company Founded',
      description: 'Launched with a vision to transform how organizations approach digital transformation and operational excellence.'
    },
    {
      year: '2015',
      title: 'First Major Client',
      description: 'Secured our first Fortune 500 client, marking the beginning of our enterprise transformation journey.'
    },
    {
      year: '2018',
      title: 'Global Expansion',
      description: 'Expanded operations to three continents, establishing a truly global presence.'
    },
    {
      year: '2020',
      title: 'Innovation Award',
      description: 'Recognized as an industry leader in innovative transformation solutions.'
    },
    {
      year: '2023',
      title: '10 Years Strong',
      description: 'Celebrated a decade of excellence in organizational transformation.'
    }
  ];
  
  const openMemberModal = (member: typeof teamMembers[0]) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };
  
  const closeMemberModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };
  
  const toggleTeamSection = () => {
    setShowTeam(!showTeam);
    if (!showTeam) {
      const teamSection = document.getElementById('team-section');
      if (teamSection) {
        window.scrollTo({
          top: teamSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle scroll to update active slide indicator
  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const scrollPosition = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.scrollWidth / 6; // 6 cards in total
    const newSlide = Math.round(scrollPosition / cardWidth);
    
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
    }
  };

  // Handle touch/mouse events for drag scrolling
  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Scroll to specific slide
  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    
    const cardWidth = carouselRef.current.scrollWidth / 6; // 6 cards in total
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && carouselRef.current) {
        const nextSlide = (currentSlide + 1) % 6; // 6 cards in total
        scrollToSlide(nextSlide);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isDragging]);

  // Core values data
  const coreValues = [
    {
      title: 'Innovation',
      description: 'We embrace change and continuously seek new ways to solve complex challenges.',
      icon: <FaLightbulb className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, delivering exceptional results.',
      icon: <FaCheckCircle className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and ethical practices.',
      icon: <FaUsers className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships.',
      icon: <FaChartBar className="w-8 h-8 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={styles.heroGradient}>
        <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="w-full max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <span className={styles.heroBadge}>
              Our Story
            </span>
            <h1 className={styles.heroTitle}>
              A Decade of <span className="text-amber-300">Transforming</span> Organizations
            </h1>
            <p className={styles.heroSubtitle}>
              Empowering individuals leaders and organizations to unlock their potential through motivation leadership development, coaching and strategic community development  since 2007.
            </p>
            <div className={styles.statsContainer}>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Full Width */}
      <div className={styles.fullWidthSection}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={styles.sectionHeader}>
            <div className="text-center w-full">
              <div className="mt-6 text-center">
                <span className={`${styles.sectionBadge} inline-block`}>
                  Our Journey
                </span>
              </div>
            </div>
          </div>

          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <div className={styles.storyBlock}>
                <h3 className={styles.storyTitle}>Mission</h3>
                <p className={styles.storyText}>
                  To inspire and empower individuals and communities through motivation, leadership development, coaching and strategic engagement, unlocking potential and creating lasting positive change.
                </p>
              </div>
              
              <div className={styles.storyBlock}>
                <h3 className={styles.storyTitle}>Vision</h3>
                <p className={styles.storyText}>
                  To be a global leader in personal, leadership and community transformation, raising empowered leaders who shape a just, prosperous and purpose-driven society.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Milestones</h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative pl-12 pb-8 ${index !== milestones.length - 1 ? 'border-l-2 border-gray-200' : ''}`}
                  >
                    <div 
                      className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${activeMilestone === index ? 'bg-blue-600 scale-110' : 'bg-gray-400'}`}
                      onMouseEnter={() => setActiveMilestone(index)}
                    >
                      {milestone.year}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{milestone.title}</h4>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section - Full Width */}
      <div className="w-full bg-gray-50 pt-24 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={styles.teamBadge}>Our Team</span>
            <h2 className={styles.teamTitle}>Meet Our <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Leadership</span></h2>
            <p className={styles.teamSubtitle}>
              A team of passionate professionals dedicated to driving your success
            </p>
            <button 
              onClick={toggleTeamSection}
              className={`${styles.ctaButton} mt-6`}
            >
              {showTeam ? 'Hide Team' : 'Meet Our Team'}
              {!showTeam && <FaArrowRight className="ml-2" />}
            </button>
          </div>

          <AnimatePresence>
            {showTeam && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className={styles.teamGrid}>
                  {teamMembers.slice(0, 3).map((member) => (
              <motion.div
                key={member.id}
                className={styles.teamMemberCard}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => openMemberModal(member)}
              >
                <div className={styles.teamMemberImage}>
                  <FaUser className="w-24 h-24 text-gray-400" />
                </div>
                <div className={styles.teamMemberContent}>
                  <h3 className={styles.teamMemberName}>{member.name}</h3>
                  <span className={styles.teamMemberRole}>{member.role}</span>
                  <p className={styles.teamMemberBio}>
                    {member.bio}
                  </p>
                  <div className={styles.teamSocialLinks}>
                    {member.social?.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.teamSocialLink} aria-label={`${member.name}'s LinkedIn`}>
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.teamSocialLink} aria-label={`${member.name}'s Twitter`}>
                        <FaTwitter />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showTeam && (
              <motion.div
                key="additional-members"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-12 overflow-hidden w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.slice(3).map((member) => (
                    <motion.div
                      key={member.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      onClick={() => openMemberModal(member)}
                    >
                      <div className="h-48 bg-gray-100 flex items-center justify-center">
                        <FaUser className="w-24 h-24 text-gray-400" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                        <p className="text-gray-600 line-clamp-3">
                          {member.bio}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeMemberModal}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h3>
                    <p className="text-blue-600 font-medium">{selectedMember.role}</p>
                  </div>
                  <button 
                    onClick={closeMemberModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3">
                    <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                      <FaUser className="w-32 h-32 text-gray-400" />
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                      {selectedMember.social.linkedin && (
                        <a 
                          href={selectedMember.social.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <FaLinkedin className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.social.twitter && (
                        <a 
                          href={selectedMember.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          <FaTwitter className="w-6 h-6" />
                        </a>
                      )}
                      {selectedMember.social.github && (
                        <a 
                          href={selectedMember.social.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <FaGithub className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <a 
                        href={`mailto:${selectedMember.social.email}`}
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <FaEnvelope className="w-5 h-5 mr-2 text-blue-500" />
                        {selectedMember.social.email}
                      </a>
                      <a 
                        href={`tel:${selectedMember.social.phone}`}
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <FaPhone className="w-5 h-5 mr-2 text-blue-500" />
                        {selectedMember.social.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Experience</h4>
                      <div className="space-y-4">
                        {[
                          { title: 'Experience', value: '15+ years' },
                          { title: 'Expertise', value: selectedMember.role },
                          { title: 'Education', value: 'PhD in Business Administration' },
                          { title: 'Location', value: 'Nairobi, Kenya' },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-gray-600">{item.title}</span>
                            <span className="font-medium text-gray-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Core Values - Full Width */}
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center pt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`${styles.sectionTitle} mt-4`}>
              Our Foundation
            </h2>
            <div className="mt-4">
              <span className={`${styles.sectionBadge} inline-block`}>
                Core Values
              </span>
            </div>
            <p className={`${styles.sectionDescription} mt-6`}>
              These principles guide everything we do and form the foundation of our success.
            </p>
          </motion.div>

          <div className={styles.carouselWrapper}>
            <div 
              className={styles.carouselContainer}
              ref={carouselRef}
              onScroll={handleScroll}
              onMouseDown={startDragging}
              onMouseLeave={stopDragging}
              onMouseUp={stopDragging}
              onMouseMove={onDrag}
              onTouchStart={startDragging}
              onTouchEnd={stopDragging}
              onTouchMove={onDrag}
            >
              {[
                {
                  name: 'Excellence',
                  description: 'We pursue the highest standards in everything we do, delivering exceptional quality and value to our clients.',
                  icon: 'graduation-cap',
                  color: 'bg-gradient-to-br from-blue-500 to-blue-600'
                },
                {
                  name: 'Integrity',
                  description: 'We operate with honesty, transparency, and ethical behavior in all our interactions.',
                  icon: 'check-circle',
                  color: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                },
                {
                  name: 'Innovation',
                  description: 'We embrace creativity and forward-thinking to develop cutting-edge solutions for our clients.',
                  icon: 'lightbulb',
                  color: 'bg-gradient-to-br from-amber-500 to-amber-600'
                },
                {
                  name: 'Collaboration',
                  description: 'We believe in the power of partnership and work closely with our clients to achieve shared success.',
                  icon: 'users',
                  color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
                },
                {
                  name: 'Impact',
                  description: 'We measure our success by the tangible, positive change we create for our clients and communities.',
                  icon: 'chart-bar',
                  color: 'bg-gradient-to-br from-purple-500 to-purple-600'
                },
                {
                  name: 'Continuous Learning',
                  description: 'We foster a culture of growth, curiosity, and knowledge-sharing to stay at the forefront of our field.',
                  icon: 'graduation-cap',
                  color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
                }
              ].map((value, index) => (
                <motion.div 
                  key={value.name}
                  className={styles.valueCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className={styles.valueIcon} 
                    style={{ 
                      background: value.color.replace('bg-gradient-to-br', '').trim(),
                      backgroundImage: value.color
                    }}
                  >
                    <div className="text-white text-2xl">
                      {value.icon === 'graduation-cap' && <FaGraduationCap />}
                      {value.icon === 'check-circle' && <FaCheckCircle />}
                      {value.icon === 'lightbulb' && <FaLightbulb />}
                      {value.icon === 'users' && <FaUsers />}
                      {value.icon === 'chart-bar' && <FaChartBar />}
                    </div>
                  </div>
                  <h3 className={styles.valueTitle}>{value.name}</h3>
                  <p className={styles.valueDescription}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className={styles.carouselNav}>
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <button
                  key={index}
                  className={`${styles.navButton} ${currentSlide === index ? styles.active : ''}`}
                  onClick={() => scrollToSlide(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToSlide(index);
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentSlide === index ? 'step' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h3 className={styles.ctaTitle}>
          Ready to transform your organization?
        </h3>
        <p className={styles.ctaDescription}>
          Get in touch with our team to discuss how we can help you achieve your business goals.
        </p>
        <a href="#contact" className={styles.ctaButton}>
          Contact Us
          {typeof window !== 'undefined' && window.innerWidth >= 768 && <FaArrowRight />}
        </a>
      </div>
    </div>
  );
};

export default About;
