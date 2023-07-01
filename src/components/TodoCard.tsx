import styles from "@/styles/TodoCard.module.css";

interface TodoCardProps {
  todo: string;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {


  const colors = ['var(--color-card-1)', 'var(--color-card-2)', 'var(--color-card-3)', 'var(--color-card-4)', 'var(--color-card-5)'];

  return (
    <div className={styles.todoCard} style={{
      backgroundColor: colors[Math.floor(Math.random() * 5)]
    }}>
      {todo}
      <label className={styles.checkboxContainer}>
        <input className={styles.inputCheckbox} type="checkbox" />

        {/* <span className={styles.checkmark}></span> */}
      </label>
    </div >
  )
}

export default TodoCard;
