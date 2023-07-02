// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export default async function POST(req: Request) {
  // Extract the user's prompt from the body of the request
  const { messages } = await req.json();
  // const {messages} = await req.json();
  // const { prompt } = req.body;
  console.log("MESSAGES: ", messages);
  // console.log("REQ BODY", await JSON.parse(req.body));

  // Build the full prompt to be sent to OpenAI
  const fullPrompt = process.env.COMPLETION_PROMPT + `"` + messages[0].content + `",\n`;
  // const fullPrompt = process.env.COMPLETION_PROMPT + `"` + prompt + `",\n`;
  // console.log(fullPrompt);

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    max_tokens: 1200,
    temperature: 0.2,
    messages: [
      {
        content: fullPrompt,
        role: "user",
      },
    ],
  });

  // const response = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   stream: true,
  //   max_tokens: 1200,
  //   temperature: 0.2,
  //   prompt: fullPrompt,
  // });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
