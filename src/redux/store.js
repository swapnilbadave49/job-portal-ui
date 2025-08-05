import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from "./authSlice";
import jobslice from "./jobslice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

// ✅ Persist only the `user` field from auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

// Persist other slices fully
const jobPersistConfig = {
  key: "job",
  storage,
  
};

const companyPersistConfig = {
  key: "company",
  storage,
};

const applicationPersistConfig = {
  key: "application",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  job: persistReducer(jobPersistConfig, jobslice),
  company: persistReducer(companyPersistConfig, companySlice),
  application: persistReducer(applicationPersistConfig, applicationSlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
