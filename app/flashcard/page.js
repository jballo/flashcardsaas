'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { AppBar, Box, Container, Grid, Typography, Card, CardActionArea, CardContent, Button, Toolbar } from "@mui/material";
import { Anton } from "next/font/google";
import ViewStreamIcon from '@mui/icons-material/ViewStream';

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      try {
        // search is the name of the collection of flashcards we want to fetch
        const colRef = collection(doc(collection(db, 'users'), user?.id), search);
        const docs = await getDocs(colRef);


        const flashcardsTemp = [];

        docs.forEach((doc) => {
          flashcardsTemp.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcardsTemp);

      } catch (error) {
        console.error("Error fetching flashcards: ", error);
      }
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <>
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
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                variant="h5"
                style={{ flexGrow: 1 }}
                sx={{
                  fontFamily: anton.style.fontFamily,
                  letterSpacing: 1,
                }}
              >
                MindSpark
              </Typography>
            </a>
          </Box>
          <Box>
            <Button variant="contained" sx={{ color: "white" }} startIcon={<ViewStreamIcon />} href="/flashcards">My Flashcards</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth='100vw'>
        <Typography 
          variant="h1" 
          gutterBottom
          textAlign={'center'}
          sx={{
              mt: 2,
              fontSize: '5rem',
              fontFamily: anton.style.fontFamily
          }}
        >
          {search}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {
            flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: '1000px',
                          '& > div': {
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '300px',
                            boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2)',
                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          },
                          '& > div > div': {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box',
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)',
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant='h5' component='div'>
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant='h6' component='div'>
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </>
  );
}