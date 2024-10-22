AI -Framework :

The AI class is defined well and good with a demo video.
The AI class can be used to 

*generateText

*generateObject

*streamText

*StreamObject

Each functionality is handled by individual member functions of AI class.

This class reduces the complexity of code and it is developer friendly

Member Functions:

->TextGeneration: (Returns complete String)
params : Model_Name , Prompt/Messages , Temperature , maxSteps

->TextStreaming: (Returns Array of chuncks)
Params : Model_Name , Prompt/Messages , Temperature , maxSteps

->ObjectGeneration: (Returns an Object as per provided schema)
params: Model_Name ,Prompt/Messages ,Object_Schema , Temperature , maxSteps

->ObjectStreaming: (Returns chuncks of object response)
params: Model_Name , Prompt/Messages , Object_Schema , Temperature , maxSteps


Remember:
*The messages should be in the specific formate as an array object:
[{role:"user",content:"message"}]

*Don't Fail to mention schema when you want to generate/stream an object response;


Thank You

