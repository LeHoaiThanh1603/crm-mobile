import messagerReducer from "@/slices/messageSlice"
import seenMessageReducer from "@/slices/seenMessageSlice"

const { configureStore } = require("@reduxjs/toolkit")

// const initialState = {
//     conversations: messagerReducer
// }

const store = configureStore({
    reducer: {
        messagerReducer,
        seenMessageReducer
    },
})

export default store