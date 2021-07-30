import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    thunkAPI.dispatch(productDetailSlice.actions.fetchStart());
    try {
      const { data } = await axios.get(
        `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
      );
      thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data));
    } catch (error) {
      thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error.message));
    }
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
