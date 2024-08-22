'use client';
import Image from "next/image";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Header from "./components/Header";
import Features from "./components/Features";
import { Anton } from "next/font/google";
import { useUser } from '@clerk/nextjs'; 
import { useEffect } from "react";
import { collection, doc, getDoc, getDocs, setDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase";


const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  const checkPlan = async (link) => {
    if(isSignedIn && isLoaded && user){
        console.log("User is signed in and loaded");

        const usersRef = collection(db, 'users');
        const userQuery = query(usersRef, where('email', '==',user.primaryEmailAddress.emailAddress));
        const userSnapshot = await getDocs(userQuery);

        if(userSnapshot.empty){
            console.error(`User with email ${useprimaryEmailAddress.emailAddress} not found`);
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

  const createUser = async () => {
    try{
        const collectionRef = collection(db, 'users');
        const docRef = doc(collectionRef, user?.id);
        const docSnap = await getDoc(docRef);
    
        if(docSnap.exists()){
            // console.log("User already exists in db: " + docSnap);
            console.log("User already exists in db.");
          } else {
            console.log("User does not exist in db. Creating a new user in db.");

            // Add a new document with a generated id.
            await setDoc(docRef, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.primaryEmailAddress.emailAddress,
                userImage: user.imageUrl,
                flashcards: [],
                isActive: false,
                stripeCustomerId: '',
                subscriptionId: '',
            })
        }

    } catch (error) {
            console.error("Error adding user to db: " + error.message);
    }
  }

  useEffect(() => {
      if(isSignedIn && isLoaded && user){
          createUser();
      }
  }, [isSignedIn, user]);

  const signUp = () => {
    // if the user is not signed up and the page is loaded, redirect to sign up page
    if(!isSignedIn && isLoaded){
      window.location.href = '/sign-up';
    } else {
        // if the user is signed in, redirect to the flashcard page
       window.location.href = '/generate';
    }
  }

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

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
      <Box my={5}>
        <Typography 
          variant="h1" 
          gutterBottom
          sx={{
            fontSize: '5rem',
            fontFamily: anton.style.fontFamily
          }}
        >
          MindSpark
        </Typography>
        <Typography 
          variant="h2" 
          gutterBottom
          sx={{
            fontSize: '3.5rem',
          }}
        >
          Conquer your learning with new AI Flashcards
        </Typography>

        <Box
          mt={6}
        >
          <Box
            mt={5} 
            sx={{ display: 'flex', justifyContent: 'center'}}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: '1.5rem',
                // textAlign: 'center',
                maxWidth: '60%'
              }}
            >
              Enjoy the ability to effortlessly generate flashcards and get started on your learning journey, customize difficulty levels, and track your progress!
            </Typography>
          </Box>
          <SignedOut>
            <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/sign-up">
              Get Started
            </Button>
          </SignedOut>
          <SignedIn>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{mt: 2, mr: 2}} 
              onClick={() => checkPlan("/generate")}
            >
              Get Started
            </Button>
          </SignedIn>
          <Button variant="outlined" color="primary" sx={{mt: 2}} href="/pricing">
            Pricing Plans
          </Button>
        </Box>
      </Box>
      <Features />

    </Box>
  );
}
