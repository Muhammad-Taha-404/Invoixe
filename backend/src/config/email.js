import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'Test <onboarding@resend.dev>',
  to: 'tahakhalid5634@gmail.com',
  subject: 'Hello world',
  html: '<strong>It works!</strong>',
});
