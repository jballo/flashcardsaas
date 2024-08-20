import { Box, Grid, Typography } from '@mui/material';
import { Anton } from "next/font/google";

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export default function Features() {

    return (
        <Box sx={{my: 6, textAlign: 'center', width: '85%'}}>
            <Typography variant="h4" component="h2" gutterBottom sx={{fontWeight: 'bold'}}>Features</Typography>
            <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <Box
                sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2 
                }}
                >
                    <Typography variant="h6">Easy Text Input</Typography>
                    <Typography variant="body1">Input your text and let our AI do the rest</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box
                sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2 
                }}
                >
                    <Typography variant="h6">Customizable Flashcards</Typography>
                    <Typography variant="body1">Customize your flashcards to your liking</Typography>
                </Box>
            </Grid><Grid item xs={12} md={4}>
                <Box
                sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2 
                }}
                >
                    <Typography variant="h6">Track Progress</Typography>
                    <Typography variant="body1">Track your progress and see how you improve</Typography>
                </Box>
            </Grid>
            </Grid>
        </Box>

    );
}