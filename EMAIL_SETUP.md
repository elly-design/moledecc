# Email Setup Guide for Moledecc Contact Form

This guide will help you set up the contact form to send emails using Nodemailer with Gmail App Password.

## Prerequisites

1. Gmail account (ellyman2021@gmail.com)
2. Node.js installed on your system
3. Project dependencies installed

## Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Step Verification if not already enabled
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password:
   - Select "Mail" for the app
   - Select "Other (Custom name)" and enter "Moledecc Website"
   - Copy the generated 16-character password

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and add your Gmail app password:
   ```
   GMAIL_APP_PASSWORD=your_16_character_app_password_here
   PORT=3001
   ```

## Step 3: Install Dependencies

Install the required packages:
```bash
npm install
```

## Step 4: Run the Application

### Development Mode (Recommended)

Run both frontend and backend:

1. Start the backend server:
   ```bash
   npm run server
   ```

2. In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

### Production Mode

Build and run the production version:
```bash
npm run start
```

## Step 5: Test the Contact Form

1. Navigate to the contact page
2. Fill out the form with test data
3. Submit the form
4. Check:
   - `ellyman2021@gmail.com` should receive the admin notification
   - The sender's email should receive a confirmation email

## Email Templates

### Admin Email (to ellyman2021@gmail.com)
- Subject: "New Contact Form Submission from [Name]"
- Contains: All form data, contact information, and message
- Professional styling with Moledecc branding

### Sender Confirmation Email
- Subject: "Thank you for contacting Moledecc Leadership Transformation"
- Contains: Message summary, next steps, and contact information
- Professional styling with call-to-action

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Check that your Gmail app password is correct
   - Ensure 2-Step Verification is enabled
   - Verify the app password was generated correctly

2. **CORS errors**
   - Ensure the backend server is running on port 3001
   - Check that the frontend is making requests to `http://localhost:3001`

3. **Email not sending**
   - Check the server console for error messages
   - Verify Gmail account settings
   - Ensure the app password hasn't expired

### Server Logs

The server will log:
- When admin email is sent successfully
- When sender confirmation email is sent successfully
- Any errors that occur during email sending

## Security Notes

- Never commit your `.env` file to version control
- Gmail app passwords are more secure than using your main password
- The backend server only accepts requests from your frontend
- All email data is transmitted securely over HTTPS in production

## Production Deployment

For production deployment:

1. Set environment variables on your hosting platform
2. Update the frontend API URL to your production domain
3. Ensure your hosting platform allows outbound email traffic
4. Consider using a dedicated email service for higher volume

## Alternative Email Services

If you prefer not to use Gmail, you can modify `server.js` to use:
- SendGrid
- Mailgun
- Amazon SES
- Any other SMTP service

The email templates and API structure will remain the same.
