import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Success() {
    const navigate = useNavigate();
    const stripeSessionId = localStorage.getItem("stripe_session_id");
    const token = localStorage.getItem("token");
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    async function handleConfirmPayment() {
        try {
            console.log(stripeSessionId, 'stripeSessionId');
            console.log(token, 'token');
            const res = await axios.post(
                `https://work-hive-project.vercel.app/api/v1/payments/confirm-payment`,
                { sessionId: stripeSessionId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res , 'response confirm payment');

            if (res.status === 200) {
                localStorage.removeItem("stripe_session_id");
                setStatus(true);
              setTimeout(() => {
                navigate('/userProfile');
              }, 2000);
            }
        } catch (error) {
            console.error('Payment confirmation error:', error);
            setStatus(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!stripeSessionId) {
            setStatus(false);
            setIsLoading(false);
            return;
        }
        handleConfirmPayment();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    {isLoading ? (
                        <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                            <circle
                                className="stroke-blue-500"
                                strokeWidth="4"
                                strokeDasharray="283"
                                strokeDashoffset="75"
                                fill="none"
                                r="45"
                                cx="50"
                                cy="50"
                            />
                        </svg>
                    ) : status ? (
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="stroke-green-500"
                                strokeWidth="4"
                                strokeDasharray="283"
                                strokeDashoffset="283"
                                fill="none"
                                r="45"
                                cx="50"
                                cy="50"
                                style={{
                                    animation: 'drawCircle 1s ease-in-out forwards'
                                }}
                            />
                            <path
                                className="stroke-green-500"
                                strokeWidth="4"
                                strokeDasharray="100"
                                strokeDashoffset="100"
                                fill="none"
                                d="M30 50 L45 65 L70 35"
                                style={{
                                    animation: 'drawCheck 0.5s ease-in-out 0.5s forwards'
                                }}
                            />
                        </svg>
                    ) : (
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="stroke-red-500"
                                strokeWidth="4"
                                strokeDasharray="283"
                                strokeDashoffset="283"
                                fill="none"
                                r="45"
                                cx="50"
                                cy="50"
                                style={{
                                    animation: 'drawCircle 1s ease-in-out forwards'
                                }}
                            />
                            <path
                                className="stroke-red-500"
                                strokeWidth="4"
                                strokeDasharray="100"
                                strokeDashoffset="100"
                                fill="none"
                                d="M30 30 L70 70"
                                style={{
                                    animation: 'drawX 0.5s ease-in-out 0.5s forwards'
                                }}
                            />
                            <path
                                className="stroke-red-500"
                                strokeWidth="4"
                                strokeDasharray="100"
                                strokeDashoffset="100"
                                fill="none"
                                d="M70 30 L30 70"
                                style={{
                                    animation: 'drawX 0.5s ease-in-out 0.5s forwards'
                                }}
                            />
                        </svg>
                    )}
                </div>
                <h1 className={`text-3xl font-bold ${isLoading ? "text-blue-600" : status ? "text-green-600" : "text-red-600"} mb-2`}>
                    {isLoading ? "Verifying Payment..." : status ? "Payment Successful!" : "Payment Failed!"}
                </h1>
                <p className="text-gray-600">
                    {isLoading ? "Please wait..." : status ? "Redirecting to home page..." : "Please try again!"}
                </p>
            </div>

            <style>
                {`
                    @keyframes drawCircle {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                    @keyframes drawCheck {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                    @keyframes drawX {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                `}
            </style>
        </div>
    )
}