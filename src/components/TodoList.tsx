'use client';
import styles from '@/styles/TodoList.module.css';
import TodoCard from './TodoCard';
import { addBackendTodo, addFrontendTodo, deleteTodo, updateTodo, updateNewTodo } from '@/redux/currentProjectSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { useAuth } from '@clerk/nextjs';
import { useRef } from 'react';
import { Auth } from '@/types/Auth';
import { createBackendTodoService, createFrontendTodoService, deleteTodoService, updateTodoService } from '@/services/projectsService';
import { TodoItem } from '@/types/typedefs';
import { v4 as uuidv4 } from 'uuid';

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
      throw new Error('Error updating todo title from server\n', error);
    });
  }
  const handleCheckboxChange = (todo: TodoItem) => {
    dispatch(updateTodo(todo));
    updateTodoService(auth, todo).then(() => {
    }).catch((error) => {
      throw new Error('Error updating todo title from server\n', error);
    });
  }

  const frontendId = useAppSelector((state: RootState) => state.currentProject.frontend.id);
  const backendId = useAppSelector((state: RootState) => state.currentProject.backend.id);
  const inputRef = useRef<HTMLDivElement>(null);
  const uuid = uuidv4();

  function handleCreateTodoKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const title = e.currentTarget.textContent;
      if (select === 'todosFE') {
        dispatch(addFrontendTodo({ id: uuid, title: title }));
        if (auth && frontendId && title) {
          createFrontendTodoService(auth, frontendId, { title: title, done: false }).then(res => {
            res.uuid = uuid;
            dispatch(updateNewTodo(res));
          }).catch(error => {
            console.log(error);
            throw new Error(`Error creating a frontend todo on server!`);
          });
        }
      } else {
        dispatch(addBackendTodo({ id: uuid, title: title }))
        if (auth && backendId && title) {
          createBackendTodoService(auth, backendId, { title: title, done: false }).then(res => {
            res.uuid = uuid;
            dispatch(updateNewTodo(res));
          }).catch(error => {
            console.log(error);
            throw new Error(`Error creating a backend todo on server`);
          });
        }
      }

      e.currentTarget.textContent = '';
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }

  return (
    <>
      <div className={styles.todosList}>
        <div className={styles.addTodoButton}
          suppressContentEditableWarning={true}
          contentEditable="true"
          onKeyDown={handleCreateTodoKeyDown}
          ref={inputRef}
          placeholder="Add"
        >
        </div>
        {sortedTodos.map((todo: TodoItem) => (
          <TodoCard key={todo.id} todo={todo} handleTitleChange={handleTitleChange} handleDelete={handleDelete} handleCheckboxChange={handleCheckboxChange} />
        ))}
      </div>
    </>
  );
}

export default TodoList;

