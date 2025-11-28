import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  UserGroupIcon, 
  LightBulbIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CalendarIcon,
  FolderIcon,
  StarIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import styles from './Services.module.css';

const services = [
  {
    name: 'Leadership Transformation',
    description: 'Develop and empower leaders at all levels to drive organizational success through strategic vision and effective execution.',
    icon: UserGroupIcon,
    features: [
      'Executive Coaching',
      'Leadership Development Programs',
      'Succession Planning',
      'Team Alignment',
      'Change Management'
    ],
    color: 'bg-[#005B99]',
    textColor: 'text-[#005B99]'
  },
  {
    name: 'Organizational Coaching',
    description: 'Transform your organization\'s culture and performance through targeted coaching interventions and strategic alignment.',
    icon: LightBulbIcon,
    features: [
      'Cultural Transformation',
      'Performance Optimization',
      'Talent Development',
      'Employee Engagement',
      'Organizational Design'
    ],
    color: 'bg-[#00AEEF]',
    textColor: 'text-[#00AEEF]'
  },
  {
    name: 'Strategic Planning & Execution',
    description: 'Develop clear, actionable strategies and ensure successful implementation to achieve your business objectives.',
    icon: ChartBarIcon,
    features: [
      'Strategic Planning Workshops',
      'Business Model Innovation',
      'Market Analysis',
      'Execution Roadmaps',
      'Performance Metrics'
    ],
    color: 'bg-[#003366]',
    textColor: 'text-[#003366]'
  },
  {
    name: 'Mentorship & Capacity Building',
    description: 'Build organizational capabilities through structured mentorship and professional development programs.',
    icon: ClockIcon,
    features: [
      'Mentorship Programs',
      'Skills Development',
      'Knowledge Transfer',
      'Leadership Pipeline',
      'Professional Growth'
    ],
    color: 'bg-[#004D82]',
    textColor: 'text-[#004D82]'
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconSize = 22; // Standard icon size in pixels

  return (
    <motion.div
      key={service.name}
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${service.color}`}>
          <service.icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className={styles.cardChevron}>
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{service.name}</h3>
        <p className={styles.cardDescription}>{service.description}</p>
        
        <ul className={styles.featureList}>
          {service.features.map((feature) => (
            <motion.li 
              key={feature} 
              className={styles.featureItem}
              whileHover={{ x: 4 }}
            >
              <CheckCircleIcon 
                className={`${styles.featureIcon} ${service.textColor}`} 
                aria-hidden="true"
              />
              <span className={styles.featureText}>
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      <div className={styles.cardFooter}>
        <Link to="/contact" className={styles.learnMoreLink}>
          Learn more about {service.name.split(' ')[0].toLowerCase()}
          <ArrowRightIcon className={`${styles.learnMoreIcon} ml-2`} />
        </Link>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className={styles.servicesContainer}>
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"></div>
          
          {/* Floating Circles */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:bg-blue-900/30"></div>
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:bg-indigo-900/30"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:bg-purple-900/30"></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 text-center lg:text-left"
              >
                {/* Badge */}
                <motion.span 
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Transform Your Business
                </motion.span>
                
                {/* Main Heading */}
                <div className="space-y-4">
                  <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                      Innovative
                    </span>{' '}
                    <span className="text-gray-800 dark:text-gray-200">Solutions for</span>{' '}
                    <span className="relative inline-block">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        Modern Businesses
                      </span>
                      <span className="absolute bottom-2 left-0 w-full h-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 -z-10 rounded-full"></span>
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Transform your business with our cutting-edge solutions. We deliver exceptional results through innovation, strategy, and technical excellence.
                  </motion.p>
                </div>

                {/* Call to Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link 
                    to="/contact" 
                    className="group relative inline-flex items-center justify-center px-6 py-3.5 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform-gpu"
                  >
                    <span className="relative z-10 flex items-center text-base">
                      Get Started
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                  </Link>
                  <Link 
                    to="/about" 
                    className="group inline-flex items-center justify-center px-6 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-base font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-gray-800/70 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center">
                      Learn More
                      <ChevronRightIcon className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Features Grid */}
              <motion.div 
                className="pt-8 border-t border-gray-100 dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-5">Why choose us?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[ 
                    { 
                      title: 'Industry Expertise',
                      description: 'Deep knowledge across multiple sectors',
                      icon: <LightBulbIcon className="h-5 w-5 text-blue-500" />,
                      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
                      delay: 0.1
                    },
                    { 
                      title: 'Proven Results',
                      description: 'Delivering measurable impact',
                      icon: <ChartBarIcon className="h-5 w-5 text-emerald-500" />,
                      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
                      delay: 0.2
                    },
                    { 
                      title: 'Client-Focused',
                      description: 'Your success is our priority',
                      icon: <UserGroupIcon className="h-5 w-5 text-purple-500" />,
                      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                      delay: 0.3
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                      whileHover={{ y: -4, boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)' }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${item.bgColor}`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Visual Element */}
        <motion.div 
          className="relative lg:pl-12"
          initial={{ opacity: 0, x: 30, rotate: 2 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            rotate: 0,
            transition: { 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }
          }}>
              {/* Service Cards Container */}
              <div className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Our Services</h3>
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {services.slice(0, 3).map((service, index) => (
                      <motion.div 
                        key={index}
                        className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                        whileHover={{ 
                          y: -4,
                          borderColor: 'rgba(99, 102, 241, 0.3)',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)'
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg shadow-inner">
                            <service.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{service.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {service.description.split(' ').slice(0, 12).join(' ')}...
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-100/50 dark:bg-blue-900/10 rounded-full filter blur-3xl -z-10 animate-blob animation-delay-1000"></div>
              <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-purple-100/40 dark:bg-purple-900/10 rounded-full filter blur-3xl -z-10 animate-blob animation-delay-2000"></div>
              
              {/* Stats with Visual Emphasis */}
              <motion.div 
                className="mt-12 lg:mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 className="text-center text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
                      Trusted by Industry Leaders
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { 
                          number: '10+', 
                          label: 'Years Experience',
                          icon: <CalendarIcon className="h-4 w-4 text-blue-500" />,
                          delay: 0.1
                        },
                        { 
                          number: '500+', 
                          label: 'Projects',
                          icon: <FolderIcon className="h-4 w-4 text-emerald-500" />,
                          delay: 0.2
                        },
                        { 
                          number: '98%', 
                          label: 'Satisfaction',
                          icon: <StarIcon className="h-4 w-4 text-amber-500" />,
                          delay: 0.3
                        },
                        { 
                          number: '24/7', 
                          label: 'Global',
                          icon: <GlobeAltIcon className="h-4 w-4 text-purple-500" />,
                          delay: 0.4
                        }
                      ].map((stat, index) => (
                        <motion.div 
                          key={index}
                          className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                          whileHover={{ y: -4, boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)' }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                              {stat.icon}
                            </div>
                            <div>
                              <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce w-8 h-14 rounded-full border-2 border-cyan-400/50 flex justify-center items-start p-2">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>
      
      {/* Global styles for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(0) translateX(20px); }
            75% { transform: translateY(20px) translateX(10px); }
          }
          @keyframes gridMove {
            from { background-position: 0 0; }
            to { background-position: 40px 40px; }
          }
          @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
          }
          .animate-float { animation: float 12s ease-in-out infinite; }
          .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
          .animate-blob { animation: blob 7s infinite; }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-3000 { animation-delay: 3s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}
      </style>
    </div>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>Our Expertise</span>
              <h2 className={styles.sectionTitle}>
                Transformative Services for <span className="gradient-text">Your Organization</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Tailored solutions designed to address your unique challenges and unlock new opportunities for growth and innovation.
              </p>
            </div>
          </motion.div>

          <div className="services-wrapper">
            <AnimatePresence>
              {services.map((service, index) => (
                <ServiceCard key={service.name} service={service} index={index} />
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            className="cta-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>Don't see exactly what you're looking for? We customize our approach for every client.</p>
            <Link to="/contact" className="cta-button">
              Let's discuss your needs
              <ArrowRightIcon className="icon" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Methodology</span>
            <h2>A Proven Approach to <span className="gradient-text">Delivering Results</span></h2>
            <p>We follow a structured yet flexible methodology to ensure your success</p>
          </div>

          <div className="timeline">
            {[
              {
                icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
                title: 'Discovery & Assessment',
                description: 'We begin by thoroughly understanding your organization\'s unique challenges, opportunities, and goals through comprehensive assessments.'
              },
              {
                icon: <WrenchScrewdriverIcon className="h-5 w-5" />,
                title: 'Customized Solutions',
                description: 'Our team designs tailored strategies and interventions that align with your specific needs, culture, and business objectives.'
              },
              {
                icon: <RocketLaunchIcon className="h-5 w-5" />,
                title: 'Implementation & Support',
                description: 'We work alongside your team to ensure smooth implementation, providing ongoing support and resources for sustainable success.'
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="timeline-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="step-number">0{index + 1}</div>
                <div className="step-content">
                  <div className="step-icon">
                    {step.icon}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="cta-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>Ready to transform your organization? Let's discuss how we can help you achieve your goals.</p>
            <div className="button-group">
              <Link to="/contact" className="primary-button">
                Get Started with a Consultation
              </Link>
              <Link to="/about" className="secondary-button">
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        
        /* Buttons */
        .primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          color: white;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
        }
        
        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        }
        
        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 500;
          color: #3b82f6;
          background: white;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .secondary-button:hover {
          background-color: #f9fafb;
          border-color: #d1d5db;
        }
        
        /* Timeline styles */
        .timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, #e0f2fe, #a5f3fc, #e0f2fe);
        }
        
        .timeline-step {
          position: relative;
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
          font-weight: 600;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .step-content {
          background: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 500px;
          position: relative;
          border: 1px solid #e5e7eb;
        }
        
        .step-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
          margin-bottom: 1rem;
        }
        
        .step-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        
        .step-content p {
          color: #4b5563;
          line-height: 1.6;
        }
        
        /* Responsive adjustments */
        @media (min-width: 768px) {
          .timeline-step {
            flex-direction: row;
            justify-content: center;
          }
          
          .step-number {
            margin: 0 2rem 0 0;
          }
          
          .step-content {
            margin: 0 2rem;
          }
          
          .timeline-step:nth-child(even) {
            flex-direction: row-reverse;
          }
          
          .timeline-step:nth-child(even) .step-number {
            margin: 0 0 0 2rem;
          }
        }
        
        /* Container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        /* Section header */
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
        }
        
        .section-tag {
          display: inline-block;
          background: #e0f2fe;
          color: #0369a1;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.375rem 1rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }
        
        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1.25rem;
          line-height: 1.2;
        }
        
        .section-header p {
          font-size: 1.125rem;
          color: #4b5563;
          line-height: 1.6;
        }
        
        /* CTA section */
        .cta-section {
          text-align: center;
          margin-top: 4rem;
        }
        
        .cta-section p {
          font-size: 1.125rem;
          color: #4b5563;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }
        
        @media (min-width: 640px) {
          .button-group {
            flex-direction: row;
            justify-content: center;
            max-width: none;
          }
        }
        
        /* Services grid */
        .services-wrapper {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 768px) {
          .services-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Icons */
        .icon {
          width: 1.25rem;
          height: 1.25rem;
          margin-left: 0.5rem;
          transition: transform 0.2s ease;
        }
        
        .cta-button:hover .icon {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

