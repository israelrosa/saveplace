import { configureStore, CombinedState } from '@reduxjs/toolkit';
import createSecureStore from 'redux-persist-expo-securestore';
import {
  persistReducer,
  persistStore,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducers from './reducers';

const storage = createSecureStore();

const persistConfig: PersistConfig<CombinedState> = {
  key: 'root',
  storage,
  whitelist: ['auth.token'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        serializableCheck: { ignoredPaths: ['queue.queueDetail'] }
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
