// Import necessary modules from the SDK
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { createChatSession, geminiModelName } from '$chat/config';

let genAI: GoogleGenerativeAI | null;
let model: GenerativeModel | null;

// Function to update genAI API key
export function updateGenAIKey(clientApiKey: string) {
	genAI = clientApiKey.trim() !== '' ? new GoogleGenerativeAI(clientApiKey) : null;
	model = genAI
		? genAI.getGenerativeModel({
				model: geminiModelName
			})
		: null;
}

// Function to run the text generation and return the result
export async function talkToAI(
	inputText: string,
	llmContext: string,
	emotion: string
): Promise<string> {
	if (genAI && model) {
		// Run on client if API key is provided
		try {
			const chatSession = createChatSession(model, emotion, llmContext);

			const result = await chatSession.sendMessage(`${llmContext}\n---\n${inputText}`);
			return result.response.text();
		} catch (error) {
			console.error('Error generating text on client:', error);
			throw error;
		}
	} else {
		// Fallback to server if no API key
		const response = await fetch('/api/ai', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ inputText, llmContext, emotion })
		});
		if (!response.ok) {
			const error = await response.json();
			console.error('Error from server:', error);
			throw new Error('Failed to generate text from server');
		}
		const data = await response.json();
		return data.response;
	}
}
