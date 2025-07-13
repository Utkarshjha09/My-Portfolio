// Using native fetch (Node.js v18+)

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the root directory (for HTML, CSS, JS)
app.use(express.static(__dirname));

// Serve static files from public directory (for images)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'utkarshjha.999@gmail.com',
    pass: process.env.EMAIL_PASS || 'qibb pkkf pdhz jjgd'
  }
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { name, email, subject, message, recaptcha } = req.body;

  // 1. Verify reCAPTCHA
  const secret = process.env.RECAPTCHA_SECRET || '6LdT9YArAAAAAJ4PMzGdoV94XW46Dpjr2Sqbtz_d';
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha}`;
  const captchaRes = await fetch(verifyUrl, { method: 'POST' });
  const captchaJson = await captchaRes.json();

  if (!captchaJson.success) {
    return res.status(400).json({ error: 'Captcha verification failed' });
  }

  // 2. If verified, send the email
  try {
    // Email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'utkarshjha.999@gmail.com',
      to: process.env.EMAIL_USER || 'utkarshjha.999@gmail.com',
      subject: `New message from ${name}: ${subject}`,
      text: `Message from ${name} (${email}):\n\n${message}`
    });

    // Feedback email to the sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'utkarshjha.999@gmail.com',
      to: email,
      subject: 'Thank you for contacting me!',
      text: `Hi ${name},\n\nThank you for reaching out! I've received your message and truly appreciate your time and input. In the meantime, feel free to check out more about us or follow us on social media.\n\nThanks again, and have a great day!\n\nYour message:\n${message}\n\nBest regards,\nUtkarsh Jha`
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Test endpoint
app.get('/contact', (req, res) => {
  res.send('Contact endpoint is working! Use POST to send messages.');
});

// Serve the main HTML file for all routes (for SPA-like behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Use environment variable for port or default to 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));