import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiReducer';
import axios from 'axios';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.cartItems = action.payload.cartItems;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.title === newItem.title
            );
            if (!existingItem) {
                state.cartItems.push({
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    id: newItem.id,
                });
            } else {
                existingItem.quantity++;
            }
            state.totalQuantity++;
            state.changed = true;
        },
        removeItemFromCart(state, action) {
            const itemRemoved = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.title === itemRemoved.title
            );
            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.title !== itemRemoved.title
                );
            } else {
                existingItem.quantity--;
            }
            state.totalQuantity--;
            state.changed = true;
        },
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
    },
});

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await axios.get(
                'https://redux-max-project-default-rtdb.firebaseio.com/cart.json'
            );

            return JSON.parse(response.data.body);
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            await axios.put(
                'https://redux-max-project-default-rtdb.firebaseio.com/cart.json',
                {
                    body: JSON.stringify({
                        cartItems: cart.cartItems,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    };
};

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
