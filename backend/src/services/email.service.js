import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const client = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (to, token) => {
  const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`;
  console.log('Verification link:', verificationLink);

  return client.emails.send({
    from: 'Invoixe <onboarding@resend.dev>',
    to: 'tahakhalid5634@gmail.com',
    subject: 'Verify your email address',
    html: `
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationLink}" target="_blank">Verify Email</a>
    `,
  });
};
