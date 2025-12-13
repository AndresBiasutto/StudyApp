const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationUrl = `http://localhost:3000/api/users/verify?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verifica tu cuenta',
    text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${verificationUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
