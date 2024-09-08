# React Native Puzzle Game Project

This project was bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up to the "Creating a new application" step before proceeding.

### Step 1: Start the Metro Server

To start Metro, the JavaScript bundler that ships with React Native, run the following command from the root of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its own terminal. Open a new terminal from the root of your React Native project. Run the following command to start your Android or iOS app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator. You can also run it directly from Android Studio or Xcode.

### Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor and edit some lines.
2. For Android: Press the <kbd>R</kbd> key twice or select "Reload" from the Developer Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd> on Windows/Linux or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> on macOS).
3. For iOS: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Puzzle Game Integration with Google Generative AI

This project includes a word puzzle game feature powered by Google Generative AI. The game generates a random word and scrambles it for the player to solve.

Here’s how it works:

### API Integration Example

```typescript
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

    const jsonResponse = JSON.parse(result.response.text());
    response = {
      orginal: jsonResponse.orginal,
      puzzle: shuffleWord(jsonResponse.orginal),
    };

    return response;
  } catch (error) {
    console.error('Error generating puzzle:', error);
    return false;
  }
};
```

### How to Run the Puzzle Game

1. Open the puzzle game screen from your app.
2. The game will request a random word from Google’s Generative AI.
3. The word will be scrambled, and you’ll need to solve the puzzle by rearranging the letters.

## API Documentation

For further information on Google Generative AI, refer to:

- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [Google Generative AI API Documentation](https://ai.google.dev/api?lang=node)

### Troubleshooting

If you face issues, check out the [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting) or review the integration steps.

## Learn More

To learn more about React Native:

- [React Native Website](https://reactnative.dev)
- [React Native Getting Started Guide](https://reactnative.dev/docs/environment-setup)
- [Google Generative AI Documentation](https://ai.google.dev/api?lang=node)
