import { combineReducers, configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import authReducer from './authSlice'
import storageModule from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const storage = storageModule.default;

console.log("storage", storage);


const rootReducer = combineReducers({
  auth:authReducer,
  conversation:conversationReducer
});


const persistConfig = {
  key:"root",
  storage,
  whitelist:["auth","conversation"]
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);
export const store = configureStore({
   reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store)