import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sentEmail: [],
    sentmessageOpen: JSON.parse(localStorage.getItem("messageOpen"))
}

const sentboxSlice = createSlice({
    name: "sentbox",
    initialState,
    reducers: {
        addEmail(state, action) {
            state.sentEmail = action.payload
        },
        addMessageOpen(state, action) {
            state.sentmessageOpen = action.payload[1];
            const msgopen = JSON.stringify(action.payload[1]);
            localStorage.setItem("messageOpen", msgopen)
        },
        removeItem(state, action) {
            const filterEmail = state.sentEmail.filter((email) => email[0] !== action.payload[0]);
            state.sentEmail = filterEmail;
        }
    }
})

export const sentboxAction = sentboxSlice.actions;

export const sentboxFill = (email) => {
    return async (dispatch) => {
        try {
            const user = email.replace(/[.@]/g, "");
            const response = await fetch(`https://mailbox-1027f-default-rtdb.firebaseio.com/${user}/sendEmail.json`)
            if (response.ok) {
                const data = await response.json();
                if (data === null) {
                   // alert("You don't have any message")
                } else {
                    const emailsArray = Object.entries(data);
                    dispatch(sentboxAction.addEmail(emailsArray))
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

export default sentboxSlice.reducer;