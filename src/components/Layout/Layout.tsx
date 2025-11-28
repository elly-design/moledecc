import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  BriefcaseIcon, 
  EnvelopeIcon,
  XMarkIcon,
  Bars3Icon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon as ChatIcon,
  ArrowRightIcon,
  ShareIcon,
  AtSymbolIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const navItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'About', path: '/about', icon: UserGroupIcon },
  { name: 'Services', path: '/services', icon: BriefcaseIcon },
  { name: 'Projects', path: '/projects', icon: DocumentTextIcon },
  { name: 'Blog', path: '/blog', icon: DocumentTextIcon },
  { name: 'Contact', path: '/contact', icon: EnvelopeIcon },
];

const socialLinks = [
  { name: 'Facebook', icon: ShareIcon, href: '#' },
  { name: 'Twitter', icon: AtSymbolIcon, href: '#' },
  { name: 'LinkedIn', icon: LinkIcon, href: '#' },
  { name: 'Instagram', icon: ShareIcon, href: '#' },
];

const contactInfo = [
  { 
    icon: EnvelopeIcon, 
    text: 'info@moledec.com',
    href: 'mailto:info@moledec.com'
  },
  { 
    icon: PhoneIcon, 
    text: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  { 
    icon: MapPinIcon, 
    text: '123 Business Ave, Suite 100, New York, NY 10001',
    href: 'https://maps.google.com'
  },
  { 
    icon: ClockIcon, 
    text: 'Mon - Fri: 9:00 AM - 6:00 PM'
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>MOLEDECC</span>
          </Link>
          
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.name} className={styles.navItem}>
                  <Link 
                    to={item.path} 
                    className={`${styles.navLink} ${location.pathname === item.path ? styles.navLinkActive : ''}`}
                  >
                    <item.icon className={styles.navIcon} aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
              <li className={styles.ctaContainer}>
                <Link to="/contact" className={styles.ctaButton}>
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
          
          <button 
            type="button" 
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <XMarkIcon className={styles.menuIcon} />
            ) : (
              <Bars3Icon className={styles.menuIcon} />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <Link to="/" className={styles.footerLogo}>MOLEDECC</Link>
              <p className={styles.footerDescription}>
                Empowering organizations through strategic transformation and leadership excellence.
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.name}
                  >
                    <social.icon className={styles.socialIcon} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className={styles.footerLinks}>
              <div className={styles.footerLinksColumn}>
                <h3 className={styles.footerLinksTitle}>Company</h3>
                <ul className={styles.footerLinksList}>
                  {navItems.slice(1).map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className={styles.footerLink}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.footerLinksColumn}>
                <h3 className={styles.footerLinksTitle}>Legal</h3>
                <ul className={styles.footerLinksList}>
                  <li><Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
                  <li><Link to="/terms" className={styles.footerLink}>Terms of Service</Link></li>
                  <li><Link to="/cookies" className={styles.footerLink}>Cookie Policy</Link></li>
                </ul>
              </div>
              
              <div className={styles.footerContact}>
                <h3 className={styles.footerLinksTitle}>Contact Us</h3>
                <ul className={styles.contactList}>
                  {contactInfo.map((item, index) => (
                    <li key={index} className={styles.contactItem}>
                      <item.icon className={styles.contactIcon} aria-hidden="true" />
                      {item.href ? (
                        <a href={item.href} className={styles.contactLink}>
                          {item.text}
                        </a>
                      ) : (
                        <span className={styles.contactText}>{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} MoleDec. All rights reserved.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="GitHub">
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
