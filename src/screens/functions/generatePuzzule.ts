import {GoogleGenerativeAI, SchemaType} from '@google/generative-ai';
import Config from 'react-native-config';

const genAI = new GoogleGenerativeAI(Config.API_KEY ?? '');
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        orginal: {type: SchemaType.STRING},
      },
    },
  },
});

export interface PuzzleProps {
  orginal: string;
  puzzle: string[];
}
const shuffleWord = (word: string) => {
  return word.split('').sort(() => Math.random() - 0.5);
};

export const generatePuzzule = async (): Promise<PuzzleProps | false> => {
  let response: PuzzleProps | false = false;
  let prompt =
    'Generate a single random word suitable for a puzzle game, no other text.';
  try {
    const result = await model.generateContent(prompt);

    // Parsing JSON from the AI's response
    const jsonResponse = JSON.parse(result.response.text());
    response = {
      orginal: jsonResponse.orginal,
      puzzle: shuffleWord(jsonResponse?.orginal), // assuming the puzzle is returned as an array of characters
    };

    return response;
  } catch (error) {
    console.error('Error generating puzzle:', error);
    return false;
  }
};
