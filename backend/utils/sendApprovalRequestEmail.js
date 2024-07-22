import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import Organization from '../models/organizationModel.js';

export const sendApprovalRequestEmail = async (orgId, user) => {
    const token = jwt.sign({ id: user._id, org: orgId }, process.env.JWT_SECRET, { expiresIn: '5d' });
    const url = `${process.env.FRONTEND_URL}/approveUser?token=${token}`;

    const organization = await Organization.findById(orgId);

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: organization.email,
        subject: 'User Approval Request',
        html: generateApprovalRequestEmail(url, user, organization),
    };

    await transporter.sendMail(mailOptions);
};

const generateApprovalRequestEmail = (url, user, organization) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>ReAlign: User Approval Request</title>
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
                    <h1>User Approval Request</h1>
                    <p>Dear ${organization.name},</p>
                    <p>Our new user <strong>${user.firstName} ${user.lastName}</strong> with email address <strong>${user.email}</strong> has requested to join your team. Please manage the request by clicking the link below:</p>
                    <a href="${url}" class="button">Approve or Reject User</a>
                    <p>If the button above doesn't work, you can also manage the request by clicking the following link:</p>
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
