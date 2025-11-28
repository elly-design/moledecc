import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon, TagIcon } from '@heroicons/react/24/outline';
import styles from '../styles/Blog.module.css';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
};

const blogPosts: BlogPost[] = [
  // ... (keep the existing blogPosts array)
];

const categories = [
  'All',
  'Leadership',
  'Organizational Development',
  'Digital Transformation',
  'Innovation',
  'Future of Work',
  'Strategy'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              <span>Insights &</span>
              <span className={styles.heroHighlight}>Thought Leadership</span>
            </h1>
            <p className={styles.heroDescription}>
              Expert perspectives on leadership, transformation, and organizational excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <div className={styles.contentWrapper}>
        {/* Search and Filter */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchInput}>
              <div className={styles.searchIcon}>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className={styles.searchField}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.filterContainer}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${styles.filterButton} ${
                    selectedCategory === category ? styles.filterButtonActive : styles.filterButtonInactive
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className={styles.featuredContainer}>
            <h2 className={styles.sectionTitle}>Featured Article</h2>
            <motion.article 
              className={styles.featuredCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                className={styles.featuredImage}
                src={filteredPosts[0].image} 
                alt={filteredPosts[0].title} 
              />
              <div className={styles.featuredContent}>
                <span className={styles.categoryBadge}>{filteredPosts[0].category}</span>
                <h3 className={styles.featuredTitle}>{filteredPosts[0].title}</h3>
                <p className={styles.featuredExcerpt}>{filteredPosts[0].excerpt}</p>
                
                <div className={styles.authorContainer}>
                  <div className={styles.authorAvatar}>
                    {filteredPosts[0].author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={styles.authorInfo}>
                    <p className={styles.authorName}>{filteredPosts[0].author}</p>
                    <div className={styles.metaInfo}>
                      <span className={styles.metaItem}>
                        <CalendarIcon className={styles.metaIcon} />
                        {filteredPosts[0].date}
                      </span>
                      <span className={styles.metaItem}>
                        <ClockIcon className={styles.metaIcon} />
                        {filteredPosts[0].readTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <a href={`/blog/${filteredPosts[0].id}`} className={styles.readMore}>
                  Read full article
                  <ArrowRightIcon className={styles.readMoreIcon} />
                </a>
              </div>
            </motion.article>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className={styles.postsContainer}>
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
          {filteredPosts.length > 0 ? (
            <div className={styles.postsGrid}>
              {filteredPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  className={styles.postCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <img 
                    className={styles.postImage}
                    src={post.image} 
                    alt={post.title} 
                  />
                  <div className={styles.postContent}>
                    <span className={styles.postCategory}>{post.category}</span>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    
                    <div className={styles.tagsContainer}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          <TagIcon className={styles.tagIcon} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className={styles.authorContainer}>
                      <div className={styles.authorAvatar}>
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={styles.authorInfo}>
                        <p className={styles.authorName}>{post.author}</p>
                        <div className={styles.metaInfo}>
                          <span className={styles.metaItem}>
                            <CalendarIcon className={styles.metaIcon} />
                            {post.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterCard}>
            <h2 className={styles.newsletterTitle}>Stay Updated</h2>
            <p className={styles.newsletterDescription}>
              Subscribe to our newsletter for the latest insights and articles delivered to your inbox.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
            <p className={styles.newsletterNote}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}