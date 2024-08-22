'use client';


import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";


import { collection, CollectionReference, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, Grid, TextField, Toolbar, Typography } from "@mui/material";
import { Anton } from "next/font/google";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { all } from "axios";

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})


export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [filter, setFilter] = useState("")
  const router = useRouter();

  useEffect(() => {
    async function getFlashCards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const allCollections = docSnap.data().flashcards || [];
        const collections = allCollections.filter((list) => list.name.includes(filter))
        //console.log("collections: ", collections);
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashCards();
  }, [user, filter]);

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
      <Container maxWidth='100vw'>
      <TextField id="outlined-basic" label="Search Sets" variant="outlined" onChange={((e) => setFilter(e.target.value))}/>      
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant='h6'>{flashcard.name}</Typography>
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