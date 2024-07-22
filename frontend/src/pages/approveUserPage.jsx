import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../styles/LoginPage.css'; 

const ApproveUser = () => {
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState(''); // To set the variant of the alert
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const handleAction = async (action) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/organization/approveUser?action=${action}`,
                { token } // Pass the token in the request body
            );
            setMessage(response.data.message);
            setVariant('success');
        } catch (error) {
            setMessage('An error occurred while processing the request.');
            setVariant('danger');
        }
    };

    return (
        <div className="approve-user-page">
            <div className="approve-user-container">
                <h1 className="title">User Approval Request</h1>
                {message && <Alert variant={variant}>{message}</Alert>}
                <button className="btn-primary" onClick={() => handleAction('approve')}>Approve</button>
                <button className="btn-primary" onClick={() => handleAction('reject')}>Reject</button>
                
            </div>
        </div>
    );
};

export default ApproveUser;