import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})



export default function Page(){

    return(
        <Box
            width='100vw'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}
        >
            <Header />
            <Box
                mt={8}
                mb={4}
                xs={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h1' sx={{ fontSize: '4rem', fontFamily: anton.style.fontFamily}}>
                    Pricing Plans
                </Typography>
            </Box>
            <Box
                mx={4}
            >
                <Grid container spacing={5} height='60vh' width='100vw'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Grid 
                        item

                        xs={12} // Full width on extra-small screens
                        sm={6}  // Half width on small screens
                        md={4} 
                    >
                        <Card
                            sx={{
                                backgroundColor: '#1E293B',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '15px',
                                // color: '#000000'
                            }}
                            
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    width: '85%',

                                }}
                            >
                                <CardHeader
                                    title="Free"
                                    fontSize="10rem"
                                    titleTypographyProps={{
                                        sx: {
                                            fontSize: '2rem', // Adjust the font size as needed
                                            color: '#ffffff',
                                            textAlign: 'start'

                                        }
                                    }}
                                />
                            </Box>
                            <CardContent
                                sx={{
                                    backgroundColor: '#ffffff',
                                    width: '85%',
                                    height: '60%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Typography variant="h4" color="text.primary">
                                        $0
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">Per Month</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Access to basic features
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Limited flashcards
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Limited customization
                                    </Typography>
                                </Box>
                            </CardContent>

                            <CardActions sx={{width: '89%'}}>
                                <Button 
                                    variant="contained" 
                                    fullWidth size="small" 
                                    sx={{backgroundColor: 'white'}}
                                >
                                    <Typography variant="body1p" color='black'>Get Started</Typography>
                                </Button>
                            </CardActions>

                        </Card>
                    </Grid>
                    <Grid 
                        item

                        xs={12} // Full width on extra-small screens
                        sm={6}  // Half width on small screens
                        md={4} 
                    >
                        <Card
                            sx={{
                                backgroundColor: '#1E293B',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '15px',
                                // color: '#000000'
                            }}
                            
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    width: '85%',

                                }}
                            >
                                <CardHeader
                                    title="Basic"
                                    fontSize="10rem"
                                    titleTypographyProps={{
                                        sx: {
                                        fontSize: '2rem', // Adjust the font size as needed
                                        color: '#ffffff',
                                        textAlign: 'start'
                                        }
                                    }}
                                />
                            </Box>
                            <CardContent
                                sx={{
                                    backgroundColor: '#ffffff',
                                    width: '85%',
                                    height: '60%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Typography variant="h4" color="text.primary">
                                        $5
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">Per Month</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Access to basic features
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Limited flashcards
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Limited customization
                                    </Typography>
                                </Box>
                            </CardContent>

                            <CardActions sx={{width: '89%'}}>
                                <Button 
                                    variant="contained" 
                                    fullWidth size="small" 
                                    sx={{backgroundColor: 'white'}}
                                >
                                    <Typography variant="body1p" color='black'>Get Started</Typography>
                                </Button>
                            </CardActions>

                        </Card>
                    </Grid>
                    <Grid 
                        item

                        xs={12} // Full width on extra-small screens
                        sm={6}  // Half width on small screens
                        md={4} 
                    >
                        <Card
                            sx={{
                                backgroundColor: '#1E293B',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '15px',
                                // color: '#000000'
                            }}
                            
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    width: '85%',

                                }}
                            >
                                <CardHeader
                                    title="Pro"
                                    fontSize="10rem"
                                    titleTypographyProps={{
                                        sx: {
                                        fontSize: '2rem', // Adjust the font size as needed
                                        color: '#ffffff',
                                        textAlign: 'start'
                                        }
                                    }}
                                />
                            </Box>
                            <CardContent
                                sx={{
                                    backgroundColor: '#ffffff',
                                    width: '85%',
                                    height: '60%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Typography variant="h4" color="text.primary">
                                        $10
                                    </Typography>
                                    <Typography variant="h6" color="text.primary">Per Month</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Access to basic features
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Limited flashcards
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        ✓ Limited customization
                                    </Typography>
                                </Box>
                            </CardContent>

                            <CardActions sx={{width: '89%'}}>
                                <Button 
                                    variant="contained" 
                                    fullWidth size="small" 
                                    sx={{backgroundColor: 'white'}}
                                >
                                    <Typography variant="body1p" color='black'>Get Started</Typography>
                                </Button>
                            </CardActions>

                        </Card>
                    </Grid>

                </Grid>
                
            </Box>

        </Box>
    );

}