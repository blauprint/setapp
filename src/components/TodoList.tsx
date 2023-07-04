import styles from '@/styles/TodoList.module.css';
import TodoCard from './TodoCard';
import { deleteTodo } from '@/redux/todoSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAuth } from '@clerk/nextjs';
import {Auth} from '@/types/Auth';
import { deleteTodoService } from '@/services/projectsService';

function TodoList() {
  const select = useSelector((state: RootState) => state.selected);
  const todoList = useSelector((state: RootState) => {
    if (select === 'todosBE') {
      return state.todos.backend.todoList;
    } else if (select === 'todosFE') {
      return state.todos.frontend.todoList;
    }
    return [];
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
      console.log('Deleted todo', id);
    }).catch(error => {
        throw new Error('Error deleting error from server\n', error);
      })
  };

  return (
    <div className={styles.todosList}>
      {todoList.map((todo) => (
        <TodoCard key={todo.id} todo={todo} handleDelete={() => handleDelete(todo.id)} />
      ))}
    </div>
  );
}

export default TodoList;

