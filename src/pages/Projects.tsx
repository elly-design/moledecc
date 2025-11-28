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
  tags: string[];
  results: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Global Leadership Transformation',
    client: 'Fortune 500 Technology Firm',
    category: 'Leadership Development',
    description: 'A comprehensive leadership development program for senior executives across 15 countries, focusing on strategic thinking and innovation.',
    image: 'https://images.unsplash.com/photo-1522071820081-009c01201d78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    tags: ['Leadership', 'Global', 'Strategy'],
    results: [
      '35% increase in leadership effectiveness scores',
      'Improved cross-functional collaboration',
      'Successful implementation of 12 strategic initiatives'
    ]
  },
  {
    id: 2,
    title: 'Organizational Restructuring',
    client: 'Leading Healthcare Provider',
    category: 'Organizational Design',
    description: 'Redesigned organizational structure to improve efficiency and patient care delivery across 25 facilities.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    tags: ['Healthcare', 'Restructuring', 'Efficiency'],
    results: [
      '22% improvement in operational efficiency',
      'Reduced administrative costs by 18%',
      'Enhanced patient satisfaction scores'
    ]
  },
  {
    id: 3,
    title: 'Digital Transformation',
    client: 'Financial Services Corporation',
    category: 'Digital Innovation',
    description: 'Led the digital transformation initiative to modernize customer experience and internal processes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    tags: ['Digital', 'Innovation', 'Fintech'],
    results: [
      '40% increase in digital customer engagement',
      'Reduced processing time by 60%',
      'Launched 3 new digital products'
    ]
  },
  {
    id: 4,
    title: 'Talent Development Program',
    client: 'Manufacturing Conglomerate',
    category: 'Talent Management',
    description: 'Developed and implemented a comprehensive talent development framework to build leadership pipeline.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    tags: ['Talent', 'Development', 'Leadership'],
    results: [
      '85% employee retention rate',
      'Promoted 30% of high-potential employees',
      'Established mentorship program'
    ]
  },
  {
    id: 5,
    title: 'Cultural Transformation',
    client: 'Retail Chain',
    category: 'Culture Change',
    description: 'Led a cultural transformation initiative to foster innovation and customer-centric mindset.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    tags: ['Culture', 'Innovation', 'Retail'],
    results: [
      'Improved employee engagement by 45%',
      'Enhanced customer satisfaction scores',
      'Launched 5 innovation initiatives'
    ]
  },
  {
    id: 6,
    title: 'Strategic Planning Initiative',
    client: 'Non-Profit Organization',
    category: 'Strategic Planning',
    description: 'Facilitated strategic planning process to align organizational goals with community impact.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    tags: ['Strategy', 'Non-Profit', 'Planning'],
    results: [
      'Clear 5-year strategic roadmap',
      'Increased funding by 60%',
      'Expanded programs to 3 new regions'
    ]
  }
];

const categories = [
  'All',
  'Leadership Development',
  'Organizational Design',
  'Digital Innovation',
  'Talent Management',
  'Culture Change',
  'Strategic Planning'
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
              <span className={styles.projectCategory}>
                {project.category.split(' ')[0]}
              </span>
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
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
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
