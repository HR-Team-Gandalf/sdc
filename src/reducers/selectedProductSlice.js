import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  selectedProduct: {
    "id": 37311,
    "campus": "hr-rfe",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "created_at": "2021-08-13T14:37:33.145Z",
    "updated_at": "2021-08-13T14:37:33.145Z",
    "features": [
        {
            "feature": "Fabric",
            "value": "Canvas"
        },
        {
            "feature": "Buttons",
            "value": "Brass"
        }
    ]
  },
  yourOutfitLoad : []
};


const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    selectedProductRequest(state) {
      state.isLoading = true;
    },
    selectedProductRequestSuccess(state, action) {
      state.selectedProduct = action.payload
      state.isLoading = false;
    },
    yourOutfitLoadRequestSuccess(state, action) {
      state.yourOutfitLoad = action.payload
    },
  },
});

export default selectedProductSlice;
