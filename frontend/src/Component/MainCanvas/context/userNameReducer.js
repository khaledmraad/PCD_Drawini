import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: [0]
};

const contentSlice = createSlice({
    name: 'userName',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            const { newName } = action.payload;

            state.userName=[newName];
        },
    }
});

export const  {setUserName} =contentSlice.actions
export default contentSlice.reducer;
