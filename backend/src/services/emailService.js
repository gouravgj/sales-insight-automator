import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (email, summary) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "AI Sales Report",
    text: summary,
  });
};
