import { createSlice } from "@reduxjs/toolkit";

export const AgentChatSilice = createSlice({
    name: 'agentChatSlice',
    initialState: {

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

const messagerReducer = AgentChatSilice.reducer;
export default messagerReducer;

export const userAction = AgentChatSilice.actions;

export const userState = (state) => state.conversations.conversations