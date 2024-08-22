import { AppBar, Button, Toolbar, Typography, Box, Stack } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Anton } from "next/font/google";

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})


export default function Header() {
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
                            <Button color="inherit" href="/generate">Generate</Button>
                            <Button color="inherit" href="/flashcards">Flashcards</Button>
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