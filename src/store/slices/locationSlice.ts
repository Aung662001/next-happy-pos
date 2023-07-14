import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { locations as Locations } from "@prisma/client";

interface LocationsType {
  isLoading: boolean;
  items: Locations[];
  error: null | Error;
}
const initialState: LocationsType = {
  isLoading: false,
  items: [],
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.items = action.payload;
    },
    addLocation: (state, action: PayloadAction<Locations>) => {
      state.items = [...state.items, action.payload];
    },
    removeLocation: (state, action: PayloadAction<Locations>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});
export const { setLocation, addLocation, removeLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
