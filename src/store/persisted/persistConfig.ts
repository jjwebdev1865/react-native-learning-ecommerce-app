import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import cartSlice from "../reducers/cartSlice";

// references the store slices
const persistConfig = {
  key: "cart",
  storage: AsyncStorage,
  whitelist: ["items"], // only persist the items array
};

export const persistedCartSlice = persistReducer(persistConfig, cartSlice);
