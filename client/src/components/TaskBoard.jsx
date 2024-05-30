

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';

const TaskBoard = ({ tasks, setTasks, socket, onUpdateTask, onDeleteTask }) => {
  const columns = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: []
  };

  tasks.forEach(task => {
    columns[task.status].push(task);
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destinationColumn.splice(destination.index, 0, movedTask);

    setTasks(tasks.map(task => 
      task._id === movedTask._id 
        ? { ...task, status: destination.droppableId } 
        : task
    ));

    onUpdateTask(movedTask._id, { status: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {Object.keys(columns).map(columnId => (
          <TaskColumn 
            key={columnId}
            columnId={columnId}
            tasks={columns[columnId]}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
