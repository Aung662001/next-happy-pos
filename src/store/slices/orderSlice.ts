import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { orders as Orders } from "@prisma/client";

interface OrdersTable {
  isLoading: boolean;
  items: Orders[];
  error: null | Error;
}

const initialState: OrdersTable = {
  isLoading: false,
  items: [],
  error: null,
};

export const orderslice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, actions) => {
      state.items = actions.payload;
    },
    addOrder: (state, action: PayloadAction<Orders>) => {
      state.items = [...state.items, action.payload];
    },
    removeOrder: (state, action: PayloadAction<Orders>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { setOrders, addOrder, removeOrder } = orderslice.actions;
export default orderslice.reducer;
