import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'Test <onboarding@resend.dev>',
  to: 'na5794551@gmail.com',
  subject: 'Hello world',
  html: '<strong>It works!</strong>'
}) ;