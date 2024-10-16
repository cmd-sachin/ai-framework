import {
  generateText,
  generateObject,
  streamObject,
  streamText,
} from "./node_modules/ai";
import { createOpenAi } from "./node_modules/@ai-sdk/openai";
import { createGoogleGenerativeAI } from "./node_modules/@ai-sdk/google";

class Ai {
  constructor(provider, key, system_prompt) {
    this.API_KEY = key;
    switch (provider) {
      case "openai":
        this.genAI = createOpenAi({
          api_key: this.API_KEY,
          compatibility: "strict",
        });
        break;
      case "google":
        this.genAI = createGoogleGenerativeAI({ apiKey: this.API_KEY });
        break;
    }
    this.usecase = JSON.stringify(system_prompt);
  }

  async TextGeneration(
    model_name,
    prompt,
    system_prompt = this.usecase,
    temp = 0.3,
    max_steps = 5
  ) {
    const { result } = await generateText({
      model: this.genAI(model_name),
      messages: prompt,
      system: system_prompt,
      temperature: temp,
      maxSteps: max_steps,
    });

    return result.text;
  }

  async ObjectGeneration(
    model_name,
    prompt,
    object_schema,
    system_prompt = this.usecase,
    temp = 0.3,
    max_steps = 5
  ) {
    const { result } = await generateObject({
      model: this.genAI(model_name),
      messages: prompt,
      schema: object_schema,
      system: system_prompt,
      temperature: temp,
      maxSteps: max_steps,
    });
    return result;
  }

  async TextStreaming(
    model_name,
    prompt,
    system_prompt = this.usecase,
    temp = 0.3,
    max_steps = 5
  ) {
    const { result } = await streamText({
      model: this.genAI(model_name),
      messages: prompt,
      system: system_prompt,
      temperature: temp,
      maxSteps: max_steps,
    });
    return result.toDataStreamResponse();
  }

  async ObjectStreaming(
    model_name,
    prompt,
    object_schema,
    system_prompt = this.usecase,
    temp = 0.3,
    max_steps = 5
  ) {
    const { partialObjectStream } = await streamObject({
      model: this.genAI(model_name),
      messages: prompt,
      schema: object_schema,
      system: system_prompt,
      temperature: temp,
      maxSteps: max_steps,
    });

    return partialObjectStream;
  }
}
