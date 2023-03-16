import jsonData from "../data/data.json";

export const kanbanAddTask = (oldData, newTask) => {
    return {
        tasks: [...oldData.tasks, newTask],
        columns: {
            to_do: {
                id: jsonData.columns.to_do.id,
                title: jsonData.columns.to_do.title,
                taskIds: [...oldData.columns.to_do.taskIds, Number(oldData.tasks.length)],
            },
            in_progress: {
                id: jsonData.columns.in_progress.id,
                title: jsonData.columns.in_progress.title,
                taskIds: oldData.columns.in_progress.taskIds,
            },
            done: {
                id: jsonData.columns.done.id,
                title: jsonData.columns.done.title,
                taskIds: oldData.columns.done.taskIds,
            }
        },
        columnOrder: jsonData.columnOrder
    }
}

export const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
        ...sourceCol,
        taskIds: newTaskIds,
    };

    return newColumn;
};