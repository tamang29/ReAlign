import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const sendResetPasswordEmail = async (user, req, res) => {
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

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
        subject: 'Reset Your Password',
        html: generateResetPasswordEmail(url, user),
    };

    await transporter.sendMail(mailOptions);
  
};

const generateResetPasswordEmail = (url, user) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>ReAlign: Reset Your Password</title>
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
                    <h1>Reset Your Password</h1>
                    <p>If you requested a password reset, click the button below to reset your password:</p>
                    <a href="${url}" class="button">Reset Password</a>
                    <p>If the button above doesn't work, you can also reset your password by clicking the following link:</p>
                    <p><a href="${url}">${url}</a></p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 ReAlign. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
