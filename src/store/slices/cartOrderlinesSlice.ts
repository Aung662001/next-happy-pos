import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { companies as Companies } from "@prisma/client";
import { OrderLine } from "@/typings/types";

interface CompaniesType {
  isLoading: boolean;
  items: OrderLine[];
  error: null | Error;
}
const initialState: CompaniesType = {
  isLoading: false,
  items: [],
  error: null,
};
export const cartOrderlinesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCartOrderlines: (state, action) => {
      state.items = action.payload;
    },
    removeCartOrderlines: (state, action: PayloadAction<Companies>) => {
      state.items = state.items.filter(
        (item) => item.menu.id !== action.payload.id
      );
    },

    // addCompanies: (state, action: PayloadAction<Companies>) => {
    //   state.items = [...state.items, action.payload];
    // },
  },
});
export const { setCartOrderlines, removeCartOrderlines } =
  cartOrderlinesSlice.actions;
export default cartOrderlinesSlice.reducer;
