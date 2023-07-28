import { Configuration, OpenAIApi } from "openai";

async function runCompletion(promptParam) {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptParam,
    max_tokens: 1900,
  });

  return completion.data.choices[0];
}

export { runCompletion };
