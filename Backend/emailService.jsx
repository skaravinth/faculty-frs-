const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service:'gamill',
  host: 'smtp.gmail.com',
  port: 587, // Use 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'skaravinth07@gmail.com',
    pass: 'utkj ifps tsei lkbn',

  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: {
        name:'FRS Vertical',
        address: 'skaravinth07@gmail.com', 
      },
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
