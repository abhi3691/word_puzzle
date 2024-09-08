import {GoogleGenerativeAI, SchemaType} from '@google/generative-ai';
import Config from 'react-native-config';

const genAI = new GoogleGenerativeAI(Config.API_KEY ?? '');
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: SchemaType.ARRAY,
      items: {type: SchemaType.STRING},
    },
  },
});

export interface PuzzleProps {
  orginal: string[];
  puzzle: string[][];
}
const shuffleWord = (word: string) => {
  return word.split('').sort(() => Math.random() - 0.5);
};

export const generatePuzzule = async (): Promise<PuzzleProps> => {
  let response: PuzzleProps = {
    orginal: [],
    puzzle: [],
  };
  let prompt =
    'Generate a 100 random word and word length maximum 7, for a puzzle game dont repeate words in this 100 and every time genrate new words dont repate previous generate';
  try {
    const result = await model.generateContent(prompt);

    // Parsing JSON from the AI's response
    const jsonResponse = JSON.parse(result.response.text());
    response = {
      orginal: jsonResponse,
      puzzle: jsonResponse.map((value: string) => shuffleWord(value)), // assuming the puzzle is returned as an array of characters
    };
  } catch (error) {
    console.error('Error generating puzzle:', error);
    response = {
      orginal: [],
      puzzle: [],
    };
    throw error;
  }
  return response;
};
