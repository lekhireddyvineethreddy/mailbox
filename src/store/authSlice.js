import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenId: localStorage.getItem("token"),
    userEmail: localStorage.getItem("email"),
    isLoggedIn: localStorage.getItem("isLoggedIn")
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.tokenId = action.payload.tokenId;
            localStorage.setItem("token", action.payload.tokenId);
            state.userEmail = action.payload.userEmail;
            localStorage.setItem("email", action.payload.userEmail);
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn" , true);
        },
        logOut(state) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            state.isLoggedIn = false;
            localStorage.removeItem("isLoggedIn");
        }
    }
})

export const authAction = AuthSlice.actions;

export default AuthSlice.reducer;