import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 */

export const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Novus Newsletter" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

/**
 * Send a welcome email to a new subscriber
 * @param {string} email - Subscriber email
 */
export const sendWelcomeEmail = async (email) => {
    const subject = "Welcome to Novus!";
    const text = `Hi there!\n\nThank you for subscribing to Novus. You'll now receive our latest stories and updates directly in your inbox.\n\nHappy reading!\nThe Novus Team`;
    const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #333;">Welcome to Novus!</h2>
      <p>Hi there!</p>
      <p>Thank you for subscribing to <strong>Novus</strong>. You'll now receive our latest stories and updates directly in your inbox.</p>
      <p>A platform where ideas flow freely and stories find their home.</p>
    </div>
  `;

    return sendEmail(email, subject, text, html);
};