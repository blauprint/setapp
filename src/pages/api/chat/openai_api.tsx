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

export default async function POST(req: NextApiRequest) {

  // Extract the user's prompt from the body of the request
  let userPrompt = req.body;

  // Build the full prompt to be sent to OpenAI
  let fullPrompt = process.env.COMPLETION_PROMPT + `"` + userPrompt + `",\n`;

   // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    stream: true,
    max_tokens: 1200,
    temperature: 0.2,
    prompt: fullPrompt,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
