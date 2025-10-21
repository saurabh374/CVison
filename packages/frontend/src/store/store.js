import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import resumeReducers from "../features/resume/resumeFeatures";
import userReducers from "../features/user/userFeatures";

/**
 * Choose which reducers to persist. In this example:
 * - Persist user data (editUser)
 * - Optionally persist resume data (editResume) — comment/adjust as needed
 */

// Persist configs
const userPersistConfig = {
  key: "cvison_user",
  storage,
  whitelist: ["userData"], // persist only specific keys in the user reducer (adjust field names to your slice)
};

const resumePersistConfig = {
  key: "cvison_resume",
  storage,
  // careful with large blobs — whitelist what you need
  whitelist: ["draft", "meta"],
};

// create persisted reducers
const rootReducer = combineReducers({
  editUser: persistReducer(userPersistConfig, userReducers),
  editResume: persistReducer(resumePersistConfig, resumeReducers),
});

// configure store with middleware adjustments needed for redux-persist
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serializable actions — ignore them here
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// create persistor
export const persistor = persistStore(store);

// helper: function to purge persisted storage (useful for logout / tests)
export const purgePersisted = async () => {
  await persistor.purge();
};
