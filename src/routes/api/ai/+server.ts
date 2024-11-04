import { json, type RequestHandler } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createChatSession, geminiModelName } from '$chat/config';

// Define the expected input data structure
interface TalkToAIRequest {
	inputText: string;
	llmContext: string;
	emotion: string;
}

// Load server-side API key from environment variables
import { GEMINI_API_KEY } from '$env/static/private';
const serverApiKey = GEMINI_API_KEY;
let genAI = new GoogleGenerativeAI(serverApiKey!);
let model = genAI.getGenerativeModel({ model: geminiModelName });

// Endpoint handler function
export const POST: RequestHandler = async ({ request }) => {
	const { inputText, llmContext, emotion }: TalkToAIRequest = await request.json();

	try {
		const chatSession = createChatSession(model, emotion, llmContext);

		const result = await chatSession.sendMessage(`${llmContext}\n---\n${inputText}`);
		return json({ response: result.response.text() });
	} catch (error) {
		console.error('Error generating text:', error);
		return json({ error: 'Failed to generate text' }, { status: 500 });
	}
};
