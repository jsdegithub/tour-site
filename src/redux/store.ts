import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { actionLog } from "./middlewares/actionLog";
import { changeLanguage } from "./middlewares/changeLanguage";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  searchProduct: productSearchSlice.reducer,
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    actionLog,
    changeLanguage,
  ],
  devTools: true,
});

const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default { store, persistedStore };
