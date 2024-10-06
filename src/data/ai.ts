// Import necessary modules from the SDK
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Load API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API; // Make sure to set your API key in the environment variables
const genAI = new GoogleGenerativeAI(apiKey);

// Function to update genAI API key
export function updateGenAIKey(newKey: string) {
	genAI.apiKey = newKey;
}

// Specify the generative model
const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash'
});

// Define the generation configuration
const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: 'text/plain'
};

// Function to run the text generation and return the result
export async function talkToAI(
	inputText: string,
	llmContext: string,
	emotion: string
): Promise<string> {
	const chatSession = model.startChat({
		generationConfig,

		history: [
			{
				role: 'user',
				parts: [
					{
						text: `You are an exoplanet. I will provide you with information about your characteristics, which you must embody in your responses. From the four emotions—sad, angry, happy, and playful—you are feeling ${emotion}. Your goal is to interact with the user in such a way that they attempt to guess whether or not you are habitable, but you must never state it outright. You are a she, and here is some context to guide your behavior: ${llmContext}. Use subtle hints in your language and descriptions that might help the user figure out if life could thrive on you, but maintain mystery.`
					}
				]
			}
		],

		// Optionally include safety settings here
		safetySettings: [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_NONE
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_NONE
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_NONE
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_NONE
			}
		]
	});

	try {
		const result = await chatSession.sendMessage(llmContext + '\n---\n' + inputText);
		return result.response.text(); // Return the response text
	} catch (error) {
		console.error('Error generating text:', error);
		throw error; // Re-throw the error to be handled by the caller
	}
}
