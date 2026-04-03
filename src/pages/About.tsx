import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from '../styles/About.module.css';
import AIChatbox from '../components/AIChatbox';

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
  FaDownload,
  FaEye
} from 'react-icons/fa';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import Journey from '../components/Journey';

// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: 'Rev. Canon Richard Otieno',
    role: 'Executive Director & Founder',
    image: '/images/otieno.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 2,
    name: 'Mrs.Rachel Otieno ',
    role: 'Director',
    image: '/images/racheal.png',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 3,
    name: 'Rev. Dr. Uzoaku Juliana PhD',
    role: 'Moledecc Associate Deputy Secretary General- ACCN-Nigeria',
    image: '/images/juliana.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 4,
    name: 'Emmanuel Ochieng',
    role: 'Moledecc Associate & Counseling Psychologist',
    image: '/images/emmanuel.jpeg',
    social: {
      linkedin: '#',
      github: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 5,
    name: 'Rev. Canon Rachel Amani',
    role: 'Moledecc Associate - Ceritified Mediator',
    image: '/images/amani2.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 6,
    name: 'Mrs. Caroline Hadassa Maina',
    role: 'Moledecc Associate & Prof. Leadership Coach',
    image: '/images/hadassa.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 7,
    name: 'Mrs. Peninah Mwenda',
    role: 'Moledecc Associate & Leadership Coach',
    image: '/images/peninah2.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 8,
    name: 'Ven. Dr. Simon Oriedo HSC',
    role: 'Moledecc Associate',
    image: '/images/oriedo2.jpeg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'moledecc2@gmail.com',
      phone: '+254789618945'
    }
  },
  {
    id: 9,
    name: 'Eliot Owiti', 
    role: 'Communication Officer',
    image: '/images/owiti (2).png',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'ellyman2021@gmail.com',
      phone: '+254 113 011949'
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
      <div id="our-journey" className={styles.fullWidthSection}>
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
              <motion.div 
                className={styles.storyBlock}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-100">
                    <FaLightbulb className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                </div>
                <h3 className={styles.storyTitle}>
                  Our Mission
                  <span className="relative inline-block">
                    <span className="absolute -left-2 -right-2 bottom-1 h-2 bg-blue-100 opacity-70 -z-10"></span>
                  </span>
                </h3>
                <p className={styles.storyText}>
                  To be a leading transformational catalyst empowering individuals, institutions and communities to lead with purpose, integrity and impact.
                </p>
              </motion.div>
              
              <motion.div 
                className={styles.storyBlock}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-100">
                    <FaEye className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                </div>
                <h3 className={styles.storyTitle}>
                  Our Vision
                  <span className="relative inline-block">
                    <span className="absolute -left-2 -right-2 bottom-1 h-2 bg-blue-100 opacity-70 -z-10"></span>
                  </span>
                </h3>
                <p className={styles.storyText}>
                  To be a global leader in personal, leadership and community transformation, raising empowered leaders who shape a just, prosperous and purpose-driven society.
                </p>
              </motion.div>
            </div>

            <div id="milestones" className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center sm:text-left">Our Milestones</h3>
              <div className="relative">
                <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative pl-8 sm:pl-12 pb-6 sm:pb-8 ${index !== milestones.length - 1 ? 'border-l-2 border-gray-200' : ''}`}
                  >
                    <div 
                      className={`absolute left-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${activeMilestone === index ? 'bg-blue-600 scale-110' : 'bg-gray-400'} transition-all duration-300 cursor-pointer`}
                      onMouseEnter={() => setActiveMilestone(index)}
                      onTouchStart={() => setActiveMilestone(index)}
                    >
                      {milestone.year}
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer">
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">{milestone.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{milestone.description}</p>
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
                  <img src={member.image} alt={member.name} className="w-24 h-24 object-cover rounded-full" />
                </div>
                <div className={styles.teamMemberContent}>
                  <h3 className={styles.teamMemberName}>{member.name}</h3>
                  <span className={styles.teamMemberRole}>{member.role}</span>
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
                <div className={styles.teamGrid}>
                  {teamMembers.slice(3).map((member) => (
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
                        <img src={member.image} alt={member.name} className="w-24 h-24 object-cover rounded-full" />
                      </div>
                      <div className={styles.teamMemberContent}>
                        <h3 className={styles.teamMemberName}>{member.name}</h3>
                        <span className={styles.teamMemberRole}>{member.role}</span>
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
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1">
                      {selectedMember.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-lg">{selectedMember.role}</p>
                  </div>
                  <button 
                    onClick={closeMemberModal}
                    className="group relative w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-red-200"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl aspect-square flex items-center justify-center border border-blue-100 shadow-lg">
                        <FaUser className="w-32 h-32 text-blue-400" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <FaCheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                          <h4 className="text-white font-semibold text-lg">Contact Information</h4>
                        </div>
                        
                        <div className="p-6 space-y-6">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                                <FaEnvelope className="w-4 h-4 text-white" />
                              </div>
                              <label className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Email Address</label>
                            </div>
                            <a 
                              href={`mailto:${selectedMember.social.email}`}
                              className="block text-gray-900 font-medium text-lg hover:text-blue-600 transition-colors duration-300"
                            >
                              {selectedMember.social.email || 'Contact for email'}
                            </a>
                          </div>
                          
                          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                <FaPhone className="w-4 h-4 text-white" />
                              </div>
                              <label className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Phone Number</label>
                            </div>
                            <a 
                              href={`tel:${selectedMember.social.phone}`}
                              className="block text-gray-900 font-medium text-lg hover:text-emerald-600 transition-colors duration-300"
                            >
                              {selectedMember.social.phone || 'Contact for phone'}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex items-center mb-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 mr-4 rounded-full"></div>
                        <h4 className="text-2xl font-bold text-gray-900">Professional Profile</h4>
                      </div>
                      
                      <div className={styles.storyGrid}>
                        {[
                          { 
                            title: 'Experience', 
                            icon: '📊',
                            color: 'from-blue-500 to-blue-600',
                            description: 'Professional experience in leadership and transformation'
                          },
                          { 
                            title: 'Expertise', 
                            value: selectedMember.role,
                            icon: '💡',
                            color: 'from-emerald-500 to-emerald-600',
                            description: 'Specialized skills and areas of focus'
                          },
                          { 
                            title: 'Education', 
                            value: selectedMember.name.includes('Richard Otieno') ? 'Masters in Theology' : 
                                   selectedMember.name.includes('Emmanuel') ? 'Psychologist in Masters' : 
                                   selectedMember.name.includes('Eliot') ? 'Software Engineering' : 
                                   'PhD in Business Administration',
                            icon: '🎓',
                            color: 'from-purple-500 to-purple-600',
                            description: 'Academic qualifications and certifications'
                          },
                          { 
                            title: 'Location', 
                            value: selectedMember.name.includes('Juliana') ? 'Nigeria' : 'Mombasa, Kenya',
                            icon: '📍',
                            color: 'from-amber-500 to-amber-600',
                          }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ 
                              scale: 1.02,
                              y: -5,
                              transition: { duration: 0.3 }
                            }}
                            className={styles.storyBlock}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg`}>
                                {item.icon}
                              </div>
                              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-semibold opacity-80`}>
                                Active
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {item.title}
                              </h3>
                              <p className="text-gray-900 font-bold text-lg leading-tight">
                                {item.value}
                              </p>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                            
                            <div className={`mt-4 h-1 bg-gradient-to-r ${item.color} rounded-full opacity-20`}></div>
                            
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-gray-400">Verified Information</span>
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Core Values - Full Width */}
      <div id="core-values" className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
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
                  name: 'Empowerment',
                  description: 'We are committed to empowering individuals and organizations with the tools, knowledge and confidence to achieve their full potential and create lasting impact.',
                  icon: 'users',
                  color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
                },
                {
                  name: 'Respect',
                  description: 'We honor the dignity, perspectives and contributions of all individuals, fostering an environment of mutual trust and understanding.',
                  icon: 'chart-bar',
                  color: 'bg-gradient-to-br from-purple-500 to-purple-600'
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
        <Link to="/contact" className={styles.ctaButton}>
          Contact Us
          {typeof window !== 'undefined' && window.innerWidth >= 768 && <FaArrowRight />}
        </Link>
      </div>

      {/* AI Chatbox */}
      <AIChatbox />
    </div>
  );
};

export default About;
