// This is a test page for the AI. It is not currently linked to the rest of the app.
// This is a test page for the AI. It is not currently linked to the rest of the app.
// This is a test page for the AI. It is not currently linked to the rest of the app.

"use client";
import React, { useState } from "react";
import {
  useChat,
  UseChatHelpers,
  useCompletion,
  UseCompletionHelpers,
} from "ai/react";
import { ProjectData, Technology, ColorScheme, Color } from "@/types/typedefs";

export default function Ai() {
  const [cardData, setCardData] = useState<ProjectData | null>(null);
  const [frontendFrameworks, setFrontendFrameworks] = useState<Technology[]>(
    [],
  );
  const [frontendLibraries, setFrontendLibraries] = useState<Technology[]>([]);
  const [frontendColorScheme, setFrontendColorScheme] = useState<ColorScheme>(
    {} as ColorScheme,
  );
  const [frontendColorPalette, setFrontendColorPalette] = useState<Color[]>([]);
  const [backendFrameworks, setBackendFrameworks] = useState<Technology[]>([]);
  const [backendLibraries, setBackendLibraries] = useState<Technology[]>([]);
  const [database, setDatabase] = useState<Technology>({} as Technology);
  const [toDoList, setToDoList] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);

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
    },
  });

  function handleError(error: Error) {
    console.error(error);
  }

  function handleResponse(response: Response) {
    console.log("Getting response...");
  }

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
