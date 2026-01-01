import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon,
  LightBulbIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  AcademicCapIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useInView } from 'react-intersection-observer';
// @ts-ignore - CSS Modules typings
import styles from './Home.module.css';
import AIChatbox from '../components/AIChatbox';

// Using placeholder images from Unsplash
const slide1 = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
const slide2 = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
const slide3 = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

// Types
type FeatureCardProps = {
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
  title: string;
  description: string;
  delay: number;
};

type StatItem = {
  value: number;
  label: string;
  suffix?: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(progress * value);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref} className={styles.statNumber}>{count.toLocaleString()}{suffix}</span>;
};

const FeatureCard = ({ icon: Icon, image, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={styles.featureCard}
    >
      <div className={image ? styles.featureImageContainer : styles.featureIcon}>
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover object-center"
            style={{
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
        ) : Icon ? (
          <Icon className="h-6 w-6" />
        ) : null}
      </div>
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle} style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          lineHeight: '1.4',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>{title}</h3>
        <p className={styles.featureText} style={{
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: '#6b7280',
          marginBottom: '1.5rem',
          fontWeight: '400'
        }}>{description}</p>
        <Link 
          to="/services" 
          className="mt-auto inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors group w-fit text-sm"
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#3b82f6',
            textDecoration: 'none',
            transition: 'color 0.2s ease-in-out'
          }}
        >
          Learn more
          <ArrowRightIcon className="ml-1.5 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
};

const StatCard = ({ value, label, suffix = '' }: StatItem & { suffix?: string }) => (
  <motion.div 
    className={styles.statItem}
    whileHover={{ y: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <AnimatedCounter value={value} suffix={suffix} />
    <p className={styles.statLabel}>{label}</p>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, active = false }: Testimonial & { active?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: active ? 1 : 0,
      y: active ? 0 : 20,
      scale: active ? 1 : 0.98,
      display: active ? 'block' : 'none'
    }}
    transition={{ 
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }}
    className={styles.testimonialCard}
  >
    <div className={styles.quoteIcon}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor"/>
      </svg>
    </div>
    <blockquote className={styles.testimonialContent}>
      <p className={styles.testimonialQuote}>"{quote}"</p>
      <div className={styles.testimonialFooter}>
        <div className={styles.authorAvatar}>
          {author.charAt(0)}
        </div>
        <div className={styles.authorInfo}>
          <p className={styles.testimonialAuthor}>{author}</p>
          <p className={styles.testimonialRole}>{role}</p>
        </div>
      </div>
    </blockquote>
  </motion.div>
);

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [autoPlay, setAutoPlay] = useState(true);

  const testimonials: Testimonial[] = [
    {
      quote: "Through Moledecc’s youth programs, I learned skills that go beyond academics. My confidence has skyrocketed and I now feel ready to take on leadership and entrepreneurial opportunities. This program truly transforms lives.",
      author: "Brian O.",
      role: "Student & Youth Leader"
    },
    {
      quote: "Moledecc’s workshops are unlike anything I’ve attended before. They are engaging, highly interactive and full of practical insights. I left feeling motivated, inspired and equipped with tools I immediately applied in my work.",
      author: "Michael Chen",
      role: "HR Manager"
    },
    {
      quote: "Moledecc doesn’t just provide training they create transformation. Every session I’ve attended has left me inspired, motivated and ready to take bold action. Their approach to personal and professional growth is unmatched.",
      author: "Emily Rodriguez",
      role: "Corporate Executive, Nairobi"
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setTimeout(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeTestimonial, autoPlay, testimonials.length]);
  
  const goToNextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };
  
  const goToPrevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const stats: StatItem[] = [
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 200, suffix: '+', label: 'Projects Completed' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 50, suffix: '+', label: 'Team Members' },
  ];

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Leadership Training & Workshops',
      description: 'Comprehensive leadership development programs designed to build essential skills and foster effective leadership practices through interactive workshops and hands-on training.'
    },
    {
      icon: StarIcon,
      title: 'Youth Empowerment Forums',
      description: 'Empowering young people with the skills, confidence, and opportunities to become future leaders and change-makers through targeted forums and engagement programs.'
    },
    {
      image: '/images/women.jpg',
      title: 'Women In Business & Leadership Forums',
      description: 'Supporting women in breaking barriers and achieving excellence in business and leadership roles through specialized forums and networking opportunities.'
    },
    {
      image: '/images/gbv.png',
      title: 'Governance & GBV Awareness Campaigns',
      description: 'Promoting good governance practices and raising awareness about gender-based violence prevention and response through targeted campaigns and educational initiatives.'
    },
    {
      icon: ClockIcon,
      title: 'Mentorship & Coaching Programs',
      description: 'Structured mentorship and coaching programs to support personal and professional growth through one-on-one guidance and group coaching sessions.'
    }
  ];

  // Slider data
  const slides = [
    {
      id: 1,
      title: 'Ignite Your',
      highlight: 'Leadership Potential',
      subtitle: 'Dynamic sessions to inspire confidence, strategic thinking and effective communication.',
      button1: 'Get Started',
      button2: 'Learn More',
      image: slide1
    },
    {
      id: 2,
      title: 'Unlock Your',
      highlight: 'True Potential',
      subtitle: 'Tailored mentorship and coaching to empower growth and achieve meaningful goals.',
      button1: 'Our Services',
      button2: 'View Portfolio',
      image: slide2
    },
    {
      id: 3,
      title: 'Connect, Learn',
      highlight: ', Innovate',
      subtitle: 'Engaging conferences and workshops that promote knowledge-sharing and professional growth.',
      button1: 'Contact Us',
      button2: 'Our Process',
      image: slide3
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setTimeout(() => {
      nextSlide();
    }, 7000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, isAutoPlaying, nextSlide]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider Section */}
      <section className={styles.sliderContainer}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            className={styles.sliderSlide}
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            initial={{ opacity: 0, x: direction > 0 ? '100%' : '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? '-100%' : '100%' }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className={styles.sliderOverlay}></div>
            
            {/* Content */}
            <div className={styles.sliderContent}>
              <motion.h1 
                className={styles.sliderTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slides[currentSlide].title} <span style={{ color: '#818cf8' }}>{slides[currentSlide].highlight}</span>
              </motion.h1>
              
              <motion.p 
                className={styles.sliderSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div 
                className={styles.sliderButtons}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link 
                  to="/contact" 
                  className={`${styles.sliderButton} ${styles.sliderButtonPrimary}`}
                >
                  {slides[currentSlide].button1}
                </Link>
                <Link 
                  to="/about" 
                  className={`${styles.sliderButton} ${styles.sliderButtonSecondary}`}
                >
                  {slides[currentSlide].button2}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className={`${styles.sliderArrow} ${styles.sliderArrowPrev}`}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className={`${styles.sliderArrow} ${styles.sliderArrowNext}`}
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
        
        {/* Dots Navigation */}
        <div className={styles.sliderNav}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.sliderDot} ${index === currentSlide ? styles.sliderDotActive : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">
              Empowering individuals and organizations through transformative leadership, mentorship, and capacity building initiatives.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                image={feature.image}
                title={feature.title}
                description={feature.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </section>

     {/* Testimonials Section */}
     <section className={styles.testimonials}>
       <div className="container">
         <div className={styles.testimonialsHeader}>
           <h2>What Our Clients Say</h2>
           <p>Don't just take our word for it. Here's what our clients have to say about working with us.</p>
         </div>
         
         <div className={styles.testimonialsWrapper}>
           <button 
             onClick={goToPrevTestimonial}
             className={styles.navButton}
             aria-label="Previous testimonial"
             onMouseEnter={() => setAutoPlay(false)}
             onMouseLeave={() => setAutoPlay(true)}
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </button>
           
           <div className={styles.testimonialsTrack}>
             <AnimatePresence mode="wait">
               <motion.div 
                 key={activeTestimonial}
                 className={styles.testimonialSlide}
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 exit={{ opacity: 0, x: -50, scale: 0.95 }}
                 transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
               >
                 <TestimonialCard 
                   {...testimonials[activeTestimonial]} 
                   active={true}
                 />
               </motion.div>
             </AnimatePresence>
           </div>
           
           <button 
             onClick={goToNextTestimonial}
             className={styles.navButton}
             aria-label="Next testimonial"
             onMouseEnter={() => setAutoPlay(false)}
             onMouseLeave={() => setAutoPlay(true)}
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </button>
         </div>
         
         <div className={styles.dotsContainer}>
           {testimonials.map((_, index) => (
             <button
               key={index}
               className={`${styles.dot} ${index === activeTestimonial ? styles.activeDot : ''}`}
               onClick={() => setActiveTestimonial(index)}
               onMouseEnter={() => setAutoPlay(false)}
               onMouseLeave={() => setAutoPlay(true)}
               aria-label={`View testimonial ${index + 1}`}
             />
           ))}
         </div>
       </div>
     </section>
     <AIChatbox />
   </div>
  );
};

export default Home;