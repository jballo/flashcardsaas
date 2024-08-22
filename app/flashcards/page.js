'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, CollectionReference, deleteDoc, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, Grid, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { Anton } from "next/font/google";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [filter, setFilter] = useState("")
  // To trigger flashcard retrieval
  const [deleteOp, setdeleteOp] = useState('')
  const router = useRouter();

  useEffect(() => {
    async function getFlashCards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const allCollections = docSnap.data().flashcards || [];
        const collections = allCollections.filter((list) => list.name.toLowerCase().includes(filter.toLowerCase()))
        //console.log("collections: ", collections);
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashCards();
  }, [user, filter, deleteOp]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };
  // Delete flashcard set
  const handleDelete = async (index) => {
    // Get set reference in db
    const docRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(docRef);
    const allCollections = docSnap.data().flashcards
    const collectionToDelete = allCollections[index].name
    // Delete from flashcards array in users.flashcards
    allCollections.splice(index, 1)
    await updateDoc(docRef, { flashcards: allCollections })
    // Delete collection in users (del all documents/flshcards)
    const flashcardsCollectionRef = collection(db, 'users', user.id, collectionToDelete);
    const flashcardsSnapshot = await getDocs(flashcardsCollectionRef);
    const deletePromises = flashcardsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    // Trigger retrieval of flashcards
    setdeleteOp(collectionToDelete)
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
            <Button variant="contained" sx={{ color: "white" }} startIcon={<LibraryAddIcon />} href="/generate">New Set</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4, }}
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
        <TextField id="outlined-basic" label="Search Sets" variant="outlined" fullWidth onChange={((e) => setFilter(e.target.value))} />
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Stack direction={'row'} gap={2} sx={{ justifyContent: 'space-evenly' }}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                    <CardContent>
                      <Stack direction={'row'} gap={3}>
                        <Typography variant='h6' textAlign={'right'}>{"→"}</Typography>
                        <Typography variant='h6'>{flashcard.name}</Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <IconButton onClick={(e) => handleDelete(index)} sx={{ background: 'red' }}>
                  <DeleteIcon style={{ color: 'white' }} />
                </IconButton>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

    </>
  );
}
