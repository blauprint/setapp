import styles from "@/styles/TodoCard.module.css";
import { TodoItem } from "@/types/typedefs";
import formatDateFromNow from "@/utils/dateFormatter";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useState } from "react";

interface TodoCardProps {
  todo: TodoItem;
  handleDelete: (id: string) => void;
  handleTitleChange: (todo: TodoItem) => void;
  handleCheckboxChange: (todo: TodoItem) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, handleDelete, handleTitleChange, handleCheckboxChange }) => {
  const colors = ['var(--color-card-1)', 'var(--color-card-2)', 'var(--color-card-3)', 'var(--color-card-4)', 'var(--color-card-5)'];
  const todoDate = formatDateFromNow(todo.createdAt);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function handleDeleteOnClick(e: React.SyntheticEvent) {
    e.stopPropagation();
    handleDelete(todo.id);
  }

  function handleTodoKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const updatedTitle = e.currentTarget.textContent;
      if (updatedTitle) {
        handleTitleChange({ ...todo, title: updatedTitle })
        e.currentTarget.blur();
      }
    }
  }

  function handleTodoBlur(e: React.FocusEvent<HTMLDivElement>) {
    const updatedTitle = e.currentTarget.textContent;
    if (updatedTitle) {
      handleTitleChange({ ...todo, title: updatedTitle });
    }
  }

  function handleCardCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedTodo = {...todo};
    updatedTodo.done = e.target.checked;
    handleCheckboxChange(updatedTodo);
  }

  return (
    <>
      <div className={`${todo.done ? styles.todoCardDone : styles.todoCard}`}
        style={{
          backgroundColor: colors[Math.floor(Math.random() * 5)]
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && (
          <div className={styles.deleteBtnContainer}>
            <button className={styles.deleteBtn} onClick={handleDeleteOnClick}>
              <AiOutlineDelete className={styles.deleteIcon} />
            </button>
          </div>
        )}
        <div
          suppressContentEditableWarning={true}
          contentEditable="true"
          className={styles.todo}
          onKeyDown={handleTodoKeyDown}
          onBlur={handleTodoBlur}
        >{todo.title}</div>
        <div className={styles.createdAt}>Created: {todoDate}</div>
      </div >
      <input type="checkbox" checked={todo.done} onChange={handleCardCheckboxChange}></input>
    </>
  )
}

export default TodoCard;
