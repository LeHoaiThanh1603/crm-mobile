const { createSlice } = require("@reduxjs/toolkit");

const seenMessageSlice = createSlice({
    name: 'seenMessageSlice',
    initialState: {
        seen: false
    },
    reducers: {
        handleSeen: (state, action) => {
            state.seen = action.payload.seen
        }
    }
})

export const seenMessageAction = seenMessageSlice.actions

export const seenMessage = (state) => state.seenMessageReducer
const seenMessageReducer = seenMessageSlice.reducer
export default seenMessageReducer