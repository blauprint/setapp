'use client'
import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
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
import LinearProgress from '@mui/material/LinearProgress';
import Typewriter from 'typewriter-effect';

export default function IdeaInputForm() {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);
  const [charCounterIsDisplayed, setCharCounterDisplay] = useState(false);
  const maxLength = 100;

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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: '/api/chat/openai_api',
    onError: handleError,
    onFinish: handleFinish,

  });


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

  async function customHandleInputChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    handleInputChange(event);
    setCharCounterDisplay(true)
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${event.target.scrollHeight - 5}px`;
    }
  }

  function showCharCounter() {
    setCharCounterDisplay(true)
  }

  function hideCharCounter() {
    setCharCounterDisplay(false)
  }
  async function customHandleSubmit(event: FormEvent<HTMLFormElement>) {
    handleSubmit(event);


    // Submit animations
    if (formRef.current) {
      formRef.current.style.transform = 'translateY(-100vh)';
      formRef.current.style.opacity = '0';
      formRef.current.style.filter = 'blur(60px)';
      setTimeout(() => {
        if (formRef.current && spinnerRef.current) {
          formRef.current.style.display = 'none';
          spinnerRef.current.style.display = 'flex';
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

    // Remove trailing backticks or quotation marks if they exist (common with GPT-3 completions)
    message.content = message.content.replace(/(\"|`)+$/, '');
    console.log('Message content:', message.content);

    try {
      // Parse the message content into a JSON object
      const projectJson = await JSON.parse(`{${message.content}`);
      const projectJson = await JSON.parse(`{${message.content}`);
      // Add the project idea to the object
      projectJson.idea = input;

      projectJson.backend.database.schema =
        projectJson.backend.database.database_schema;
      delete projectJson.backend.database.database_schema;

      // Post the project to the database and get the project ID
      const response = await postProject(auth, projectJson);
      const projectId = response.id;
      dispatch(addNewProject(response));
      dispatch(addCurrentProject(response));

      // Redirect to the project page
      const url = `/${user?.username ? user.username : user?.firstName
        }/projects/${projectId}/`;
      const url = `/${user?.username ? user.username : user?.firstName
        }/projects/${projectId}/`;
      router.push(url);
    } catch (error: any) {
      handleError(error);
    }
  }
  return (
    <>
      <div className={styles.inputContainer}>
        <form className={styles.form} onSubmit={customHandleSubmit} ref={formRef}>
          <textarea
            className={styles.ideaTextArea}
            ref={textAreaRef}
            autoFocus={true}
            onChange={customHandleInputChange}
            onClick={showCharCounter}
            onBlur={hideCharCounter}
            value={input}
            name="idea"
            rows={1}
            id="idea"
            required={true}
            autoComplete="off"
            maxLength={maxLength}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.currentTarget.form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }}
          ></textarea>
          <label className={styles.ideaLabel} htmlFor="name">
            <span className={styles.ideaSpan}>Type in your app idea....</span>
          </label>
          <button type="submit" className={styles.sendBtn}>
            <BiSend />
          </button>
          {charCounterIsDisplayed && <div className={styles.charachterCounter}>
            {maxLength - input.length}/{maxLength}
          </div>
          }
        </form>
        <div className={styles.spinnerContainer} ref={spinnerRef}>
          <div className={styles.spinnerMessage}>
            Setting up you app's blueprint
          </div>
          <Spinner />
          <Typewriter
            options={{
              autoStart: true,
              loop: false,
            }}
            onInit={(typewriter: any) => {
              typewriter
                .changeDelay(50)
                .typeString('SetApp is choosing ')
                .typeString('your frontend')
                .pauseFor(2500)
                .deleteChars('frontend'.length)
                .typeString('backend')
                .pauseFor(2500)
                .deleteChars('backend'.length)
                .typeString('to-do lists')
                .pauseFor(2500)
                .deleteChars('your to-do lists'.length)
                .typeString('the best color scheme')
                .pauseFor(2500)
                .deleteChars('choosing the best color scheme'.length)
                .typeString('almost done!')
                .start();
            }}
          />
        </div>
        {/* </div> */}
        <div className={styles.progressBarContainer}>
          <LinearProgress
            className={styles.progressBar}
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: "var(--secondary-color)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--primary-color)",
              },
              height: "20px",
            }}
          />
        </div>
      </div>
    </>
  );

}
