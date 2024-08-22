'use client';
import { AppBar, Button, Toolbar, Typography, Box, Stack } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Anton } from "next/font/google";
import { useUser } from '@clerk/nextjs';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/firebase';

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})


export default function Header() {
    const { user, isLoaded, isSignedIn } = useUser();

    const checkPlan = async (link) => {
        if(isSignedIn && isLoaded && user){
            console.log("User is signed in and loaded");

            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('email', '==',  user.primaryEmailAddress.emailAddress));
            const userSnapshot = await getDocs(userQuery);

            if(userSnapshot.empty){
                console.error(`User with email ${user.primaryEmailAddress.emailAddress} not found`);
            }

            let userData = userSnapshot.docs[0].data();

            if(userData.isActive === false){
                alert("You need to have a subscription to access this feature. Please sign up for a subscription.");
                return;
            }
            
            console.log("User has a subscription");
            window.location.href = link;

        } else {
            console.log("User is not signed in or loaded");
        }

    }

    return (
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
                    <Button color="inherit" href="/" sx={{textTransform: 'none'}}>
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
                <Stack direction="row">
                    <Box>
                        <SignedIn>
                            <Button 
                                color="inherit"
                                onClick={() => checkPlan('/generate')}
                            >
                                Generate
                            </Button>
                            <Button 
                                color="inherit" 
                                onClick={() => checkPlan("/flashcards")}
                            >
                                Flashcards
                            </Button>
                        </SignedIn>
                        <Button color="inherit" href="/pricing">Pricing</Button>
                        <Button color='inherit' href="/contact">Contact</Button>
                        <SignedOut>
                            <Button color="inherit" href="/sign-in">Login</Button>
                            <Button color="inherit" href="/sign-up">Sign Up</Button>
                        </SignedOut>
                    </Box>
                    <Box sx={{ml: 2}}>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}