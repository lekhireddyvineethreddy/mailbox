import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import InboxReducer from "./inboxSlice";
import SentboxReducer from "./sentboxSlice";

const store = configureStore({
    reducer: { auth: AuthReducer, inbox: InboxReducer, sentbox: SentboxReducer }
})

export default store;