const nodemailer = require('nodemailer');

const VerifyMail = async (user, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });
    
    const verificationUrl = `http://localhost:3000/api/verify/${token}`;

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Verify email',
      text: `Click here to verify ${verificationUrl}`
    };


    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
};

module.exports = VerifyMail;
