import styles from "@/styles/ProjectCard.module.css";

interface TodoCardProps {
  todo: string;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {


  const colors = ['var(--color-card-1)', 'var(--color-card-2)', 'var(--color-card-3)', 'var(--color-card-4)', 'var(--color-card-5)'];

  return (
    <div className={styles.projectCard} style={{
      backgroundColor: colors[Math.floor(Math.random() * 5)]
    }}>
      {todo}
    </div >
  )
}

export default TodoCard;
