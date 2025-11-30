// In Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './Navbar.module.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
          Moledecc Transformational  Initiative
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
          <Link
            to="/contact"
            className={`${styles.navLink} ${styles.ctaButton} ${styles.ctaButtonWithIcon}`}
          >
            Get in Touch
            {!isMobile && (
              <svg 
                className={styles.ctaIcon} 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </Link>
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
            <Link
              to="/contact"
              className={`${styles.mobileNavLink} ${styles.mobileCtaButton}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}