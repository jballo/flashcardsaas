import { Box, Grid, Typography, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { Anton } from "next/font/google";

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

const featuresList = [
    {
      imgUrl: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg",
      title: "Easy Text Input",
      description: "Input your text and let our AI do the rest"
    },
    {
      imgUrl: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg",
      title: "Customizable Flashcards",
      description: "Customize your flashcards to your liking"
    },
    {
      imgUrl: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg",
      title: "Track Progress",
      description: "Track your progress and see how you improve"
    }
]

export default function Features() {

    return (
        <Box sx={{my: 6, textAlign: 'center', width: '85%'}}>
            <Typography variant="h4" component="h2" gutterBottom sx={{fontWeight: 'bold'}}>Features</Typography>
            <Grid container spacing={4} marginTop={1}>
                {featuresList.map((feature, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ borderRadius: 4, boxShadow: 3 }} key={index}>
                            <CardMedia
                                component="img"
                                alt={feature.title}
                                image={feature.imgUrl}
                                sx={{ borderRadius: '4px 4px 0 0', fill: true }}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {feature.description}
                            </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}