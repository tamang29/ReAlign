import nodemailer from 'nodemailer';
import Organization from '../models/organizationModel.js';
import User from '../models/userModel.js';

export const sendAddUserEmail = async (email, organizationName) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'You have been added to a team on ReAlign',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Welcome to ReAlign!</title>
                <style>
                    .container {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .content {
                        padding: 20px;
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
                        <p>You have been added to the team <strong>${organizationName}</strong> on ReAlign. Please log in to your account to start collaborating with your team.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 ReAlign. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    await transporter.sendMail(mailOptions);
};