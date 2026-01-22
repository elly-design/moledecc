// In Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import BookingModal from './BookingModal';
import styles from './Navbar.module.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const location = useLocation();

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up the event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Close mobile menu when route changes
    const unlisten = () => {
      setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unlisten();
    };
  }, [scrolled]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo} onClick={() => setMobileMenuOpen(false)}>
          <img 
            src="/images/moledecc.png" 
            alt="Moledecc Leadership Transformational Initiative & Associates"
            className={styles.logoImage}
          />
          <span style={{ 
            color: '#1e3a8a', 
            fontFamily: 'Georgia, serif', 
            fontWeight: '700', 
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            letterSpacing: '0.5px',
            marginLeft: '12px',
            textTransform: 'lowercase',
            fontVariant: 'small-caps',
            textShadow: '0px 1px 2px rgba(0,0,0,0.1)'
          }}>
            moledecc
          </span>
        </Link>

        {/* Desktop Navigation - Always visible on desktop */}
        <nav className={styles.navMenu}>
          {navigation.map((item) => (
            <Link
              key={`desktop-${item.name}`}
              to={item.href}
              className={`${styles.navLink} ${
                location.pathname === item.href ? styles.active : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => setBookingModalOpen(true)}
            className={`${styles.navLink} ${styles.ctaButton}`}
          >
            Book Appointment
          </button>
        </nav>

        {/* Mobile menu button - Only shown on mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={styles.mobileMenuButton}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className={styles.mobileMenuIcon} />
          ) : (
            <Bars3Icon className={styles.mobileMenuIcon} />
          )}
        </button>

        {/* Mobile menu overlay - Only shown on mobile */}
        {mobileMenuOpen && (
          <div 
            className={styles.mobileOverlay}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile menu - Only shown on mobile */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuContent}>
            {navigation.map((item) => (
              <Link
                key={`mobile-${item.name}`}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`${styles.mobileNavLink} ${
                  location.pathname === item.href ? styles.active : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setBookingModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className={`${styles.mobileNavLink} ${styles.mobileCtaButton}`}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </header>
  );
}