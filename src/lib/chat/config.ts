import { HarmCategory, HarmBlockThreshold, GenerativeModel } from '@google/generative-ai';

export const geminiModelName = 'gemini-1.5-flash';

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 4096,
	responseMimeType: 'text/plain'
};

export function createChatSession(model: GenerativeModel, emotion: string, llmContext: string) {
	return model.startChat({
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
}
