const OpenAI = require('openai');

let openAiClient;

const getOpenAiClient = () => {
  if (openAiClient) {
    return openAiClient;
  }

  const { OPENROUTER_API_KEY } = process.env;

  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured in environment variables');
  }

  openAiClient = new OpenAI({
    apiKey: OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
  });
  return openAiClient;
};

module.exports = getOpenAiClient;
