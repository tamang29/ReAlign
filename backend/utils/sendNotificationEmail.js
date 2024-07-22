import nodemailer from 'nodemailer';

export const sendNotificationEmail = async (user, organization, action) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: `Join Team Request ${action === 'approve' ? 'Approved' : 'Rejected'}`,
        html: generateNotificationEmail(user, organization, action),
    };

    await transporter.sendMail(mailOptions);
};

const generateNotificationEmail = (user, organization, action) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>ReAlign: Join Team Request ${action === 'approve' ? 'Approved' : 'Rejected'}</title>
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
                    <h1>Join Team Request ${action === 'approve' ? 'Approved' : 'Rejected'}</h1>
                    <p>Dear ${user.firstName},</p>
                    <p>Your request to join the team <strong>${organization.name}</strong> has been ${action === 'approve' ? 'approved. You are now a member of the team.' : 'rejected. You can still use your account without belonging to an team.'}</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 ReAlign. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
