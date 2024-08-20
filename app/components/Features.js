import { Box, Grid, Typography } from '@mui/material';

export default function Features() {

    return (
        <Box sx={{my: 6, textAlign: 'center'}}>
            <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
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
                <Typography>{' '}AI Generation</Typography>
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
                <Typography variant="h6">Easy Text Input</Typography>
                <Typography>{' '}AI Generation</Typography>
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
                <Typography variant="h6">Easy Text Input</Typography>
                <Typography>{' '}AI Generation</Typography>
                </Box>
            </Grid>
            </Grid>
        </Box>

    );
}