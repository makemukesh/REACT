import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const exist = state.items.find((p) => (p._id || p.id) === (item._id || item.id));

            if (exist) {
                exist.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => (item._id || item.id) !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        increaseQty: (state, action) => {
            const item = state.items.find((item) => (item._id || item.id) === action.payload);
            if (item) item.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        decreaseQty: (state, action) => {
            const item = state.items.find((item) => (item._id || item.id) === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter((i) => (i._id || i.id) !== action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart");
        },
    },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;