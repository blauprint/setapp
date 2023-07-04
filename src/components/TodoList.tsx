import styles from '@/styles/TodoList.module.css';
import TodoCard from './TodoCard';
import { deleteTodo, updateTodoTitle } from '@/redux/currentProjectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useAuth } from '@clerk/nextjs';
import { Auth } from '@/types/Auth';
import { deleteTodoService, updateTodoService } from '@/services/projectsService';
import { TodoItem } from '@/types/typedefs';

function TodoList() {

  const select = useAppSelector((state: RootState) => state.selected);
  let todoList: TodoItem[] = [];

  // useEffect(() => {
  // todoList = useAppSelector((state: RootState) => {
  //   if (select === 'todosBE' && todoList.length === 0) {
  //     return state.todos.backend.todoList;
  //   } else if (select === 'todosFE') {
  //     return state.todos.frontend.todoList;
  //   }
  //   return [];
  // });
  // }, [select])


  if (select === 'todosBE') {
    useAppSelector((state: RootState) => { todoList = state.currentProject.backend.todoList })
  } else if (select === 'todosFE') {
    useAppSelector((state: RootState) => { todoList = state.currentProject.frontend.todoList })
  }


  console.log(todoList, 'todolist in TodoList')

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

  const handleTitleChange = (todo: TodoItem) => {
    dispatch(updateTodoTitle(todo));
    updateTodoService(auth, todo).then((res) => {
      console.log(`Updated todo title:`, res);
    }).catch((error) => {
      throw new Error('Error updating todo title from server\n', error);
    });
  }

  return (
    <div className={styles.todosList}>
      {todoList.map((todo: TodoItem) => (
        <TodoCard key={todo.id} todo={todo} handleTitleChange={handleTitleChange} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default TodoList;

