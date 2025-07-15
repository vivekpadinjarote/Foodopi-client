import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        totalPrice: parseFloat(localStorage.getItem('totalPrice')) || 0,
        totalItems: parseInt(localStorage.getItem('totalItems')) || 0,
    },
    reducers: {
        
        setCart: (state, action) => {
            const { items, totalPrice, totalItems } = action.payload;
            
                state.cartItems = items;
            
            state.totalPrice = totalPrice;
            state.totalItems = totalItems;

            
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalPrice', state.totalPrice.toString());
            localStorage.setItem('totalItems', state.totalItems.toString());
        },
        addItem: (state, action) => {
            const recievedItem = action.payload;
            const item = {
                _id: recievedItem._id,
                name: recievedItem.name,
                price: recievedItem.price,
            };
            const existingItem = state.cartItems.find((cartItem) => cartItem._id === item._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
                state.totalItems += 1;
            }

            state.totalPrice += item.price;
            

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalPrice', state.totalPrice.toString());
            localStorage.setItem('totalItems', state.totalItems.toString());
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.cartItems.find((cartItem) => cartItem._id === itemId);

            if (existingItem) {
                state.totalPrice -= existingItem.price;

                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== itemId);
                    state.totalItems -= 1;
                }else {
                    existingItem.quantity -= 1;
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalPrice', state.totalPrice.toString());
            localStorage.setItem('totalItems', state.totalItems.toString());
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalItems = 0;

            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalPrice');
            localStorage.removeItem('totalItems');
        },
    },
});

export const { setCart, addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;