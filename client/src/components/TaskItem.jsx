



import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = ({ task, index, onUpdateTask,onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateTask(task._id, { title: newTitle });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task._id);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div 
          className="task-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
         
           {isEditing ? (
            <div>
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <div>{task.title}
                </div>
              
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
         
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
