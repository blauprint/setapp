import styles from "@/styles/TodoCard.module.css";
import { TodoItem } from "@/types/typedefs";
import formatDateFromNow from "@/utils/dateFormatter";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useState } from "react";

interface TodoCardProps {
  todo: TodoItem;
  handleDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, handleDelete }) => {
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
  
  function handleEditOnClick(e: React.SyntheticEvent) {
    e.stopPropagation();
  }

  return (
    <div className={styles.todoCard}
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
      {isHovered && (
        <div className={styles.editBtnContainer}>
          <button className={styles.editBtn} onClick={handleDeleteOnClick}>
            <AiOutlineEdit className={styles.editIcon} />
          </button>
        </div>
      )}
      <div className={styles.todo}>{todo.title}</div>
      <div className={styles.createdAt}>Created: {todoDate}</div>
    </div >
  )
}

export default TodoCard;
