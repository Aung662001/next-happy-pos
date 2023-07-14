import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { orderLine as OrderLine } from "@prisma/client";

interface OrderLineTable {
  isLoading: boolean;
  items: OrderLine[];
  error: null | Error;
}

const initialState: OrderLineTable = {
  isLoading: false,
  items: [],
  error: null,
};

export const orderLinesSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderLines: (state, actions) => {
      state.items = actions.payload;
    },
    addOrderLine: (state, action: PayloadAction<OrderLine>) => {
      state.items = [...state.items, action.payload];
    },
    removeOrderLine: (state, action: PayloadAction<OrderLine>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { setOrderLines, addOrderLine, removeOrderLine } =
  orderLinesSlice.actions;
export default orderLinesSlice.reducer;
