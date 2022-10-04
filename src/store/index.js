import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartReducer';
import { uiReducer } from './uiReducer';

export const store = configureStore({
    reducer: { cart: cartReducer, ui: uiReducer },
});
