import styles from '@/styles/TodoList.module.css';
import TodoCard from './TodoCard';
import { deleteTodo, updateTodo } from '@/redux/currentProjectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useAuth } from '@clerk/nextjs';
import { Auth } from '@/types/Auth';
import { deleteTodoService, updateTodoService } from '@/services/projectsService';
import { TodoItem } from '@/types/typedefs';

function TodoList() {

  const select = useAppSelector((state: RootState) => state.selected);
  let todoList: TodoItem[] = [];

  if (select === 'todosBE') {
    useAppSelector((state: RootState) => { todoList = state.currentProject.backend.todoList })
  } else if (select === 'todosFE') {
    useAppSelector((state: RootState) => { todoList = state.currentProject.frontend.todoList })
  }
  const sortedTodos = [...todoList].sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    } else if (!a.done && b.done) {
      return -1;
    } else {
      return 0;
    }
  });
  const {
    userId,
    sessionId,
    isLoaded,
    getToken,
    isSignedIn,
    signOut,
    orgId,
    orgRole,
    orgSlug,
  } = useAuth();

  const auth: Auth = {
    userId: userId?.toString(),
    sessionId: sessionId?.toString(),
    sessionToken: getToken,
    isLoaded: isLoaded,
    isSignedIn: isSignedIn,
    signOut: signOut,
    orgId: orgId?.toString(),
    orgRole: orgRole?.toString(),
    orgSlug: orgSlug?.toString(),
  };

  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
    deleteTodoService(auth, id).then(() => {
    }).catch(error => {
      throw new Error('Error deleting error from server\n', error);
    })
  };

  const handleTitleChange = (todo: TodoItem) => {
    dispatch(updateTodo(todo));
    updateTodoService(auth, todo).then(() => {
    }).catch((error) => {
      console.log(error, 'todo error')
      throw new Error('Error updating todo title from server\n', error);
    });
  }
  const handleCheckboxChange = (todo: TodoItem) => {
    dispatch(updateTodo(todo));
    updateTodoService(auth, todo).then(() => {
    }).catch((error) => {
      console.log(error, 'todo error')
      throw new Error('Error updating todo title from server\n', error);
    });
  }

  return (
    <div className={styles.todosList}>
      {sortedTodos.map((todo: TodoItem) => (
        <TodoCard key={todo.id} todo={todo} handleTitleChange={handleTitleChange} handleDelete={handleDelete} handleCheckboxChange={handleCheckboxChange} />
      ))}
    </div>
  );
}

export default TodoList;

