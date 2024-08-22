'use client';

import { useUser } from "@clerk/nextjs";
import { Box, Container, Paper, TextField, Typography, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogActions, DialogContentText, Drawer, Accordion, AccordionSummary, AccordionDetails, AppBar, Toolbar } from "@mui/material";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from "@/firebase";
import { Anton } from "next/font/google";
import ViewStreamIcon from '@mui/icons-material/ViewStream';

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleSubmit = async () => {
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(data);
      })
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => setModal(true);

  const handleClose = () => setModal(false);

  const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name!');
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];

      if (collections.find((f) => f.name === name)) {
        alert('Flashcard collection with the same name already exists.');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push('/flashcards');
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
            <Button variant="contained" sx={{color:"white"}} startIcon={<ViewStreamIcon />} href="/flashcards">My Flashcards</Button>

          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth='md'>
        <Box sx={{
          mt: 4,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant='h4'>Generate Flashcards</Typography>
          <Paper sx={{ p: 4, width: '100%' }}>
            <TextField
              value={text}
              onChange={((e) => setText(e.target.value))}
              label='Enter text'
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              sx={{
                mb: 2,
              }}
            />
            <Button variant='contained' color='primary' onClick={handleSubmit} fullWidth>
              {' '}
              Submit
            </Button>
          </Paper>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant='h5'>Flashcards Preview</Typography>
            <Grid container spacing={3}>
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
                                height: '200px',
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
                                <Typography variant='h5' component='div'>
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
            <Box sx={{ my: 6, display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' color='secondary' onClick={handleOpen}>
                Save
              </Button>
            </Box>

            <Dialog open={modal} onClose={handleClose} p={3}>
              <DialogTitle>Save Flashcards</DialogTitle>
              <DialogContentText>
                Please enter a name for your flashcards collection
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                label='Collection Name'
                type='text'
                p={3}
                value={name}
                onChange={((e) => setName(e.target.value))}
                variant='outlined'

              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveFlashcards}>Save</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Container>
    </>
  );

}