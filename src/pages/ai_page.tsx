// This is a test page for the AI. It is not currently linked to the rest of the app.
// This is a test page for the AI. It is not currently linked to the rest of the app.
// This is a test page for the AI. It is not currently linked to the rest of the app.

"use client";
import React, { use, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { store } from "@/redux/store";

import {
  useChat,
  UseChatHelpers,
  useCompletion,
  UseCompletionHelpers,
} from "ai/react";
import { ProjectData, Technology, ColorScheme, Color } from "@/types/typedefs";
import { add } from "@/redux/projectsSlice";

export default function Ai() {
  const [cardData, setCardData] = useState<ProjectData | null>(null);
  // const [frontendFrameworks, setFrontendFrameworks] = useState<Technology[]>(
  //   [],
  // );
  // const [frontendLibraries, setFrontendLibraries] = useState<Technology[]>([]);
  // const [frontendColorScheme, setFrontendColorScheme] = useState<ColorScheme>(
  //   {} as ColorScheme,
  // );
  // const [frontendColorPalette, setFrontendColorPalette] = useState<Color[]>([]);
  // const [backendFrameworks, setBackendFrameworks] = useState<Technology[]>([]);
  // const [backendLibraries, setBackendLibraries] = useState<Technology[]>([]);
  // const [database, setDatabase] = useState<Technology>({} as Technology);
  // const [toDoList, setToDoList] = useState<string[]>([]);
  // const [notes, setNotes] = useState<string[]>([]);

  const project = store.getState().projects[0];
  const dispatch = useAppDispatch();

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
    onFinish(prompt, completion) {
      console.log("Finished completion!");
      console.log("Completion:", completion);
      console.log("Prompt:", prompt);
      const projectJson: ProjectData = JSON.parse(`{ ${completion}`);
      dispatch(add(projectJson));
      setCardData(projectJson);
    },
  });

  function handleError(error: Error) {
    console.error(error);
  }

  function handleResponse(response: Response) {
    console.log("Getting response...");
  }

  // useEffect(() => {
  //   let i;
  //   //Step 1: Get the frontend object from the completion
  //   i = completion.indexOf(`"frontend": {`);
  //   if (i) {
  //     console.log(i);
  //   }
  // }, [completion]);

  useEffect(() => {
    console.log(project);
  }, [project]);

  useEffect(() => {
    let newCardData = JSON.parse(`{
      "toDoList": [
        "Research the best technologies to use for the project",
        "Create a color scheme for the project",
        "Design the frontend of the project",
        "Develop the backend of the project",
        "Test the project"
      ],
      "frontend": {
        "framework": {
          "name": "React",
          "whyGoodOption": "React is a popular JavaScript library for building user interfaces that is easy to learn and use.",
          "description": "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.",
          "link": "https://reactjs.org/"
        },
        "libraries": [{
            "name": "React Router",
            "whyGoodOption": "React Router is a popular library for routing in React applications.",
            "description": "React Router is a popular library for routing in React applications. It provides a way to declaratively map routes to components, and allows for programmatic navigation and component composition.",
            "link": "https://reactrouter.com/"
          },
          {
            "name": "Redux",
            "whyGoodOption": "Redux is a popular library for managing state in React applications.",
            "description": "Redux is a popular library for managing state in React applications. It provides a predictable, single-state tree which makes it easy to debug, test, and maintain applications.",
            "link": "https://redux.js.org/"
          }
        ],
        "colorScheme": {
          "whyGoodOption": "This color scheme is a good option for the given app idea because it is bright and vibrant, which will help to draw attention to the app and make it more engaging.",
          "colorPalette": [{
              "name": "Primary Color",
              "role": "primary-color",
              "hex": "#FF0000",
              "rgb": "rgb(255, 0, 0)"
            },
            {
              "name": "Accent Color",
              "role": "accent-color",
              "hex": "#00FF00",
              "rgb": "rgb(0, 255, 0)"
            },
            {
              "name": "Background Color",
              "role": "background-color",
              "hex": "#0000FF",
              "rgb": "rgb(0, 0, 255)"
            }
          ]
        }
      },
      "backend": {
        "framework": {
          "name": "Node.js",
          "whyGoodOption": "Node.js is a popular JavaScript runtime for building server-side applications.",
          "description": "Node.js is a popular JavaScript runtime for building server-side applications. It is fast, lightweight, and efficient, and is used by many large companies such as Netflix, Uber, and PayPal.",
          "link": "https://nodejs.org/"
        },
        "libraries": [{
            "name": "Express",
            "whyGoodOption": "Express is a popular web framework for Node.js.",
            "description": "Express is a popular web framework for Node.js. It is fast, flexible, and provides a simple way to create web applications and APIs.",
            "link": "https://expressjs.com/"
          },
          {
            "name": "Mongoose",
            "whyGoodOption": "Mongoose is a popular library for working with MongoDB.",
            "description": "Mongoose is a popular library for working with MongoDB. It provides a simple way to model and query data, and is used by many large companies such as Uber and Airbnb.",
            "link": "https://mongoosejs.com/"
          }
        ],
        "database": {
          "name": "MongoDB",
          "whyGoodOption": "MongoDB is a popular NoSQL database.",
          "description": "MongoDB is a popular NoSQL database. It is fast, scalable, and provides a simple way to store and query data.",
          "link": "https://www.mongodb.com/"
        }
      },
      "notes": "This project will use React for the frontend, Node.js for the backend, and MongoDB for the database."
    }`);
    dispatch(add(newCardData));
    setCardData(store.getState().projects[0]);
  }, []);

  return (
    <>
      <div>{completion}</div>

      {cardData ? (
        <div>
          <h1>{cardData.idea}</h1>
          <h2>Frontend: {cardData.frontend.framework.name}</h2>
          <h3>{cardData.frontend.framework.whyGoodOption}</h3>
          <h3>{cardData.frontend.framework.description}</h3>
          <h3>{cardData.frontend.framework.link}</h3>

          <h3>Color Scheme:</h3>
          {cardData.frontend.colorScheme.colorPalette.map((color) => (
            <>
              <h3>{color.name}</h3>
              <h3>{color.hex}</h3>
              <h3>{color.rgb}</h3>
            </>
          ))}
          <h3>{cardData.frontend.colorScheme.whyGoodOption}</h3>
          <h2>Backend: {cardData.backend.framework.name} </h2>
          <h3>{cardData.backend.framework.whyGoodOption}</h3>
          <h3>{cardData.backend.framework.description}</h3>
          <h3>{cardData.backend.framework.link}</h3>
          <h3>Database: {cardData.backend.database.name}</h3>
          <h3>{cardData.backend.database.whyGoodOption}</h3>
          <h3>{cardData.backend.database.description}</h3>
          <h3>{cardData.backend.database.link}</h3>
          <h2>To Do List</h2>
          <p>{cardData.toDoList}</p>
          <h2>Notes</h2>
          <h3>{cardData.notes}</h3>
        </div>
      ) : (
        isLoading && <div>Loading...</div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            type="text"
            name="userPrompt"
            onChange={handleInputChange}
            value={input}
          />
        </label>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button disabled={isLoading} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
