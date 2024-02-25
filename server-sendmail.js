const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001 // email receive
app.use(cors())
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

// npm install dotenv
// require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
////////////////

// // Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/send-email', (req, res) => {
  const { email } = req.body;

  // Send email using nodemailer
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
      auth: {
      user: 'a5698f3ca9cd80', // Replace with your  email
      pass: 'e2bf1dbf970058'  // Replace with your  password
    }
  });

  const mailOptions = {
    from: 'a5698f3ca9cd80@mailtrap.com',
    to: 'information@rectanglenews.com', // Replace with the recipient email address
    subject: 'New Subscriber - Email Info',
    text: `New subscriber email: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);

      res.status(200).send('Email sent successfully');
    }
  });
});




////////////////

// Start the server
app.listen(PORT, () => console.log(`SendmailServer running on port ${PORT}`))

module.exports = app;




