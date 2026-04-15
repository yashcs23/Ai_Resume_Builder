const OpenAI = require('openai');

let openAiClient;
let provider = 'none';

const getOpenAiClient = () => {
  if (openAiClient) {
    return { client: openAiClient, provider };
  }

  const { OPENROUTER_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY } = process.env;

  if (OPENROUTER_API_KEY) {
    openAiClient = new OpenAI({
      apiKey: OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1'
    });
    provider = 'openrouter';
    return { client: openAiClient, provider };
  }

  if (OPENAI_API_KEY) {
    openAiClient = new OpenAI({ apiKey: OPENAI_API_KEY });
    provider = 'openai';
    return { client: openAiClient, provider };
  }

  if (GEMINI_API_KEY) {
    openAiClient = new OpenAI({
      apiKey: GEMINI_API_KEY,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai'
    });
    provider = 'gemini';
    return { client: openAiClient, provider };
  }

  provider = 'none';
  return { client: null, provider };
};

module.exports = getOpenAiClient;
