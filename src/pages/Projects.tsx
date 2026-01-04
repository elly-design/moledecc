import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import styles from './Projects.module.css';

type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  results: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Leadership Training and Workshops',
    client: 'Educational Institutions',
    category: 'Leadership Development',
    description: 'Our leadership training programs are designed for students, professionals, community leaders, and institutions. The workshops focus on building practical leadership competencies such as communication, decision-making, emotional intelligence, conflict resolution, ethical leadership, and strategic thinking.',
    image: '/images/leadership.jpg',
    results: [
      'Enhanced leadership confidence and competence',
      'Improved team management and communication skills',
      'Strong ethical and values-based leadership practices'
    ]
  },
  {
    id: 2,
    title: 'Youth Empowerment Forum',
    client: 'Community Organizations',
    category: 'Youth Development',
    description: 'The Youth Empowerment Forum is a dynamic platform that equips young people with leadership skills, life skills, entrepreneurship knowledge, and civic awareness. The forum encourages youth participation in governance, innovation, and community development.',
    image: '/images/empowerment.png',
    results: [
      'Youth leadership and civic engagement',
      'Career guidance and entrepreneurship',
      'Life skills and personal development',
      'Talent identification and mentorship'
    ]
  },
  {
    id: 3,
    title: 'Women in Business and Leadership Forum',
    client: 'Business Organizations',
    category: 'Women Empowerment',
    description: 'This initiative is dedicated to empowering women to take up leadership roles in business, governance, and community development. The forum provides training, mentorship, networking opportunities, and advocacy for gender equity.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    results: [
      'Women entrepreneurship and financial literacy',
      'Leadership confidence and negotiation skills',
      'Gender-inclusive leadership',
      'Networking and peer mentorship'
    ]
  },
  {
    id: 4,
    title: 'Governance and GBV Awareness Campaigns',
    client: 'Government Agencies',
    category: 'Governance',
    description: 'Moledecc conducts governance and Gender-Based Violence (GBV) awareness campaigns aimed at promoting accountability, human rights, and safe communities. These campaigns engage communities, institutions, and youth through sensitization forums, advocacy drives, and stakeholder dialogues.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    results: [
      'Good governance and civic responsibility',
      'Human rights education',
      'GBV prevention and awareness',
      'Community engagement and advocacy'
    ]
  },
  {
    id: 5,
    title: 'Mentorship and Coaching Programs',
    client: 'Educational Institutions',
    category: 'Mentorship',
    description: 'Our mentorship and coaching programs connect participants with experienced mentors and certified coaches to support personal growth, career development, and leadership advancement. The programs are structured, goal-oriented, and impact-driven.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    results: [
      'One-on-one and group mentorship',
      'Leadership and career coaching',
      'Personal development planning',
      'Continuous learning and accountability'
    ]
  }
];

const categories = [
  'All',
  'Leadership',
  'Youth',
  'Women',
  'Governance',
  'Mentorship',
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => {
        if (selectedCategory === 'Leadership') return project.category.includes('Leadership');
        if (selectedCategory === 'Youth') return project.category.includes('Youth');
        if (selectedCategory === 'Women') return project.category.includes('Women');
        if (selectedCategory === 'Governance') return project.category.includes('Governance');
        if (selectedCategory === 'Mentorship') return project.category.includes('Mentorship');
        return false;
      });

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        // Small delay to allow the modal to close before resetting the selected project
        setTimeout(() => setSelectedProject(null), 300);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
    // Small delay to allow the modal to close before resetting the selected project
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className={styles.projectsContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Projects
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore our portfolio of successful transformations and the impact we've created for our clients.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`${styles.filterButton} ${
              selectedCategory === category 
                ? styles.filterButtonActive 
                : styles.filterButtonInactive
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => openModal(project)}
          >
            <div className={styles.projectImageContainer}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
                loading="lazy"
              />
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectClient}>{project.client}</p>
              <p className={styles.projectDescription}>
                {project.description}
              </p>
              <span className={styles.projectLink}>
                View case study
                <ArrowRightIcon className={styles.linkIcon} />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div 
            className={styles.modalOverlay}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className={styles.modalImage}
              />
              
              <div className={styles.modalBody}>
                <header className={styles.modalHeader}>
                  <span className={styles.modalCategory}>
                    {selectedProject.category}
                  </span>
                  <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                  <p className={styles.modalClient}>{selectedProject.client}</p>
                </header>
                
                <div className={styles.modalDescription}>
                  {selectedProject.description}
                </div>
                
                <div className={styles.resultsSection}>
                  <h3 className={styles.resultsTitle}>Key Results</h3>
                  <ul className={styles.resultsList}>
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className={styles.resultItem}>
                        <CheckIcon className={styles.resultIcon} />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.modalActions}>
                  <a 
                    href="/contact" 
                    className={`${styles.primaryButton} ${styles.modalCta}`}
                  >
                    Start Your Project
                    <ArrowRightIcon className={styles.linkIcon} />
                  </a>
                  <button 
                    className={styles.secondaryButton}
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
