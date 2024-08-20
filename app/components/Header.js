import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


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
            <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>
                Flashcard SaaS
            </Typography>
            <Button color='inherit' href="/about">About</Button>
            <Button color="inherit" href="/pricing">Pricing</Button>
            <Button color='inherit' href="/contact">Contact</Button>
            <SignedOut>
                <Button color="inherit" href="/sign-in">Login</Button>
                <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </Toolbar>
        </AppBar>
    );
}