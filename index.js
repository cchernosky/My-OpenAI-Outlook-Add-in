import { Configuration, OpenAIApi } from "openai";

async function runCompletion(promptParam) {
  const configuration = new Configuration({
    apiKey: "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",
    // apiKey: "42bf2b0f50ab4734afe5806d15582016",
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    // model: "TachyonGPT_Model",
    prompt: promptParam,
    max_tokens: 1900,
  });

  return completion.data.choices[0];
}

export { runCompletion };
