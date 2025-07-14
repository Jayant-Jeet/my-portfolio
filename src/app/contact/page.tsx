'use client';

import React from 'react';
import Image from "next/image";
import { GlareCard } from "../../components/ui/glare-card";
import Navbar from "../../components/navbar";

function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    try {
      // Send email via API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form safely
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
      
      // Reset form safely
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Navbar />

      <main className="contact-main" style={{ 
        padding: '2rem', 
        paddingTop: '100px', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <div className="contact-container">
          
          {/* Left Column - Hero Image and Social Links */}
          <div className="contact-left-column" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                fontWeight: 'bold',
                color: 'var(--foreground)',
                textAlign: 'center'
              }}>
                Get In <span className="gradient-text">Touch</span>
              </h1>
              <p style={{
                fontSize: '1rem',
                color: 'var(--foreground)',
                opacity: '0.8',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                Let&apos;s work together on something amazing!
              </p>
            </div>

            <div className="hero-image">
              <GlareCard>
                <Image 
                  src="/profile.png" 
                  alt="Jayant Jeet Tomar" 
                  width={280} 
                  height={280} 
                  style={{ 
                    borderRadius: '8px', 
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                />
              </GlareCard>
            </div>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
              maxWidth: '300px'
            }}>
              <h3 style={{
                color: 'var(--teal)',
                marginBottom: '0.5rem',
                textAlign: 'center'
              }}>
                I&apos;m most active via email, but feel free to schedule a quick call via Cal.com.
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <a 
                  href="https://github.com/Jayant-Jeet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(253, 255, 252, 0.1)',
                    border: '1px solid rgba(46, 196, 182, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Image 
                    src="/github.svg" 
                    alt="GitHub" 
                    width={24} 
                    height={24} 
                  />
                </a>

                <a 
                  href="https://linkedin.com/in/jjtomar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(253, 255, 252, 0.1)',
                    border: '1px solid rgba(46, 196, 182, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Image 
                    src="/linkedin.svg" 
                    alt="LinkedIn" 
                    width={24} 
                    height={24} 
                  />
                </a>

                <a 
                  href="mailto:jayant.jeet.tomar.me@gmail.com"
                  className="social-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(253, 255, 252, 0.1)',
                    border: '1px solid rgba(46, 196, 182, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                <a 
                  href="https://cal.com/jjtomar/15min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(253, 255, 252, 0.1)',
                    border: '1px solid rgba(46, 196, 182, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-right-column card" style={{
            padding: '1rem'
          }}>
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div>
                <label 
                  htmlFor="name"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--teal)',
                    fontWeight: '600'
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(253, 255, 252, 0.05)',
                    border: '1px solid rgba(46, 196, 182, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'var(--foreground)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  className="contact-input"
                />
              </div>

              <div>
                <label 
                  htmlFor="email"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--teal)',
                    fontWeight: '600'
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(253, 255, 252, 0.05)',
                    border: '1px solid rgba(46, 196, 182, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'var(--foreground)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  className="contact-input"
                />
              </div>

              <div>
                <label 
                  htmlFor="message"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--teal)',
                    fontWeight: '600'
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project or just say hello..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(253, 255, 252, 0.05)',
                    border: '1px solid rgba(46, 196, 182, 0.3)',
                    borderRadius: '0.5rem',
                    color: 'var(--foreground)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    minHeight: '100px',
                    transition: 'all 0.3s ease'
                  }}
                  className="contact-input"
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '0.5rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(46, 196, 182, 0.1)',
                  border: '1px solid rgba(46, 196, 182, 0.3)',
                  borderRadius: '0.5rem',
                  color: 'var(--teal)'
                }}>
                  ✅ Thank you for your message! I will get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ef4444'
                }}>
                  ❌ {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;
