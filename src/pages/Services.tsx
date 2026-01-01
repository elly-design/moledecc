import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  UserGroupIcon, 
  LightBulbIcon,
  ArrowRightIcon,
  ChartBarIcon,
  ClockIcon,
  CalendarIcon,
  StarIcon,
  GlobeAltIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import styles from './Services.module.css';

interface Service {
  name: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  color: string;
  textColor: string;
}

const services: Service[] = [
  {
    name: 'Leadership Training & Workshops',
    description: 'Comprehensive leadership development programs designed to build essential skills and foster effective leadership practices.',
    icon: UserGroupIcon,
    features: [
      'Leadership Skills Training',
      'Team Building Workshops',
      'Communication Excellence',
      'Strategic Thinking',
      'Decision Making'
    ],
    color: styles.blueGradient,
    textColor: styles.blueText
  },
  {
    name: 'Youth Empowerment Forums',
    description: 'Empowering young people with the skills, confidence, and opportunities to become future leaders and change-makers.',
    icon: StarIcon,
    features: [
      'Youth Leadership Programs',
      'Skill Development Workshops',
      'Mentorship Opportunities',
      'Community Engagement',
      'Career Guidance'
    ],
    color: styles.emeraldGradient,
    textColor: styles.emeraldText
  },
  {
    name: 'Women in Business & Leadership Forums',
    description: 'Supporting women in breaking barriers and achieving excellence in business and leadership roles.',
    icon: GlobeAltIcon,
    features: [
      'Women Leadership Training',
      'Business Development Skills',
      'Networking Opportunities',
      'Career Advancement',
      'Work-Life Balance Strategies'
    ],
    color: styles.purpleGradient,
    textColor: styles.purpleText
  },
  {
    name: 'Governance & GBV Awareness Campaigns',
    description: 'Promoting good governance practices and raising awareness about gender-based violence prevention and response.',
    icon: LightBulbIcon,
    features: [
      'Governance Training',
      'GBV Prevention Programs',
      'Policy Development',
      'Community Awareness',
      'Support Systems'
    ],
    color: styles.amberGradient,
    textColor: styles.amberText
  },
  {
    name: 'Mentorship & Coaching Programs',
    description: 'Structured mentorship and coaching programs to support personal and professional growth.',
    icon: ClockIcon,
    features: [
      'One-on-One Mentoring',
      'Group Coaching Sessions',
      'Skills Transfer Programs',
      'Career Coaching',
      'Personal Development'
    ],
    color: styles.blueGradient,
    textColor: styles.blueText
  }
];

const ServiceCard = ({ service, index, isExpanded, onToggle }: { 
  service: Service; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${styles.serviceCard} ${isExpanded ? styles.expandedCard : ''}`}
    >
      <div 
        className={styles.cardToggle}
        onClick={onToggle}
      >
        <div className={`${styles.cardIcon} ${service.color}`}>
          <service.icon className={styles.icon} />
        </div>
        
        <h3 className={styles.cardTitle}>{service.name}</h3>
        <p className={styles.cardDescription}>{service.description}</p>
        
        <div className={styles.chevronContainer}>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDownIcon className={styles.chevronIcon} />
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.expandedContent}
          >
            <h4 className={styles.featuresTitle}>Key Features</h4>
            <ul className={styles.featuresList}>
              {service.features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className={styles.featureItem}
                >
                  <CheckCircleIcon className={`${styles.featureIcon} ${service.textColor}`} />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.ctaContainer}
            >
              <Link 
                to="/contact" 
                className={`${styles.ctaButton} ${service.textColor}`}
              >
                Get Started
                <ArrowRightIcon className={styles.arrowIcon} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Services = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className={styles.servicesContainer}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.backgroundElement}
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1 + Math.random() * 0.3],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section 
        className={styles.heroSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroContent}>
          <motion.span 
            className={styles.heroBadge}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Our Services
          </motion.span>
          
          <motion.h1 
            className={styles.heroTitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Expert Solutions for Your Business
          </motion.h1>
          
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We help businesses transform and achieve their goals through our comprehensive range of services.
          </motion.p>
          
          <motion.div
            className={styles.heroButtons}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a href="#services" className={styles.primaryButton}>
              Explore Services
            </a>
            <a href="#contact" className={styles.secondaryButton}>
              Get in Touch
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Our Comprehensive Services
            </h2>
            <p className={styles.sectionDescription}>
              Tailored solutions designed to meet your unique business needs
            </p>
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard 
                key={service.name} 
                service={service} 
                index={index}
                isExpanded={expandedCard === index}
                onToggle={() => toggleCard(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;