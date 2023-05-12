import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'message slice',
    initialState: {
        conversations: {
            idUserMessage: ''
        },
    },
    reducers: {
        selectUserMessager: (state, action) => {
            state.conversations = {
                ...state.conversations,
                ...action.payload
            }

        }
    }
})

const messagerReducer = messageSlice.reducer;
export default messagerReducer;

export const userAction = messageSlice.actions;

export const userState = (state) => state.messagerReducer.conversations