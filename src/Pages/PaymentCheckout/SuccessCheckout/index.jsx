import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from 'point-fetch-react';

const Success = () => {
    const location = useLocation();
    const {post} = useFetch()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
            const confirmSubscription = async () => {
                try {
                    const token = localStorage.getItem('user-visited-dashboard');
                    if (!token) {
                        throw new Error('User not authenticated');
                    }
                    
                    post({
                        endPoint: `/confirm-subscription`,
                        data: {
                            sessionId
                        },

                        onSuccess: (res) => {
                            console.log(res);
                            alert("Subscription confirmed successfully");
                        },

                        onError: (err) => {
                            console.log(err);
                            alert("Subscription confirmation failed");
                        }
                    })
                } catch (error) {
                    console.error('Error confirming subscription:', error);
                    alert('Error occurred while confirming subscription');
                }
            };

            confirmSubscription();
        } else {
            console.log('Session ID is missing');
            alert('Session ID is missing');
        }
    }, [location.search]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <img src='/images/success.png' alt='cancel' style={{ width: "100px", height: "100px", marginBottom: "20px" }} />
            <h2 style={{ fontSize: "35px" }}>Thank You for Your Purchase!</h2>
            <p style={{ color: "#00d459" }}>Your subscription is being processed. You will receive a confirmation soon.</p>
        </div>
    );
};

export default Success;
