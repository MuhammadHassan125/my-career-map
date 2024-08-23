import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { baseURL } from '../../../Fire/useFire';
import Fire from '../../../Fire/Fire';
import { Snackbar } from '../../../Utils/SnackbarUtils';

const Success = () => {
    const location = useLocation();

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

                    // The subscriptionId is not needed here since we handle it on the server side
                    // const response = await axios.post(`${API_URL}/api/confirm-subscription`, {
                    //     sessionId
                    // }, {
                    //     headers: {
                    //         'Authorization': `Bearer ${token}`
                    //     }
                    // });
                    // // Adjust this to correctly check the response
                    // if (response.status === 200 && response.data.success) {
                    //     alert('Subscription confirmed successfully!');
                    // } else {
                    //     alert('Failed to confirm subscription');
                    // }

                    Fire.post({
                        url: `${baseURL}/confirm-subscription`,
                        data: {
                            sessionId
                        },

                        onSuccess: (res) => {
                            console.log(res);
                            Snackbar("Subscription confirmed successfully", { variant: 'success' });
                        },

                        onError: (err) => {
                            console.log(err);
                            Snackbar("Subscription confirmation failed", { variant: 'error' });
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
