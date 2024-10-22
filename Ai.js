const {
  generateText,
  generateObject,
  streamObject,
  streamText,
  convertToCoreMessages,
} = require("./node_modules/ai");
const { createOpenAi } = require("@ai-sdk/openai");
const { createGoogleGenerativeAI } = require("@ai-sdk/google");
class Ai {
  constructor(provider, key, system_prompt) {
    this.API_KEY = key;
    this.usecase = system_prompt;
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
  }

  async TextGeneration(
    model_name,
    prompt,
    system_prompt = this.usecase,
    temp = 0.3,
    max_steps = 5
  ) {
    const result = await generateText({
      model: this.genAI(model_name),
      messages: convertToCoreMessages(prompt),
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
    const result = await streamText({
      model: this.genAI(model_name),
      messages: convertToCoreMessages(prompt),
      system: system_prompt,
      temperature: temp,
      maxSteps: max_steps,
    });
    const chunks = [];
    for await (const chunk of result.textStream) {
      chunks.push(chunk);
    }
    return chunks;
  }

  async ObjectGeneration(
    model_name,
    prompt,
    object_schema,
    system_prompt = this.usecase,
    temp = 0.3,
    max_steps = 5
  ) {
    const result = await generateObject({
      model: this.genAI(model_name),
      schema: object_schema,
      messages: prompt,
      system: system_prompt,
      temperature: temp,
      maxSteps: max_steps,
    });

    return result.object;
  }

  async ObjectStreaming(
    model_name,
    prompt,
    object_schema,
    system_prompt = this.usecase,
    temp = 0.3,
    max_steps = 5
  ) {
    const {partialObjectStream} = await streamObject({
      model: this.genAI(model_name),
      messages: prompt,
      schema: object_schema,
      system: system_prompt,
      temperature: temp,
      maxSteps: max_steps,
    });
    const chuncks = [];
    for await (const chunk of partialObjectStream) {
      chuncks.push(chunk);
    }
    return chuncks;
  }
}

module.exports = Ai;