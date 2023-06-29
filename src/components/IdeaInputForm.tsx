"use client";
import {
  useRef,
  ChangeEvent,
  useState,
  useEffect,
  use,
  RefObject,
} from "react";
import styles from "@/styles/IdeaInputForm.module.css";
import { BiSend } from "react-icons/bi";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import { addCurrentProject } from "@/redux/currentProjectSlice";
import { ProjectData } from "@/types/typedefs";

import {
  useChat,
  UseChatHelpers,
  useCompletion,
  UseCompletionHelpers,
} from "ai/react";

const formSchema = Yup.object().shape({
  idea: Yup.string().required("Tell me your idea for an app."),
});

export default function IdeaInputForm() {
  const [cardData, setCardData] = useState<ProjectData | null>(null);
  const [idea, setIdea] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUser();

  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    stop,
    handleSubmit,
  } = useCompletion({
    api: "/api/chat/openai_api",
    onError: handleError,
    onResponse: handleResponse,
    onFinish: handleFinish,
  });

  // Handler functions

  function handleError(error: Error) {
    console.error(error);
  }

  function handleResponse(response: Response) {
    if (formRef.current) {
      formRef.current.style.scale = "0.001";
      setTimeout(() => {
        if (formRef.current) formRef.current.style.display = "none";
      }, 100);
    }
  }

  function handleFinish(prompt: string, completion: string) {
    console.log("Finished completion!");
    console.log("Completion:", completion);
    console.log("Prompt:", prompt);
    const projectJson: ProjectData = JSON.parse(`{ ${completion} }`);
    // dispatch(add(projectJson));
    setCardData(projectJson);
  }

  // Regex functions

  function regexDataExtractor(data: string) {
    //WORK IN PROGRESS
    let projectNameRegex = /"projectName":\s*"([^"]*)"/;
    let toDoListRegex = /"toDoList":\s*\[\s*"([^"]*)"\s*\]/;
    let summaryRegex = /"summary":\s*"([^"]*)"/;
    let frontendRegex = /"frontend":\s*{([^}]*)}/;
    let backendRegex = /"backend":\s*{([^}]*)}/;

    //TODO: memoize regexes
    let regexes: RegExp[] = [
      projectNameRegex,
      toDoListRegex,
      summaryRegex,
      frontendRegex,
      backendRegex,
    ];

    if (projectNameRegex.test(data)) {
      let projectName = data.match(projectNameRegex);
      console.log(projectName);
    }
  }

  useEffect(() => {
    regexDataExtractor(completion);
  }, [completion]);

  // const textAreaRef = useRef<RefObject<HTMLTextAreaElement>>(null);

  //This is the logic that makes the textarea auto expand and save idea to state
  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   if (textAreaRef.current) {
  //     textAreaRef.current.style.height = "auto";
  //     textAreaRef.current.style.height = `${e.target.scrollHeight - 5}px`;
  //   }
  //   setIdea(e.target.value);
  // };

  const projectName = "seismica";

  return (
    <div className={styles.inputContainer}>
      {completion}

      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <textarea
          className={styles.ideaTextArea}
          // ref={textAreaRef}
          onChange={handleInputChange}
          name="idea"
          rows={1}
          id="idea"
          required={true}
          autoComplete="off"
        ></textarea>
        <label className={styles.ideaLabel} htmlFor="name">
          <span className={styles.ideaSpan}>Type in your app idea....</span>
        </label>
        <button type="submit" className={styles.sendBtn}>
          <BiSend />
        </button>
      </form>
    </div>
  );
}
