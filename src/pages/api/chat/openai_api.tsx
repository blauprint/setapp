import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function POST(req: Request) {
  // Extract the messages from the body of the request
  const { messages } = await req.json();

  // Build the full prompt to be sent to OpenAI
  const fullPrompt =
    process.env.COMPLETION_PROMPT + `"` + messages[0].content + `",\n`;

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    stream: true,
    max_tokens: 1200,
    temperature: 0.8,
  
    messages: [
      {
        content: fullPrompt,
        role: 'user',
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
