import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { companies as Companies } from "@prisma/client";

interface CompaniesType {
  isLoading: boolean;
  items: Companies[];
  error: null | Error;
}
const initialState: CompaniesType = {
  isLoading: false,
  items: [],
  error: null,
};
export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.items = action.payload;
    },
    removeCompanies: (state, action: PayloadAction<Companies>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    addCompanies: (state, action: PayloadAction<Companies>) => {
      state.items = [...state.items, action.payload];
    },
  },
});
export const { setCompanies, removeCompanies, addCompanies } =
  companiesSlice.actions;
export default companiesSlice.reducer;
