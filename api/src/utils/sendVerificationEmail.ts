import { env } from "../config/env";

const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email: string, token: string) => {
  if (!env.emailUser || !env.emailPassword) {
    throw new Error("Email service is not configured");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.emailUser,
      pass: env.emailPassword,
    },
  });

  const verificationUrl = `${env.appUrl}/api/users/verify?token=${token}`;

  const mailOptions = {
    from: env.emailUser,
    to: email,
    subject: "Verifica tu cuenta",
    text: `Haz clic en el siguiente enlace para verificar tu cuenta: ${verificationUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
