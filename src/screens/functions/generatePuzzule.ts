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
  original: string[];
  puzzle: string[][];
}

const shuffleWord = (word: string): string[] => {
  let shuffled = word.split('');

  // Shuffle the word until it's different from the original
  do {
    shuffled = shuffled.sort(() => Math.random() - 0.5);
  } while (shuffled.join('') === word);

  return shuffled;
};

export type difficultyType = 'easy' | 'medium' | 'hard';
export const generatePuzzle = async (
  difficulty: difficultyType = 'medium',
): Promise<PuzzleProps> => {
  let response: PuzzleProps = {
    original: [],
    puzzle: [],
  };

  let prompt = `Generate a word puzzle with a difficulty level of ${difficulty}. Words should have a maximum of 8 letters. Provide the output as an array of original words only, like ["word1", "word2", "word3", ...]. Limit the number of words to 10 per page, and include pagination.`;

  try {
    const result = await model.generateContent(prompt);
    // Parsing JSON from the AI's response
    const jsonResponse = JSON.parse(result.response.text());

    response = {
      original: jsonResponse,
      puzzle: jsonResponse.map((value: string) => shuffleWord(value)),
    };
  } catch (error) {
    console.error('Error generating puzzle:', error);
    response = {
      original: [],
      puzzle: [],
    };
    throw error;
  }
  return response;
};
