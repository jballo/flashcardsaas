'use client'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, duration, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import { Anton } from "next/font/google";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import React from 'react';
// import { Box, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
// import Header from '../components/Header';
// import { Anton } from "next/font/google";
// import getStripe from '@/utils/get-stripe';

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

const pricingPlans = [
  {
    title: 'Basic',
    price: 'Free',
    features: [
      { feature: 'Access to basic features', available: true },
      { feature: 'Limited flashcards', available: true },
      { feature: 'Limited customization', available: true },
      { feature: 'Difficulty customization', available: false },
    ],
    paymentBaseUrl: '',
    description: 'Semper urna veal tempus pharetra elit habisse platea dictumst.',
    icon: <PersonIcon style={{ fontSize: 40 }} />,
  },
  {
    title: 'Pro',
    price: '$10.00',
    features: [
      { feature: 'Access to Pro features', available: true },
      { feature: 'Several stored flashcard sets', available: true },
      { feature: 'Access to various customizations', available: true },
      { feature: 'Difficulty levels', available: true },
    ],
    paymentBaseUrl: 'https://buy.stripe.com/test_aEU8yZ3Qw1u34bC144',
    description: 'Semper urna veal tempus pharetra elit habisse platea dictumst.',
    icon: <PeopleIcon style={{ fontSize: 40}} />,
  },
  {
    title: 'Ultimate',
    price: '$20.00',
    features: [
      { feature: 'Access to Ultimate features', available: true },
      { feature: 'Unlimited stored flashcard sets', available: true },
      { feature: 'Full customization', available: true },
      { feature: 'Difficulty levels', available: true },
    ],
    paymentBaseUrl: 'https://buy.stripe.com/test_fZe16xbiY5KjgYo7st',
    description: 'Semper urna veal tempus pharetra elit habisse platea dictumst.',
    icon: <GroupsIcon style={{ fontSize: 40 }} />,
  },
];

export default function PricingPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    
    
    const subscribe = async (paymentBaseUrl) => {
        if (!isSignedIn || !user) {
            alert('Please sign in to subscribe');
            return;
        };
        // function that opens a link to the stripe checkout page
        const paymentlink = paymentBaseUrl + '?prefilled_email=' + user?.primaryEmailAddress;
        window.open(paymentlink, '_blank');
    
    }

    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_session', {
            method: 'POST',
            headers: {
                origin: 'http://localhost:3000',
            },
        });
    
        const checkoutSessionJson = await checkoutSession.json();
        
        if (checkoutSession.statusCode == 500) {
            console.error(checkoutSession.message);
            return;
        }
        
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id,
        });
        
        if (error) {
            console.warn(error.message);
        }
    }

    return (
        <Box
            width='100vw'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
        >
            <Header />
            <Box
                mt={8}
                mb={4}
                xs={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h1' sx={{ fontSize: '4rem', fontFamily: anton.style.fontFamily}}>
                    Pricing Plans
                </Typography>
            </Box>

            <Box 
                width='75vw'
            >
                <Grid container spacing={4} mt={4}>
                {pricingPlans.map((plan, index) => (
                    <Grid item xs={12} md={4} key={index}>
                    <Card elevation={3} sx={{ padding: 4, borderRadius: 2, position: 'relative' }}>
                        
                        <Box textAlign="center">
                        {plan.icon}
                        <Typography variant="h5" mt={2}>
                            {plan.title}
                        </Typography>
                        </Box>

                        <CardContent>
                        <Typography variant="h5" color="textSecondary" gutterBottom align='left' marginBottom={3}>
                            Features
                        </Typography>
                        {plan.features.map((feature, idx) => (
                            <Typography
                            variant="body2"
                            key={idx}
                            sx={{
                                display: 'flex',
                                mb: 2,
                                color: feature.available ? 'text.primary' : 'error.main',
                            }}
                            align='left'
                            >
                            {feature.available ? (
                                <CheckCircleIcon sx={{ mr: 1 }} />
                            ) : (
                                <CancelIcon sx={{ mr: 1 }} />
                            )}
                            <strong>{feature.feature}</strong>
                            </Typography>
                        ))}

                        {/* <Typography variant="body2" color="textSecondary" mt={4}>
                            {plan.description}
                        </Typography> */}

                        <Box mt={4}>
                            <Typography variant="body2" color="textSecondary">
                            <span style={{ fontSize: '34px', color: 'black' }}>{plan.price}</span>
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            Per Month
                            </Typography>
                        </Box>
                        <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: '5px' }} onClick={() => {subscribe(plan.paymentBaseUrl)}}>
                            Purchase Now
                        </Button>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>
        </Box>
    );
};