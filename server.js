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

            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+254789618945" style="
                background: #1e40af; 
                color: white; 
                padding: 12px 30px; 
                text-decoration: none; 
                border-radius: 6px; 
                display: inline-block;
                font-weight: bold;
              ">
                Call Us Now
              </a>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1e40af; margin-bottom: 15px;">Contact Information</h3>
              <p><strong>Phone:</strong> +254723463564 / +254789618945</p>
              <p><strong>Email:</strong> moledecc2@gmail.com</p>
              <p><strong>Location:</strong> Mombasa, Kenya</p>
              <p><strong>Working Hours:</strong></p>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
            </div>
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

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email service configured for ellyman2021@gmail.com`);
});
