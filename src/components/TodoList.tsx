import styles from '@/styles/TodoList.module.css';
import TodoCard from './TodoCard';
import generateUUID from '@/utils/uuidGenerator';

interface TodoListProps {
  todos: string[];
}

function TodoList({ todos }: TodoListProps) {
  console.log(todos);
  const ids = generateUUID(todos.length);
  return (
    <div className={styles.todosList}>
      {todos.map((todo, index) => (
        <TodoCard key={ids[index]} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
