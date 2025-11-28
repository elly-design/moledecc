import React from 'react';
import styles from './Journey.module.css';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const Journey = () => {
  const milestones = [
    {
      year: '2007',
      title: 'Foundation',
      description: 'Established with a vision to revolutionize the industry through innovation and excellence.',
      position: 'left'
    },
    {
      year: '2012',
      title: 'First Major Breakthrough',
      description: 'Launched our flagship product, setting new industry standards and gaining recognition.',
      position: 'right'
    },
    {
      year: '2015',
      title: 'Global Expansion',
      description: 'Expanded operations to three continents, establishing a strong international presence.',
      position: 'left'
    },
    {
      year: '2018',
      title: 'Innovation Award',
      description: 'Received the prestigious Innovation Excellence Award for our groundbreaking solutions.',
      position: 'right'
    },
    {
      year: '2022',
      title: 'New Headquarters',
      description: 'Moved to our state-of-the-art headquarters, designed for collaboration and innovation.',
      position: 'left'
    }
  ];

  const achievements = [
    {
      icon: <Award className={styles.achievementIcon} />,
      title: 'Award-Winning',
      description: 'Recognized with 15+ industry awards for excellence and innovation'
    },
    {
      icon: <Users className={styles.achievementIcon} />,
      title: 'Global Community',
      description: 'Serving 10,000+ clients across 50+ countries worldwide'
    },
    {
      icon: <Globe className={styles.achievementIcon} />,
      title: 'Sustainable Growth',
      description: '500% growth in revenue while maintaining our commitment to sustainability'
    },
    {
      icon: <TrendingUp className={styles.achievementIcon} />,
      title: 'Industry Leader',
      description: 'Ranked among the top 10 companies in our sector for three consecutive years'
    }
  ];

  return (
    <section className={styles.journey} id="journey">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Journey</h2>
          <p className={styles.sectionSubtitle}>Milestones & Achievements: Key moments that have shaped our journey</p>
        </div>

        <div className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={`${styles.milestone} ${milestone.position === 'left' ? styles.milestoneLeft : styles.milestoneRight}`}
            >
              <div className={styles.milestoneContent}>
                <div className={styles.year}>{milestone.year}</div>
                <h3 className={styles.title}>{milestone.title}</h3>
                <p className={styles.description}>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.achievements}>
          <h2 className={styles.achievementsTitle}>Our Growth Story</h2>
          <p className={styles.achievementsSubtitle}>Key Achievements that Shaped the Moledecc Vision</p>
          
          <div className={styles.achievementGrid}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievementCard}>
                {achievement.icon}
                <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                <p className={styles.achievementDescription}>{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
