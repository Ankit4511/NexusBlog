import { config } from "dotenv";
import nodemailer from "nodemailer";

config({
  path: "./data/config.env",
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `"NexusBlog" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email Sent Successfully");
  } catch (error) {
    console.error("❌ SEND EMAIL ERROR");
    console.error(error);
    throw error;
  }
};