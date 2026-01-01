import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import styles from './Contact.module.css';

// Custom components to handle boolean attributes
const MotionDiv = motion.create('div');
const MotionSection = motion.create('section');
const MotionH1 = motion.create('h1');
const MotionP = motion.create('p');

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

const services = [
  { id: 'leadership', name: 'Leadership Transformation' },
  { id: 'org-coaching', name: 'Organizational Coaching' },
  { id: 'mentorship', name: 'Mentorship & Capacity Building' },
  { id: 'strategy', name: 'Strategic Planning & Execution' },
  { id: 'other', name: 'Other (Please specify in message)' },
];

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: '',
      description: '+254723463564\n+254789618945',
      href: 'tel:+254723463564'
    },
    {
      icon: EnvelopeIcon,
      title: '',
      description: 'moledecc2@gmail.com',
      href: 'mailto:moledecc2@gmail.com'
    },
    {
      icon: MapPinIcon,
      title: '',
      description: 'Mombasa, Kenya',
      href: 'https://maps.google.com'
    },
    {
      icon: ClockIcon,
      title: 'Working Hours',
      description: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM',
      href: ''
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <MotionSection 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroContent}>
          <MotionH1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </MotionH1>
          <MotionP 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We'd love to hear from you. Let's start a conversation about how we can help your organization thrive.
          </MotionP>
        </div>
      </MotionSection>

      {/* Contact Content */}
      <MotionDiv 
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Information */}
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {contactInfo.map((info, index) => (
                <MotionDiv 
                  key={info.title || `contact-${index}`}
                  variants={itemVariants}
                  className={styles.infoCard}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.infoIcon}>
                    <info.icon className="h-6 w-6" />
                  </div>
                  <h3 className={styles.infoTitle}>{info.title}</h3>
                  <p className={styles.infoText} style={{ whiteSpace: 'pre-line' }}>{info.description}</p>
                  {info.href && (
                    <a 
                      href={info.href} 
                      className={styles.infoLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={info.title}
                    >
                      {info.title}
                    </a>
                  )}
                </MotionDiv>
              ))}
            </MotionDiv>

            {/* Contact Form */}
            {isSubmitted ? (
              <MotionDiv 
                className={styles.successMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.successIcon}>
                  <CheckCircleIcon />
                </div>
                <h2 className={styles.successTitle}>Message Sent Successfully!</h2>
                <p className={styles.successText}>
                  Thank you for reaching out to us. We've received your message and will get back to you within 24-48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className={styles.submitButton}
                >
                  Send Another Message
                </button>
              </MotionDiv>
            ) : (
              <MotionDiv 
                className={styles.contactForm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className={styles.formTitle}>Send us a message</h2>
                <p className={styles.formDescription}>
                  Have questions about our services or want to discuss how we can help your organization? 
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${styles.formControl} ${errors.name ? 'border-red-300' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className={styles.errorMessage}>{errors.name}</p>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${styles.formControl} ${errors.email ? 'border-red-300' : ''}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className={styles.errorMessage}>{errors.email}</p>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.formControl}
                        placeholder="+254723463564"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="company" className={styles.formLabel}>
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={styles.formControl}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="service" className={styles.formLabel}>
                      How can we help you?
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={styles.formControl}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${styles.formControl} ${styles.formTextarea} ${errors.message ? 'border-red-300' : ''}`}
                      placeholder="How can we assist you today?"
                    />
                    {errors.message && (
                      <p className={styles.errorMessage}>{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </MotionDiv>
            )}
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

// Export the component with proper type
export default Contact as React.FC;