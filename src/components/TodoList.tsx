import styles from "@/styles/ProjectCard.module.css";
import TodoCard from './TodoCard';
import generateUUID from "@/utils/uuidGenerator";

interface TodoListProps {
  todos: string[];
}

function TodoList({ todos }: TodoListProps) {
  const ids = generateUUID(todos.length);
  return (
    <>
      <div className={styles.projectsList}>
        {todos.map((todo, index) => (
          <TodoCard key={ids[index]} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default TodoList;
