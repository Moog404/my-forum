import thunkMiddleware from 'redux-thunk'
import { configureStore } from "@reduxjs/toolkit"
import { localStorageAuthMiddleware } from "./middlewares/localStorageAuth"
import { loginMiddleware } from "./middlewares/login"
import rootReducer from "./reducers"
import {commentsApi} from "./rtk/comments";
import {postsApi} from "./rtk/posts";


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
      .prepend(localStorageAuthMiddleware, loginMiddleware)
      .concat(thunkMiddleware)
      .concat(commentsApi.middleware)
      .concat(postsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store