import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { config } from 'src/shared/config/config';
import { UserModel } from 'src/shared/schemas/user.schema';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get('email.smtpHost'),
      port: 587,
      secure: false,
      service: 'gmail',
      auth: {
        user: config.get('email.smtpUser'),
        pass: config.get('email.smtpPass'),
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
    const mailOptions = {
      from: config.get('email.fromEmail'),
      to,
      subject,
      text,
      html,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
    }
  }

  async successfulRegistration(user: UserModel) {
    const { email, firstName, lastName } = user;
    const subject = 'Registration Successful';
    const text = `Dear ${firstName} ${lastName},\n\nYour registration for the Ticket Vortex application was successful. 
                  You can now log in to your account using your username and password.
                  \n\nThank you for using our service.
                  \n\nBest regards, 
                  \n\n The Ticket Vortex Team`;
    const html = `Dear ${firstName} ${lastName},<br><br>Your registration for the Ticket Vortex application was successful. 
                  You can now log in to your account using your username and password.
                  <br><br>Thank you for using our service.
                  <br><br>Best regards,
                  <br><br>The Ticket Vortex Team`;
    await this.sendMail(email, subject, text, html);
  }

  async successfulVerification(user: UserModel) {
    const { email, firstName, lastName } = user;
    const subject = 'Email Verification';
    const text = `Dear ${firstName} ${lastName},\n\nYour account has been successfully verified. 
                  You are now eligible to create events in the Ticket Vortex application.
                  \n\nAll the best,
                  \n\nThe Ticket Vortex Team`;
    const html = `Dear ${firstName} ${lastName},<br><br>Your account has been successfully verified. 
                  You are now eligible to create events in the Ticket Vortex application.
                  <br><br>All the best,
                  <br><br>The Ticket Vortex Team`;
    await this.sendMail(email, subject, text, html);
  }
}
