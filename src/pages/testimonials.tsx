import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import styles from '../styles/Blog.module.css';
import BookingModal from '../components/BookingModal';
import AIChatbox from '../components/AIChatbox';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  featured: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Patricia Mwangi",
    position: "Executive Director",
    company: "African Women's Leadership Initiative",
    avatar: "PM",
    content: "The Women in Business & Leadership Forums have been transformative for our organization. Our participants have reported a 75% increase in confidence and 60% have secured leadership positions within six months of completion. The facilitation and content are world-class.",
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: "James Okonkwo",
    position: "HR Director",
    company: "TechHub Africa",
    avatar: "JO",
    content: "The Leadership Training & Workshops exceeded our expectations. Our management team's effectiveness scores improved by 45% and we've seen remarkable improvements in team collaboration and decision-making processes. Highly recommended for any organization serious about leadership development.",
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: "Sarah Kamau",
    position: "Program Coordinator",
    company: "Youth Empowerment Network",
    avatar: "SK",
    content: "The Youth Empowerment Forums have created incredible impact in our communities. Over 500 young people have gained valuable skills and confidence. The engagement levels and practical outcomes have been outstanding. This program is changing lives.",
    rating: 5,
    featured: false
  },
  {
    id: 4,
    name: "Chief Inspector Grace Njeri",
    position: "Community Policing Director",
    company: "National Police Service",
    avatar: "GN",
    content: "The Governance & GBV Awareness Campaigns have been instrumental in improving community relations and awareness. We've seen a 40% increase in reported cases and improved trust between communities and law enforcement. This work is vital for our society.",
    rating: 5,
    featured: false
  },
  {
    id: 5,
    name: "Michael Thompson",
    position: "CEO",
    company: "Startup Accelerator Kenya",
    avatar: "MT",
    content: "The Mentorship & Coaching Programs have been game-changing for our startup founders. 80% of our participants have successfully scaled their businesses and secured funding. The personalized guidance and strategic support are invaluable.",
    rating: 5,
    featured: false
  },
  {
    id: 6,
    name: "Fatoumata Bah",
    position: "Regional Director",
    company: "West African Women's Network",
    avatar: "FB",
    content: "The comprehensive approach to women's empowerment through leadership forums has created a ripple effect across our region. We've established 15 new women-led businesses and countless confidence transformations. This program is building the next generation of female leaders.",
    rating: 5,
    featured: false
  }
];

export default function Testimonials() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const openBookingModal = (service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService('');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        } w-5 h-5`}
      />
    ));
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              <span>Client</span>
              <span className={styles.heroHighlight}>Success Stories</span>
            </h1>
            <p className={styles.heroDescription}>
              Hear from industry leaders who have transformed their organizations through our strategic partnership and expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <div className={styles.contentWrapper}>
        <div className={styles.testimonialsGrid}>
          <h2 className={styles.sectionTitle}></h2>
          <div className={styles.grid}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardRating}>
                    {renderStars(testimonial.rating)}
                  </div>
                  <ChatBubbleLeftRightIcon className={styles.cardQuoteIcon} />
                </div>
                
                <blockquote className={styles.cardContent}>
                  {testimonial.content}
                </blockquote>
                
                <div className={styles.cardFooter}>
                  <div className={styles.cardAuthor}>
                    <div className={styles.cardAvatar}>
                      {testimonial.avatar}
                    </div>
                    <div className={styles.cardAuthorInfo}>
                      <h4 className={styles.cardAuthorName}>
                        {testimonial.name}
                      </h4>
                      <p className={styles.cardAuthorPosition}>
                        {testimonial.position}
                      </p>
                      <p className={styles.cardAuthorCompany}>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to Write Your Success Story?</h2>
            <p className={styles.ctaDescription}>
              Join hundreds of organizations that have transformed their operations, 
              leadership and culture through our strategic partnership.
            </p>
            <div className={styles.ctaButtons}>
              <button 
                className={styles.primaryButton}
                onClick={() => openBookingModal()}
              >
                Schedule a Consultation
              </button>
              <button className={styles.secondaryButton}>
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Chatbox */}
      <AIChatbox />
    </div>
  );
}