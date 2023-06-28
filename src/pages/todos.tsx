import TodoList from "@/components/TodoList";
import {todos} from '../mocks/todos';

export default function TodosPage() {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
    </div>
  );
};

