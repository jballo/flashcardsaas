'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, CollectionReference, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { Anton } from "next/font/google";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashCards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        console.log("collections: ", collections);
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashCards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

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
            <Button variant="contained" sx={{ color: "white" }} startIcon={<LibraryAddIcon />} href="/generate">New Set</Button>
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
            Flashcard Sets
        </Typography>
      </Box>
      <Container maxWidth='100vw'>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Stack direction={'row'} justifyContent={"space-between"}>
                    <Typography variant='h6'>{flashcard.name}</Typography>
                    <Typography variant='h6' textAlign={'right'}>{"→"}</Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );

}