import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
  CameraIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

// TikTok Icon component
const TiktokIcon = ({ className = 'w-5 h-5' }) => (
  <svg 
    className="w-6 h-6" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.26 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-2.99.37-.83.59-1.38 1.55-1.38 2.56 0 1.72 1.39 3.11 3.1 3.11.28 0 .56-.03.83-.08.71-.14 1.4-.58 1.85-1.15.23-.29.44-.6.58-.94.36-.8.45-1.7.45-2.56.01-4.51.01-9.02.01-13.54z"/>
  </svg>
);

// Facebook Icon component
const FacebookIcon = ({ className = 'w-5 h-5' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

// X (Twitter) Icon component
const XIcon = ({ className = 'w-5 h-5' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

// Instagram Icon component
const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.987 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
import styles from './Footer.module.css';

const navigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Case Studies', href: '/projects' },
    { name: 'Careers', href: '/careers' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' },
  ],
  contact: [
    {
      icon: PhoneIcon,
      text: '+254723463564',
      href: 'tel:+254723463564',
    },
    {
      icon: EnvelopeIcon,
      text: 'moledecc2@gmail.com',
      href: 'mailto:moledecc2@gmail.com',
    },
    {
      icon: MapPinIcon,
      text: 'Mombasa, Kenya',
      subtext: 'Mombasa, Kenya',
      href: 'https://maps.google.com',
    },
    {
      icon: ClockIcon,
      text: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    icon: FacebookIcon,
    href: 'https://facebook.com/moledecc',
    color: '#1877F2',
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    href: 'https://instagram.com/moledecc',
    color: '#E4405F',
  },
  {
    name: 'X',
    icon: XIcon,
    href: 'https://x.com/moledecc',
    color: '#000000',
  },
  {
    name: 'TikTok',
    icon: TiktokIcon,
    href: 'https://tiktok.com/@moledecc',
    color: '#000000',
  },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand and Social Section */}
          <div className={styles.brandSection}>
            <div className={styles.brandContent}>
              <Link to="/" className={styles.footerLogo}>
                <img 
                  src="/images/moledecc.png" 
                  alt="Moledecc Leadership Transformational Initiative & Associates"
                  className={styles.footerLogoImage}
                />
              </Link>
              <Link to="/" className={styles.logo}>
                Moledecc Leadership Transformational Initiative & Associates
              </Link>
              <p className={styles.tagline}>
                Empowering Change, Transforming Leaders.
              </p>
            </div>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-social={social.name.toLowerCase()}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className={styles.navGrid}>
            <div className={styles.navSection}>
              <h4 className={styles.navTitle}>Company</h4>
              <ul className={styles.navList}>
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className={styles.navLink}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.navSection}>
              <h4 className={styles.navTitle}>Resources</h4>
              <ul className={styles.navList}>
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className={styles.navLink}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.contactSection}>
              <h4 className={styles.navTitle}>Contact Us</h4>
              <ul className={styles.contactList}>
                {navigation.contact.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className={styles.contactItem}>
                      <Icon className={styles.contactIcon} aria-hidden="true" />
                      <div>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            className={`${styles.contactText} ${styles.contactLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className={styles.contactText}>
                            {item.text}
                          </span>
                        )}
                        {item.subtext && (
                          <div className={styles.contactSubtext}>
                            {item.subtext}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <p className={styles.copyright}>
            &copy; {currentYear} MOLEDECC. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            {legalLinks.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link
                  to={item.href}
                  className={styles.legalLink}
                >
                  {item.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className={styles.legalSeparator}>•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
