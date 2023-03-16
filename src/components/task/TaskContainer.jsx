import React from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addTask } from '../../redux/inputSlice';
import { reorderColumnList } from '../../utils/utils';
import DraggableColumn from "./DraggableColumn"


function TaskContainer() {
    const tasks = useSelector(state => state.tasks.task);
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        const { destination, source } = result;
        // If user tries to drop in an unknown destination
        if (!destination) return;

        // if the user drags and drops back in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // If the user drops within the same column but in a different position //
        const sourceCol = tasks.columns[source.droppableId];
        const destinationCol = tasks.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(
                sourceCol,
                source.index,
                destination.index
            );

            const newState = {
                ...tasks,
                columns: {
                    ...tasks.columns,
                    [newColumn.id]: newColumn,
                },
            };
            dispatch(addTask(newState));
            return;
        }

        // If the user moves from one column to another
        const startTaskIds = Array.from(sourceCol.taskIds);
        const [removed] = startTaskIds.splice(source.index, 1);
        const newStartCol = {
            ...sourceCol,
            taskIds: startTaskIds,
        };

        const endTaskIds = Array.from(destinationCol.taskIds);
        endTaskIds.splice(destination.index, 0, removed);
        const newEndCol = {
            ...destinationCol,
            taskIds: endTaskIds,
        };

        const newState = {
            ...tasks,
            columns: {
                ...tasks.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        };
        dispatch(addTask(newState));
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="h-auto min-h-screen px-4 py-4 bg-bgGray">
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center pt-4 md:p-4">
                            <div className="w-full max-w-6xl">

                                <div className="font-inter bg-white">
                                    {!(tasks?.tasks) ?
                                        <div className="p-4">
                                            No data available
                                        </div>
                                        :
                                        <>
                                            <div className="my-0 w-full px-0 pb-0">
                                                <div className="w-full grid grid-cols-3 gap-4">
                                                    {tasks?.columnOrder?.map((columnId) => {
                                                        const column = tasks.columns[columnId];
                                                        const allTasks = column.taskIds.map((taskId) => tasks.tasks[taskId]);

                                                        return <DraggableColumn
                                                            key={column.id}
                                                            column={column}
                                                            tasks={allTasks}
                                                        />;
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </DragDropContext>
        </>
    )
}

export default TaskContainer;
