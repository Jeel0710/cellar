import * as action_type from './actiontype';

export default function reducer(state, action) {
    switch (action.type) {
        case action_type.USER_LOGGEDIN: {
            if (state.loggedInUser.username === null) {
                return {
                    ...state,
                    loggedInUser: {
                        ...state.loggedInUser,
                        username: action.payload.username,
                        password: action.payload.password,
                        usertype: action.payload.usertype
                    }
                };
            }
            return state;
        }
        case action_type.USER_LOGOUT: {
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    username: null,
                    password: null,
                    usertype: 1
                }
            };
        }
        case action_type.ADD_TO_CART: {
            return {
                ...state,
                cart: [
                    ...state.cart, {
                        id: action.payload.item_id,
                        name: action.payload.item_name,
                        price: action.payload.item_price,
                        shop_owner: action.payload.shop_owner,
                        quantity: 1
                    }
                ]
            }
        }
        case action_type.REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(item => {
                    return (item.id !== action.payload.id);
                })
            };
        }
        case action_type.UPDATE_QUANTITY: {
            if ((state.cart.length > 0) && (action.payload.quantity > 0)) {
                let newCart = state.cart;
                for (let i = 0; i < state.cart.length; i++) {
                    if (action.payload.id === newCart[i].id) {
                        newCart[i] = {
                            ...newCart[i],
                            quantity: action.payload.quantity
                        };
                        break;
                    }
                }
                return {
                    ...state,
                    cart: [
                        ...newCart
                    ]
                }
            }
            return state;
        }
        case action_type.ADD_PROMO: {
            return {
                ...state,
                promo: [
                    ...state.promo,
                    {
                        name: action.payload.name,
                        value: action.payload.value
                    }
                ]
            };
        }
        case action_type.REMOVE_PROMO: {
            return {
                ...state,
                promo: state.promo.filter(item => {
                    return (item.name !== action.payload.name);
                })
            };
        }
        default: {
            return state;
        }
    }
}