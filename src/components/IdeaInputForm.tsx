"use client";
import { useRef, useState, useEffect, ReactElement } from "react";
import styles from "@/styles/IdeaInputForm.module.css";
import { BiSend } from "react-icons/bi";
import * as Yup from "yup";
import { ProjectData } from "@/types/typedefs";
import dynamic from "next/dynamic";

import { UseChatHelpers, useCompletion, UseCompletionHelpers } from "ai/react";
import { useAppDispatch } from "@/redux/hooks";
import { addProjects } from "@/redux/projectsSlice";
import Spinner from "./Spinner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

const formSchema = Yup.object().shape({
  idea: Yup.string().required("Tell me your idea for an app."),
});

export default function IdeaInputForm() {
  const [cardData, setCardData] = useState<ProjectData | null>(null);
  let dispatch = useAppDispatch();
  const { user } = useUser();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

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

  // const DynamicSummaryCard = dynamic(() => import("@/components/SummaryCard"));
  // const DynamicColorCard = dynamic(() => import("@/components/ColorCard"));
  // const DynamicFrameworkCard = dynamic(
  //   () => import("@/components/FrameworkCard")
  // );
  // const DynamicModelCard = dynamic(() => import("@/components/ModelCard"));
  // const DynamicToDoList = dynamic(() => import("@/components/ToDoList"));

  // Handler functions

  function handleError(error: Error) {
    console.error(error);
  }

  function handleResponse(response: Response) {
    if (formRef.current) {
      formRef.current.style.translate = "0 -100vh";
      formRef.current.style.filter = "blur(10px)";
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.style.display = "none";
        }
      }, 1000);
    }
  }

  async function handleFinish(prompt: string, completion: string) {
    console.log("Finished completion!");
    console.log("Completion:", completion);
    console.log("Prompt:", prompt);
    const projectJson: ProjectData = await JSON.parse(`{${completion}`);
    dispatch(addProjects(projectJson));

    setCardData(projectJson);
    const url = `/${
      user?.username ? user.username : user?.firstName
    }/${projectName}/output`;
    router.push(url);
  }

  // Regex functions

  async function regexDataExtractor(data: string) {
    //WORK IN PROGRESS
    let projectNameRegex = /"projectName":\s*"([^"]*)"/;
    let toDoListRegex = /"toDoList":\s*\[\s*"([^"]*)"\s*\]/;
    let summaryRegex = /"summary":\s*"([^"]*)"/;
    let frontendRegex = /"frontend":\s*{([^}]*)}/;
    let backendRegex = /"backend":\s*{([^}]*)}/;

    //TODO: memoize regexes
    let regexes: RegExp[] = [
      summaryRegex,
      projectNameRegex,
      toDoListRegex,
      frontendRegex,
      backendRegex,
    ];

    while (regexes.length > 0 && isLoading) {
      let regex = regexes.pop();
      if (regex) {
        let match = data.match(regex);
        if (match) {
          console.log(match);
        }
      }
    }

    if (projectNameRegex.test(data)) {
      let projectName = data.match(projectNameRegex);
      console.log(projectName);
    }
  }

  // useEffect(() => {
  //   regexDataExtractor(completion);
  // }, [completion]);

  const projectName = "seismica";

  return (
    <>
      <div className={styles.inputContainer}>
        {!isLoading && (
          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
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
        )}
        {isLoading && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
