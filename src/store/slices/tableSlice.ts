import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tables as Tables } from "@prisma/client";

interface TablesType {
  isLoading: boolean;
  items: Tables[];
  error: Error | null;
}
const initialState: TablesType = {
  isLoading: false,
  items: [],
  error: null,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.items = action.payload;
    },
    addTable: (state, action: PayloadAction<Tables>) => {
      state.items = [...state.items, action.payload];
    },
    removeTable: (state, action: PayloadAction<Tables>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { setTables, addTable, removeTable } = tableSlice.actions;
export default tableSlice.reducer;
