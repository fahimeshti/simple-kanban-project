import { createSlice } from "@reduxjs/toolkit";
import initialTask from "../data/data.json";

const inputSlice = createSlice({
    name: "task",
    initialState: {
        task: JSON.parse(localStorage.getItem('tasks')) || initialTask
    },
    reducers: {
        addTask: (state, action) => {
            state.task = action.payload;
            localStorage.setItem('tasks', JSON.stringify(action.payload));
        }

    },
});

export const { addTask } = inputSlice.actions;
export default inputSlice.reducer;
