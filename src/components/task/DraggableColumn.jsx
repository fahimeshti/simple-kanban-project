import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const DraggableColumn = ({ column, tasks }) => {

    return (
        <div className="w-full border-gray-700 border md:min-h-screen h-full">
            <div className="w-full bg-primary py-4 border-b border-gray-700">
                <div className="capitalize font-inter font-bold md:text-2xl leading-normal text-gray-700 text-center">
                    {column?.title}
                </div>
            </div>

            <Droppable droppableId={column.id}>
                {(droppableProvided, droppableSnapshot) => (
                    <div
                        className={`${(droppableSnapshot.draggingFromThisWith || droppableSnapshot.draggingOverWith) ? 'bg-gray-100' : "bg-white"} min-h-screen p-4 md:mx-2 lg:mx-0 space-y-4`}
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        {tasks?.map((task, index) => (
                            <Draggable key={task?.id} draggableId={`${task?.id}`} index={index}>
                                {(draggableProvided) => (

                                    <div
                                        key={task?.id}
                                        className={` bg-[#ddd] border shadow-sm h-24 border-gray-700 hover:border-gray-900 py-4 px-2 md:px-4 overflow-hidden`}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        <div className="h-full flex items-center justify-center">
                                            <p className="font-inter text-xs md:text-xl font-semibold leading-none text-gray-700 break-words">
                                                {task?.title}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default DraggableColumn;
