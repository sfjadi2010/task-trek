import React from "react";
import "./TaskCard.css";
import deleteIcon from "../assets/delete.png";
import { getTagColor } from "../utils/tagManager";

const TaskCard = ({
  taskText,
  tags,
  handleDelete,
  taskIndex,
  setActiveCard,
}) => {
  return (
    <>
      <article
        className="task_card"
        draggable
        onDragStart={() => setActiveCard(taskIndex)}
        onDragEnd={() => setActiveCard(null)}
      >
        <p className="task_text">{taskText}</p>

        <div className="task_card_bottom_line">
          <div className="task_card_tags">
            {tags.map((tag, index) => {
              const tagColor = getTagColor(tag);
              const tagStyle = tagColor
                ? {
                    backgroundColor: tagColor.backgroundColor,
                    color: tagColor.textColor,
                  }
                : {};

              return (
                <span key={index} className="task-tag" style={tagStyle}>
                  {tag}
                </span>
              );
            })}
          </div>

          <div className="task_delete" onClick={() => handleDelete(taskIndex)}>
            <img src={deleteIcon} alt="delete task" className="delete_icon" />
          </div>
        </div>
      </article>
    </>
  );
};

export default TaskCard;
