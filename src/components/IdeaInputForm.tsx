import { useRef, ChangeEvent, useState } from 'react';
import styles from '@/styles/IdeaInputForm.module.css';
import { BiSend } from 'react-icons/bi';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { addCurrentProject } from '@/redux/currentProjectSlice';

const formSchema = Yup.object().shape({
  idea: Yup.string().required('Tell me your idea for an app.'),
});

export default function IdeaInputForm() {
  const [idea, setIdea] = useState('');
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //This is the logic that makes the textarea auto expand and save idea to state
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${e.target.scrollHeight - 5}px`;
    }
    setIdea(e.target.value);
  };

  const projectName = 'seismica';
  let router = useRouter();
  let dispatch = useAppDispatch();
  // const projectName = 'seismica'

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    e.preventDefault();

    //TODO send data to AI, redirect to project page
    const newIdea: string = idea;
    console.log(newIdea);
    // const projectData = sendIdea(newIdea);

    // dispatch(addCurrentProject(projectData));

    const url = `/${
      user?.username ? user.username : user?.firstName
    }/${projectName}/output`;
    router.push(url);
  };

  return (
    <div className={styles.inputContainer}>
      <form className={styles.form} onSubmit={onSubmit}>
        <textarea
          className={styles.ideaTextArea}
          ref={textAreaRef}
          onChange={handleChange}
          name="idea"
          rows={1}
          id="idea"
          required={true}
          autoComplete="off"
        ></textarea>
        <label className={styles.ideaLabel} htmlFor="idea">
          <span className={styles.ideaSpan}>Type in your app idea....</span>
        </label>
        <button type="submit" className={styles.sendBtn}>
          <BiSend />
        </button>
      </form>
    </div>
  );
}
