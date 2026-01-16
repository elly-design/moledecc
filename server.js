import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ellyman2021@gmail.com', // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD || 'YOUR_GMAIL_APP_PASSWORD' // Your Gmail app password
  }
});

// Contact form endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { formData, adminEmail, senderEmail } = req.body;

    // Get the selected service name
    const getServiceName = (serviceId) => {
      const services = [
        { id: 'leadership', name: 'Leadership Transformation' },
        { id: 'org-coaching', name: 'Youth Empowerment Forums' },
        { id: 'mentorship', name: 'Mentorship & Capacity Building' },
        { id: 'strategy', name: 'Women in Business & Leadership Forums' },
        { id: 'other', name: 'Other (Please specify in message)' },
      ];
      const service = services.find(s => s.id === serviceId);
      return service ? service.name : serviceId;
    };

    // Email to Admin (ellyman2021@gmail.com)
    const adminMailOptions = {
      from: `"Moledecc Website" <moledecc2@gmail.com>`,
      to: adminEmail,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0;">Moledecc Leadership Transformational Initiative & Associates</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1e40af; margin-bottom: 20px;">Contact Information</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
              <p><strong>Service:</strong> ${getServiceName(formData.service)}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1e40af; margin-bottom: 10px;">Message:</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
            </div>
              
          <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">© Moledecc Leadership Transformational Initiative & Associates</p>
            <p style="margin: 5px 0 0;">Mombasa, Kenya</p>
          </div>
        </div>
      `
    };

    // Email to Sender (Confirmation)
    const senderMailOptions = {
      from: `"Moledecc Leadership Transformation Initiative & Associates" <moledecc2@gmail.com>`,
      to: senderEmail,
      subject: 'Thank you for contacting Moledecc Leadership Transformational Initiative & Associates',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Thank You for Contacting Us</h1>
            <p style="margin: 10px 0 0;">Moledecc Leadership Transformational Initiative & Associates</p>
          </div>

          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1e40af; margin-bottom: 20px;">Dear ${formData.name},</h2>
            
            <p style="margin-bottom: 20px;">Thank you for reaching out to Moledecc Leadership Transformational Initiative & Associates. We have received your message and will get back to you shortly.</p>
            </div>
            
          <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">© Moledecc Leadership Transformational Initiative & Associates</p>
            <p style="margin: 5px 0 0;">Empowering Change, Transforming Leaders</p>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully');

    await transporter.sendMail(senderMailOptions);
    console.log('Sender confirmation email sent successfully');

    res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message 
    });
  }
});

// Booking form endpoint
app.post('/api/book-appointment', async (req, res) => {
  try {
    const { formData, adminEmail, senderEmail } = req.body;

    // Get the selected service name
    const getServiceName = (serviceId) => {
      const services = [
        { id: 'leadership', name: 'Leadership Transformation' },
        { id: 'org-coaching', name: 'Youth Empowerment Forums' },
        { id: 'mentorship', name: 'Mentorship & Capacity Building' },
        { id: 'strategy', name: 'Women in Business & Leadership Forums' },
        { id: 'other', name: 'Other (Please specify in message)' },
      ];
      const service = services.find(s => s.id === serviceId);
      return service ? service.name : serviceId;
    };

    // Email to Admin (ellyman2021@gmail.com)
    const adminMailOptions = {
      from: `"Moledecc Website" <moledecc2@gmail.com>`,
      to: adminEmail,
      subject: `New Appointment Booking Request from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Appointment Booking Request</h1>
            <p style="margin: 10px 0 0;">Moledecc Leadership Transformational Initiative & Associates</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1e40af; margin-bottom: 20px;">Appointment Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
              <p><strong>Service:</strong> ${getServiceName(formData.service)}</p>
              <p><strong>Preferred Date:</strong> ${formData.preferredDate}</p>
              <p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1e40af; margin-bottom: 10px;">Additional Message:</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${formData.message || 'No additional message provided'}</p>
            </div>
              
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please contact the client to confirm the appointment details.</p>
            </div>
          </div>
          
          <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">© Moledecc Leadership Transformational Initiative & Associates</p>
            <p style="margin: 5px 0 0;">Mombasa, Kenya</p>
          </div>
        </div>
      `
    };

    // Email to Sender (Confirmation)
    const senderMailOptions = {
      from: `"Moledecc Leadership Transformation Initiative & Associates" <moledecc2@gmail.com>`,
      to: senderEmail,
      subject: 'Appointment Booking Request Received - Moledecc Leadership Transformational Initiative & Associates',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Appointment Booking Request Received</h1>
            <p style="margin: 10px 0 0;">Moledecc Leadership Transformational Initiative & Associates</p>
          </div>

          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1e40af; margin-bottom: 20px;">Dear ${formData.name},</h2>
            
            <p style="margin-bottom: 20px;">Thank you for your interest in booking an appointment with Moledecc Leadership Transformational Initiative & Associates. Our team is reviewing your submission and will be in touch to confirm your appointment details.</p>
            
          <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">© Moledecc Leadership Transformational Initiative & Associates</p>
            <p style="margin: 5px 0 0;">Empowering Change, Transforming Leaders</p>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    console.log('Admin booking email sent successfully');

    await transporter.sendMail(senderMailOptions);
    console.log('Sender booking confirmation email sent successfully');

    res.status(200).json({ 
      success: true, 
      message: 'Booking request submitted successfully' 
    });

  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit booking request',
      error: error.message 
    });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email service configured for ellyman2021@gmail.com`);
});
