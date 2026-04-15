import dotenv from "dotenv";
import path from "path";
import OpenAI from "openai";

dotenv.config({
  path: path.resolve("../../.env")
});

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

async function run() {
  try {
    const res = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "user", content: "Explain AI in brief" }
      ]
    });

    console.log(res.choices[0].message.content);

  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();