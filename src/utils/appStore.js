import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionsReducer from "./connectonsSlice"
import requestsReducer from "./requestsSlice"

const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        requests: requestsReducer,
    },
})

export default appStore