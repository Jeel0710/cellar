import { Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography, Alert } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import breakfast from "../Images/breakfast.svg";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { userStore } from '../storage/store';
import { ADD_TO_CART, UPDATE_QUANTITY } from '../storage/actiontype';

const Item = ({ food }) => {

    let quantity = useSelector(state => {
        let flag = undefined;
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id === food.item_id) {
                flag = state.cart[i].quantity;
                break;
            }
        }
        return flag;
    }) || 0;

    //button is active or not.
    let cart = useSelector(state => {
        let flag = false;
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id === food.item_id) {
                flag = true;
                break;
            }
        }
        return flag;
    });

    //Add the item into the cart
    function AddToCart(e) {
        e.preventDefault();
        userStore.dispatch({
            type: ADD_TO_CART,
            payload: {
                item_id: food.item_id,
                item_name: food.item_name,
                item_price: food.item_price,
                shop_owner: food.shop_owner
            }
        });
        window.localStorage.setItem("cart", JSON.stringify(userStore.getState().cart));
    }

    function RemoveItem(e) {
        e.preventDefault();
    }

    return (
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                src={breakfast}
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {food.item_name}
                </Typography>
                <Alert>
                    {food.item_description}
                </Alert>
                <Typography>
                    Price: {food.item_price}
                </Typography>
                <Typography>
                    Shop-Name: {food.shop_name}
                </Typography>
                <Typography>
                    Seller: {food.shop_owner}
                </Typography>
                Quantity: <ButtonGroup
                    disabled={!cart}
                    variant="contained"
                    size="small"
                >
                    <Button
                        title="Add"
                        onClick={
                            () => {
                                userStore.dispatch({
                                    type: UPDATE_QUANTITY,
                                    payload: {
                                        id: food.item_id,
                                        quantity: (quantity + 1)
                                    }
                                })
                                window.localStorage.setItem("cart", JSON.stringify(userStore.getState().cart));
                            }
                        }
                    >
                        <AddIcon />
                    </Button>
                    <Button
                        title="Remove"
                        onClick={
                            () => {
                                userStore.dispatch({
                                    type: UPDATE_QUANTITY,
                                    payload: {
                                        id: food.item_id,
                                        quantity: (quantity - 1)
                                    }
                                })
                                window.localStorage.setItem("cart", JSON.stringify(userStore.getState().cart));
                            }
                        }
                    >
                        <RemoveIcon />
                    </Button>
                </ButtonGroup>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    title="Order"
                >
                    <Link
                        style={{
                            textDecoration: "none"
                        }}
                        className="text-light"
                        to='/Payment'
                    >
                        <LocalAtmTwoToneIcon />
                    </Link>
                </Button>
                {
                    (food.shop_owner === userStore.getState().loggedInUser.username)
                    &&
                    <Button
                        size="small"
                        variant="contained"
                        title="Remove"
                        onClick={(e) => RemoveItem(e)}
                        color="secondary"
                    >
                        <RemoveIcon />
                    </Button>
                }
                <Button
                    disabled={cart}
                    size="small"
                    variant="contained"
                    title={(cart) ? "Added" : "Add-To-Cart"}
                    onClick={(e) => AddToCart(e)}
                >
                    {(cart) ? <CheckCircleIcon /> : <AddShoppingCartIcon />}
                </Button>
            </CardActions>
        </Card>
    );
}

export default Item;