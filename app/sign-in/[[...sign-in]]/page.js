import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn, SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Anton } from "next/font/google";
import Header from "../../components/Header";

const anton = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
})

export default function SignInPage() {
  return (
    <Box>
        <AppBar 
            position="static"
            left={0}
            top={0}
            sx={{
                width: '100vw',
                backgroundColor: '#62C4E1',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Button color='inherit' href="/" sx={{textTransform: 'none'}}>
                        <Typography 
                            variant="h5" 
                            style={{flexGrow: 1}} 
                            sx={{fontFamily: anton.style.fontFamily,
                                letterSpacing: 1,
                            }}
                        >
                            MindSpark
                        </Typography>
                    </Button>
                </Box>
                <Box>
                    <Button color='inherit' href="/sign-up">Sign Up</Button>
                </Box>
            </Toolbar>
        </AppBar>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{textAlign: 'center', my: 4}}
            >
            <Typography 
                variant="h1" 
                gutterBottom
                sx={{
                    fontSize: '5rem',
                    fontFamily: anton.style.fontFamily
                }}
            >
                Sign In
            </Typography>
            <SignIn />
        </Box>
    </Box>
  )
}