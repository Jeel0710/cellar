import { Grid, Container, Typography, Card, CardHeader, Box, CardActions, CardContent, Button } from '@mui/material';
import { userStore } from "../storage/store";

const RemoveShop = () => {

    function downgradeUser(e) {
        fetch('/API/shop', {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shop_owner: userStore.getState().loggedInUser.username
            })
        }).then(response => {
            if (response.status === 500) {
                return undefined;
            }
            return response.json();
        }).then(data => {
            if (data === undefined) {
                window.alert("Unsuccessfull in Process.");
            } else {
                window.alert("Successfully Done.");
                //set the cookie or set the local storage to keep user loggedIn during refresh
                window.localStorage.setItem("user", JSON.stringify({
                    username: userStore.getState().loggedInUser.username,
                    password: userStore.getState().loggedInUser.password,
                    usertype: 2
                }));
                window.location.reload();
            }
         })
    }

    return (
        <Grid container spacing={2} style={{ marginBottom: '10px' }}>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h2"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Pricing
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" component="p">
                    If you want to upgrad your status and create a shop on this website you are very much welcome.
                    you can see the card below. You can proceed from there.
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Card>
                    <CardHeader
                        title="Free"
                        subheader="Customer Account"
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{
                            align: 'center'
                        }}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[700],
                        }}
                    />
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'baseline',
                                mb: 2,
                            }}
                        >
                            <Typography component="h2" variant="h3" color="text.primary">
                                0
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                /mo
                            </Typography>
                        </Box>
                        <Typography variant="h6" align="center" color="text.secondary" component="p">
                            Downgrade your self to customer level. Its free for use.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            fullWidth
                            onClick={(e) => downgradeUser(e)}
                            variant="contained"
                        >
                            Downgrade
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Grid>
    );
}

export default RemoveShop;