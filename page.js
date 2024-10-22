const Ai = require("./Ai");
const api_key = "AIzaSyDP41Pz8woeM7BXjtxi50zkssUUkGGzLC4";
const myAi = new Ai((provider = "google"), api_key, "You are a dictionary that provide answer short and brief");
const {z, Schema} = require("zod");

async function generateText(prompt) {
  const result = await myAi.TextGeneration("gemini-1.5-flash", [
    { role: "user", content: prompt },
  ]);
  console.log( result.text);
}

async function streamText(prompt) {
  const result = await myAi.TextStreaming("gemini-1.5-flash", [
    { role: "user", content: prompt },
  ]);
  for (i = 0; i < result.length; i++) {
    console.log(result[i]);
  }
}

async function generateObject(prompt) {
  const result = await myAi.ObjectGeneration("gemini-1.5-flash",[
    { role: "user", content: prompt }],
   z.object({
      word: z.string(),
      meaning: z.array(z.string()),
      examples: z.array(z.string()),
    }));

    console.log(result)
}

async function streamObject(prompt) {
  const result = await myAi.ObjectStreaming("gemini-1.5-flash",[{role:"user",content:prompt}], z.object({
    word: z.string(),
    meaning: z.array(z.string()),
    examples: z.array(z.string()),
  }));
  for (i = 0; i < result.length; i++) {
    console.log(result[i]);
  }
}

streamObject("advent")
