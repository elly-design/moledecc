import { useState } from 'react';
import { XMarkIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedService }: BookingModalProps) {
  const [selectedOption, setSelectedOption] = useState(preselectedService || null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'leadership',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    { id: 'leadership', name: 'Leadership Transformation' },
    { id: 'org-coaching', name: 'Youth Empowerment Forums' },
    { id: 'mentorship', name: 'Mentorship & Capacity Building' },
    { id: 'strategy', name: 'Women in Business & Leadership Forums' },
    { id: 'other', name: 'Other (Please specify in message)' },
  ];

  const handleWhatsAppBooking = () => {
    const whatsappNumber = '254789618945';
    const message = encodeURIComponent(
      `Hello! I'd like to book an appointment with Moledecc Leadership Transformational Initiative & Associates.\n\nName: ${formData.name || 'To be provided'}\nEmail: ${formData.email || 'To be provided'}\nPhone: ${formData.phone || 'To be provided'}\n\nI'm interested in: ${services.find(s => s.id === formData.service)?.name || 'Leadership Transformation'}\n\nPreferred date: ${formData.preferredDate || 'To be discussed'}\nPreferred time: ${formData.preferredTime || 'To be discussed'}\n\nAdditional message: ${formData.message || 'N/A'}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    onClose();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          adminEmail: 'ellyman2021@gmail.com',
          senderEmail: formData.email
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to submit booking request');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedOption(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'leadership',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Book Your Consultation</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            <XMarkIcon className={styles.closeIcon} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.modalBody}>
          {!selectedOption ? (
            <div className={styles.bookingOptions}>
              <p className={styles.bookingDescription}>
                Choose how you'd like to book your consultation with Moledecc Leadership Transformational Initiative & Associates
              </p>
              
              <div className={styles.optionsGrid}>
                <button
                  onClick={() => setSelectedOption('whatsapp')}
                  className={styles.optionCard}
                >
                  <div className={styles.optionIcon}>
                    <FaWhatsapp className={styles.icon} />
                  </div>
                  <h3 className={styles.optionTitle}>Book via WhatsApp</h3>
                  <p className={styles.optionDescription}>
                    Get instant connection and quick response through WhatsApp
                  </p>
                </button>

                <button
                  onClick={() => setSelectedOption('form')}
                  className={styles.optionCard}
                >
                  <div className={styles.optionIcon}>
                    <CalendarIcon className={styles.icon} />
                  </div>
                  <h3 className={styles.optionTitle}>Book via Appointment Form</h3>
                  <p className={styles.optionDescription}>
                    Fill out a detailed form for comprehensive consultation booking
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.bookingForm}>
              {selectedOption === 'whatsapp' ? (
                <div>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>WhatsApp Booking</h3>
                    <p className={styles.formDescription}>
                      Fill in your details and we'll redirect you to WhatsApp with your booking information
                    </p>
                  </div>
                  
                  <form onSubmit={handleWhatsAppBooking} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={styles.formInput}
                          placeholder="Full names"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={styles.formInput}
                          placeholder=""
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={styles.formInput}
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Service</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className={styles.formSelect}
                        >
                          {services.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Preferred Date</label>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Preferred Time</label>
                        <input
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroupFull}>
                        <label className={styles.formLabel}>Additional Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={styles.formTextarea}
                          placeholder="Tell us more about your consultation needs..."
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <button
                        type="button"
                        onClick={() => setSelectedOption(null)}
                        className={styles.backButton}
                      >
                        Back to Options
                      </button>
                      <button
                        type="submit"
                        className={styles.submitButton}
                      >
                        Continue to WhatsApp
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Appointment Form</h3>
                    <p className={styles.formDescription}>
                      Fill out this comprehensive form and we'll get back to you within 24 hours
                    </p>
                  </div>

                  {submitStatus === 'success' && (
                    <div className={styles.successMessage}>
                      <h4>Booking Request Submitted Successfully!</h4>
                      <p>Thank you for your interest. We'll contact you within 24 hours to confirm your appointment.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className={styles.errorMessage}>
                      <h4>Submission Failed</h4>
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={styles.formInput}
                          placeholder="Full names"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={styles.formInput}
                          placeholder=""
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={styles.formInput}
                          placeholder="Phone Number"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Company/Organization</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={styles.formInput}
                          placeholder="Company/Organization name"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Service *</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className={styles.formSelect}
                          required
                          disabled={isSubmitting}
                        >
                          {services.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Preferred Date *</label>
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className={styles.formInput}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Preferred Time *</label>
                        <input
                          type="time"
                          required
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className={styles.formInput}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formGroupFull}>
                        <label className={styles.formLabel}>Additional Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={styles.formTextarea}
                          placeholder="Tell us more about your consultation needs..."
                          rows={4}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <button
                        type="button"
                        onClick={() => setSelectedOption(null)}
                        className={styles.backButton}
                        disabled={isSubmitting}
                      >
                        Back to Options
                      </button>
                      <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
