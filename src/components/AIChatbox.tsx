import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, XMarkIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm here to help with any questions about our services.",
        "That's a great question! Let me find that information for you.",
        "I can assist you with program details, registration, and more.",
        "Thanks for your interest! How can I help you today?",
        "I'm happy to provide more information about our training programs."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simple pulse animation style
  const pulseStyle = {
    animation: 'pulse 2s infinite',
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)'
  };

  // Create a style element for the pulse animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50 }}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              width: '20rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '32rem'
            }}
          >
            {/* Header */}
            <div style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>AI Assistant</h3>
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '0.25rem',
                  borderRadius: '9999px',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Close chat"
              >
                <XMarkIcon style={{ height: '1.25rem', width: '1.25rem' }} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              backgroundColor: '#f9fafb',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    width: '100%'
                  }}
                >
                  <div 
                    style={{
                      maxWidth: '80%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: message.isUser ? '#2563eb' : 'white',
                      color: message.isUser ? 'white' : 'black',
                      border: message.isUser ? 'none' : '1px solid #e5e7eb',
                      borderBottomRightRadius: message.isUser ? '0' : '0.5rem',
                      borderBottomLeftRadius: message.isUser ? '0.5rem' : '0',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSendMessage}
              style={{
                padding: '1rem',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: 'white'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem 0 0 0.375rem',
                    padding: '0.5rem 1rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    borderRight: 'none',
                    fontSize: '0.875rem'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#93c5fd';
                    e.target.style.boxShadow = '0 0 0 3px rgba(147, 197, 253, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button 
                  type="submit"
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '0 0.375rem 0.375rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }}
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon style={{ height: '1.25rem', width: '1.25rem' }} />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              ...pulseStyle
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              scale: { type: 'spring', stiffness: 300, damping: 20 }
            }}
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '1rem',
              borderRadius: '9999px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              animation: 'pulse 2s infinite'
            }}
            aria-label="Open chat"
          >
            <ChatBubbleBottomCenterTextIcon style={{ height: '2rem', width: '2rem' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatbox;
