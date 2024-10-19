import { combineReducers } from "redux";

import mainSliceReducer from "./slices/mainSlice";

const rootReducer = combineReducers({
  products: mainSliceReducer,
});

export default rootReducer;
