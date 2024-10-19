import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

// Define the interface for a Card
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

// Define the interface for the state managed by this slice
interface ProductState {
  productDetails: Product[];
  updated: boolean;
}

const initialState: ProductState = {
  productDetails: [
    {
      id: "1a",
      name: "Fork",
      image:
        "https://m.media-amazon.com/images/I/61z0LVrrowL._AC_UF894,1000_QL80_.jpg",
      price: 12000,
      stock: 2,
    },
    {
      id: "2b",
      name: "Spoon",
      image:
        "https://static.sciencelearn.org.nz/images/images/000/003/665/full/PropMatter_ART_Properties_of_materials_an_introduction_Spoon.jpg?1674171454",
      price: 15000,
      stock: 5,
    },
    {
      id: "3c",
      name: "Plate",
      image:
        "https://thumbs.dreamstime.com/b/white-empty-plate-dark-wooden-table-ristic-88710795.jpg",
      price: 12000,
      stock: 4,
    },
    {
      id: "4d",
      name: "Mug",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFVetM2onyEPBB77ghOtxcuHT-TESgmnO8g&s",
      price: 14000,
      stock: 3,
    },
  ],
  updated: false,
};

// Create a Redux slice for managing card data
const productSlice = createSlice({
  name: "products", // Name of the slice
  initialState, // Initial state
  reducers: {
    addResource(state, action) {
      const resources = action.payload;
      state.productDetails = [...state.productDetails, resources];
      state.updated = !state.updated;
      console.log(state.productDetails);
    },
    deleteResource(state, action) {
      const resources = action.payload;
      state.productDetails = [...state.productDetails];
      const newProduct = state.productDetails.filter(
        (item) => item.id !== resources.id
      );
      state.productDetails = newProduct;
      state.updated = !state.updated;
    },
    updateResource(state, action) {
      const resources = action.payload;
      state.productDetails = [...state.productDetails];

      const newProduct = state.productDetails.findIndex(
        (item) => item.id === resources.id
      );
      state.productDetails[newProduct] = resources;
      state.updated = !state.updated;
    },
  },
});

// Export the action creator for getResourcesSuccess
export const { addResource, deleteResource, updateResource } =
  productSlice.actions;

// Export the reducer
export default productSlice.reducer;

// Define an asynchronous action creator to fetch card resources from an API
