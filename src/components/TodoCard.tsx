import styles from "@/styles/ProjectCard.module.css";

interface TodoCardProps {
  todo: string;
}

const TodoCard: React.FC<TodoCardProps> = ({todo}) => {
  
  return (
    <div className={styles.projectCard}>
      {todo}
    </div>
  )
}

export default TodoCard;
