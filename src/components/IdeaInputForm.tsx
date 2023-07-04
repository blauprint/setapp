'use client';
import { useRef, FormEvent, useEffect, useState } from 'react';
import styles from '@/styles/IdeaInputForm.module.css';
import { BiSend } from 'react-icons/bi';
import { ProjectData } from '@/types/typedefs';
import { Auth } from '@/types/Auth';
import { useAppDispatch } from '@/redux/hooks';
import { addNewProject } from '@/redux/projectsSlice';
import Spinner from './Spinner';
import { useUser, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { addCurrentProject } from '@/redux/currentProjectSlice';
import { postProject } from '@/services/projectsService';
import { Message, useChat } from 'ai/react';
import regexDataExtractor from '@/utils/regexDataExtractor';
import LinearProgress from '@mui/material/LinearProgress';

// import * as Yup from "yup";
// import dynamic from "next/dynamic";

// const formSchema = Yup.object().shape({
//   idea: Yup.string().required("Tell me your idea for an app."),
// });

export default function IdeaInputForm() {
  const dispatch = useAppDispatch();
  let [progress, setProgress] = useState(0);

  // CLERK AUTH
  const { user } = useUser();
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

  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat/openai_api',
    onError: handleError,
    onFinish: handleFinish,
  });

  // ***********
  // WORK IN PROGRESS!
  // The idea is to dynamically import components based on the completion.
  // The components would be cards that display the project data as it is being generated.
  // ***********

  // const DynamicSummaryCard = dynamic(() => import("@/components/SummaryCard"));
  // const DynamicColorCard = dynamic(() => import("@/components/ColorCard"));
  // const DynamicFrameworkCard = dynamic(
  //   () => import("@/components/FrameworkCard")
  // );
  // const DynamicModelCard = dynamic(() => import("@/components/ModelCard"));
  // const DynamicToDoList = dynamic(() => import("@/components/ToDoList"));

  // ***********

  // Handler functions

  useEffect(() => {
    if (messages[1]?.content.match(/"title":\s*"([^"]*)"/)?.[0]) {
      setProgress(25);
    }
    if (messages[1]?.content.match(/"summary":\s*"([^"]*)"/)?.[0]) {
      setProgress(50);
    }
    if (messages[1]?.content.match(/"frontend":\s*{([^}]*)}/)?.[0]) {
      setProgress(75);
    }
    if (messages[1]?.content.match(/"backend":\s*{([^}]*)}/)?.[0]) {
      setProgress(100);
    }
    // console.log(messages[1]?.content)
  }, [messages]);

  function handleError(error: Error) {
    console.error(error);
    if (spinnerRef.current) {
      spinnerRef.current.style.display = 'none';
    }
    alert('Sorry, there was an error. Please try again.');

    // Refresh the page
    router.reload();
  }

  async function customHandleSubmit(event: FormEvent<HTMLFormElement>) {
    handleSubmit(event);
    // Submit animations
    if (formRef.current) {
      formRef.current.style.translate = '0 -100vh';
      formRef.current.style.scale = '0';
      formRef.current.style.filter = 'blur(60px)';
      setTimeout(() => {
        if (formRef.current && spinnerRef.current) {
          spinnerRef.current.style.display = 'block';
          formRef.current.style.display = 'none';
        }
      }, 600);
    }
  }

  async function handleFinish(message: Message) {
    //Prevent the form from reappearing after the message is finished
    if (formRef.current) {
      formRef.current.remove();
    }

    console.log('Message finished!');
    console.log('Message:', message.content);

    // Remove trailing backticks if they exist (common with GPT-3 completions)
    message.content = message.content.replace(/`+$/, '');

    try {
      // Parse the message content into a JSON object
      const projectJson: ProjectData = await JSON.parse(`{${message.content}`);

      // Add the project idea to the object
      projectJson.idea = input;

      // Post the project to the database and get the project ID
      const response = await postProject(auth, projectJson);
      const projectId = response.id;
      dispatch(addNewProject(response));
      dispatch(addCurrentProject(response));

      // Redirect to the project page
      const url = `/${
        user?.username ? user.username : user?.firstName
      }/projects/${projectId}/`;
      router.push(url);
    } catch (error: any) {
      handleError(error);
    }
  }

  // ***********

  return (
    <>
      <div className={styles.inputContainer}>
        <form
          className={styles.form}
          onSubmit={customHandleSubmit}
          ref={formRef}
        >
          <textarea
            className={styles.ideaTextArea}
            // ref={textAreaRef}
            autoFocus={true}
            onChange={handleInputChange}
            value={input}
            name="idea"
            rows={1}
            id="idea"
            required={true}
            autoComplete="off"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                // TODO: Either change to input or fix textarea functionality
                event.currentTarget.form?.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true })
                );
              }
            }}
          ></textarea>
          {/* <DynamicSummaryCard summary={cardData?.summary} /> */}
          {/* <DynamicColorCard colorScheme={cardData?.frontend.colorScheme} /> */}
          {/* <DynamicFrameworkCard framework={cardData?.frontend.framework} /> */}
          {/* <DynamicModelCard model={cardData?.backend.database} /> */}
          {/* <DynamicToDoList todos={cardData?.frontend.toDoList} /> */}
          {/* <DynamicToDoList todos={cardData?.backend.toDoList} /> */}
          <label className={styles.ideaLabel} htmlFor="name">
            <span className={styles.ideaSpan}>Type in your app idea....</span>
          </label>
          <button type="submit" className={styles.sendBtn}>
            <BiSend />
          </button>
        </form>
      </div>
      <div className={styles.loadingContainer} ref={spinnerRef}>
        {/* <div className={styles.loadingContainer}> */}
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
        <div className={styles.progressBarContainer}>
          <LinearProgress
            className={styles.progressBar}
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: 'var(--secondary-color)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--primary-color)',
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
