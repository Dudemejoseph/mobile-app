import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios_config";

const initialState = {
  loading: false,
  error: null,
  message: null,
  inventory: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    setError: (state, { payload }) => {
      (state.loading = false), (state.error = payload), (state.message = null);
    },
    setMessage: (state, { payload }) => {
      (state.loading = false), (state.error = null), (state.message = payload);
    },
    setInventory: (state, { payload }) => {
      state.loading = false;
      state.inventory = payload;
    },
    clear: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const { fetch, setError, setMessage, setInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
export const inventorySelector = (state) => state.inventory;

// ========== Create Inventory ==========
export const addInventory = (data) => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axiosInstance.post("/inventory", data);
      dispatch(setMessage("Inventory recorded successfully"));
      dispatch(setInventory(res.data.result.data));
      // dispatch(clear());
    } catch (error) {
      dispatch(setError(error.response.data.message));
    }
  };
};

export const fetchInventory = (type) => {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      // const res = await axiosInstance.get("/inventory");
      const res = await axiosInstance.get(`inventories/type?type=${type}`);
      console.log("res ===== > ", res.data.inventory);
      dispatch(setInventory(res?.data?.inventory));
    } catch (error) {
      console.error("inv error ", error);
      dispatch(setError(error.response.data.message));
    }
  };
};
