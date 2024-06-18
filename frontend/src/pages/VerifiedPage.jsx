import React, { useEffect, useState } from 'react';
import {Alert, Container } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifiedPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    //extract token from the confirmation link
    const emailToken = searchParams.get('token');
    
    useEffect(() => {
        const verifyEmail = async () => {
            if (!emailToken) {
                setError({ message: 'Invalid or missing token' });
                return;
            }


            try {
            
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify`, { token: emailToken });
                // ${process.env.REACT_APP_API_URL}/api/auth/verify
                setUser(response.data);

                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (err) {
        
                setError(err.response.data);
            }
        };

        verifyEmail();
    }, [emailToken, navigate]);

    return (
        <Container className="mt-5">
            
                <div>
                    {user?.isVerified ? (
                        <Alert variant="success">Email successfully verified, redirecting...</Alert>
                    ) : (
                        <div>
                            {error && <Alert variant="danger">{error.message}</Alert>}
                        </div>
                    )}
                </div>
            
        </Container>
    );
};

export default VerifiedPage;
