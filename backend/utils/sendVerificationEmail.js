import nodemailer from 'nodemailer';

import jwt from 'jsonwebtoken';


export const sendVerificationEmail = async (user, req, res) => {
    console.log(process.env.FRONTEND_URL)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    const url = `${process.env.FRONTEND_URL}/verified?token=${token}`;
    
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: "ReAlign.seba@outlook.com",
          pass: process.env.EMAIL_PASS,
        },
      });
    
      const mailOptions = {
        from: "ReAlign.seba@outlook.com",
        to: user.email,
        subject: 'Welcome to ReAlign! Please verify your email address',
        html: generateVerificationEmail(url, user),
      };
    
      await transporter.sendMail(mailOptions);
    };
    



const generateVerificationEmail = (url, user) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Welcome to ReAlign! Please verify your ReAlign account</title>
          <style>
              .container {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #ddd;
              }
              .header img {
                  max-width: 150px;
              }
              .content {
                  padding: 20px;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #fff;
                  background-color: #2b0d5b;
                  text-align: center;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
              }
              .footer {
                  text-align: center;
                  margin-top: 20px;
                  font-size: 12px;
                  color: #777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="content">
                  <h1>Welcome to ReAlign!</h1>
                  <p>Hi ${user.firstName},</p>
                  <p>Thank you for registering with ReAlign! We're excited to have you on board. To get started, please verify your email address by clicking the button below:</p>
                  <a href="${url}" class="button">Verify Email</a>
                  <p>If the button above doesn't work, you can also verify your email by clicking the following link:</p>
                  <p><a href="${url}">${url}</a></p>
                  <p>We look forward to helping you simplify your requirements engineering process and enhance your team's collaboration.</p>
                  <p>If you have any questions or need assistance, feel free to reply to this email or contact our support team.</p>
                  <p>Best regards,<br>The ReAlign Team</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 ReAlign. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  