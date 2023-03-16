import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/inputSlice';
import { kanbanAddTask } from "../utils/utils";

function AddTaskForm() {
    const [inputValue, setInputValue] = useState('')
    const tasks = useSelector(state => state.tasks.task);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue) {
            const newTask = {
                id: Date.now(),
                title: inputValue
            }
            const updatedData = kanbanAddTask(tasks, newTask)
            dispatch(addTask(updatedData))
            setInputValue('')
        }
    }

    return (
        <>
            <div className='w-full text-lg flex items-center justify-center p-4 pt-12 pb-4 md:p-10'>
                <form onSubmit={handleSubmit} className='flex gap-4'>
                    <input
                        className='md:w-80 border border-gray-700 px-4 py-3 hover:border-gray-900 outline-none focus:border-primary'
                        type="text"
                        name='task'
                        placeholder='Write your task ...'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        required
                    />
                    <button className='font-semibold px-8 py-3 border border-gray-700 text-primary bg-transparent hover:bg-primary hover:text-white transition duration-100 hover:bg-primary/80'>Add</button>
                </form>
            </div>
        </>
    )
}

export default AddTaskForm;
