import { createStore } from 'redux';
import reducer from './reducer';

//creating the store using the given reducer function
let initialuserStore = {
    loggedInUser: {
        username: null,
        password: null,
        usertype: 1
    },
    promo: [],
    cart: []
};

//retrieve the user from the local storage
const user = JSON.parse(window.localStorage.getItem("user"));
const cart = JSON.parse(window.localStorage.getItem("cart"));
const promo = JSON.parse(window.localStorage.getItem("promo"));

//if its available then set it
if (user) {
    initialuserStore = {
        ...initialuserStore,
        loggedInUser: 
        {
            ...initialuserStore.loggedInUser,
            username: user.username,
            password: user.password,
            usertype: user.usertype
        }
    };
    if (cart) {
        initialuserStore = {
            ...initialuserStore,
            cart: cart
        }
    }
    if (promo) {
        initialuserStore = {
            ...initialuserStore,
            promo: promo
        }
    }
}

//create the global storage
export const userStore = createStore(
    reducer,
    initialuserStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);