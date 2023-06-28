import styles from "@/styles/ProjectCard.module.css";
import TodoCard from './TodoCard';

interface TodoListProps {
  todos: string[];
}

function TodoList({todos}: TodoListProps) { 
  return (
    <>
      <div className={styles.projectsList}>
        {todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default TodoList;
