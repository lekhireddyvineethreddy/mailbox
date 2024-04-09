import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inboxEmail: [],
    messageOpen: JSON.parse(localStorage.getItem("messageOpen"))
}

const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
        addEmail(state, action) {
            state.inboxEmail = action.payload
        },
        addMessageOpen(state, action) {
            state.messageOpen = action.payload[1];
            const msgopen = JSON.stringify(action.payload[1]);
            localStorage.setItem("messageOpen", msgopen)
        },
        removeItem(state, action) {
            const filterEmail = state.inboxEmail.filter((email) => email[0] !== action.payload[0]);
            state.inboxEmail = filterEmail;
        }
    }
})

export const inboxAction = inboxSlice.actions;

export const inboxFill = (email) => {
    return async (dispatch) => {
        try {
            const user = email.replace(/[.@]/g, "");
            const response = await fetch(`https://mailbox-1027f-default-rtdb.firebaseio.com/${user}/receiveEmail.json`)
            if (response.ok) {
                const data = await response.json();
                if (data === null) {
                  //  alert("You don't have any message")
                } else {
                    const emailsArray = Object.entries(data);
                    dispatch(inboxAction.addEmail(emailsArray))
                }

            } else {
                const data = await response.json();
                let errMsg = "Authentication Failed!!";

                if (data && data.error && data.error.message) {
                    errMsg = data.error.message
                }
                throw new Error(errMsg);
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default inboxSlice.reducer;