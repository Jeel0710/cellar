import { Container, Alert, IconButton, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddItem from '../components/AddItem';
import Item from '../components/Item';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useSelector } from 'react-redux';

const Menu = () => {

    const [cards, setCards] = useState([]);

    const [open, setOpen] = useState(false);

    let usertype = useSelector(state => state.loggedInUser.usertype);


    useEffect(() => {
        fetch('/API/menu', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 500) {
                return undefined;
            }
            return response.json();
        }).then(data => {
            if (data === undefined) {
                setCards([]);
            } else {
                setCards(data);
            }
        })
        return () => {
            return false;
        }
    }, []);

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <AddItem opencard={open} setOpenCard={setOpen} />
            <Grid container spacing={4}>
                {
                    (usertype === 1)
                    &&
                    (
                        <>
                            <Grid item xs={12}>
                                <Alert
                                    severity="info"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            onClick={() => setOpen(true)}
                                        >
                                            <MenuBookIcon />
                                        </IconButton>
                                    }
                                >
                                    <Typography component="h1" variant="h6">
                                        Add To Menu
                                    </Typography>
                                </Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </>
                    )
                }
                <Grid item xs={12}>
                    <Typography component="h5" variant="h4">
                        Menu Item
                    </Typography>
                </Grid>
                {
                    (cards.length > 0)
                    &&
                    cards.map((card, key) => (
                        <Grid item key={key} xs={12} sm={6} md={4}>
                            <Item food={card} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}

export default Menu;