import Header from "../components/Header";
import { Anton } from "next/font/google";
import React from 'react';
import { Box, Button, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const anton = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
})

const teamMembers = [
  {
    name: 'Jonathan Ballona Sanchez',
    title: 'Full Stack Developer',
    description: 'Graduate of UC Merced',
    website: 'https://www.google.com',
    imgUrl: "../../src/assets/leaf.jpeg",
  },
  {
    name: 'Karla Zamora',
    title: 'AI/ML and Backend Developer',
    description: 'University of Texas, Rio Grande Valley',
    website: 'https://www.google.com',
    imgUrl: '/team2.jpg',
  },
  {
    name: 'Pranav Palle',
    title: 'Designer and Frontend Developer',
    description: 'University of Maryland, College Park',
    website: 'https://pranavpalle.netlify.app',
    imgUrl: '/team3.jpg',
  },
];

const ContactPage = () => {
  return (
    <Box
        width="100vw"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}
    >
        <Header />
        <Box sx={{ padding: 3 }} width="100vw">
            <Typography 
                variant="h1" 
                gutterBottom
                sx={{
                    fontSize: '5rem',
                    fontFamily: anton.style.fontFamily
                }}
                >
                Meet The Team
                </Typography>
            <Grid container spacing={4}>
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                style={{height: 0, paddingTop: '56.25%'}}
                                image={member.imgUrl}
                                alt={member.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{member.name}</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    {member.title}
                                </Typography>
                                <Typography variant="body2">{member.description}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    href={member.website}
                                    target="_blank"
                                >
                                    Personal Website
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

export default ContactPage;