import { combineReducers } from "@reduxjs/toolkit"
import { userSlice } from '../slices/user'
import { postsApi } from "../rtk/posts";
import {commentsApi} from "../rtk/comments";

const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer
})


export default rootReducer