import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, StatusBar, View} from 'react-native';
import {generatePuzzule} from '../functions/generatePuzzule';
import RenderItem from './organization/RenderItem';
import styles from './styles';
import colors from '../../assets/constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ResetButton from './molecules/button';
import {useQuery} from '@tanstack/react-query';
const HomeScreen = () => {
  const [puzzleData, setPuzzleData] = useState<string[]>([]);
  const activeIndex = useRef(0);
  const {
    isLoading,
    refetch,
    data: puzzleQueryData,
  } = useQuery({
    queryKey: ['getWords'],
    queryFn: generatePuzzule,
  });
  const newPuzzle = useCallback((v: string[]) => {
    setPuzzleData(v);
  }, []);

  useLayoutEffect(() => {
    if (puzzleQueryData && puzzleQueryData.puzzle.length) {
      newPuzzle(puzzleQueryData.puzzle[0]);
    }
  }, [newPuzzle, puzzleQueryData]);

  const onDragEnd = (e: any) => {
    if (e.join('') === puzzleQueryData?.orginal[activeIndex.current]) {
      Alert.alert(
        'Success',
        'You solved the puzzle! Would you like to restart the game?',
        [
          {
            text: 'No',
            onPress: () => console.log('Game not restarted'),
            style: 'cancel', // Style for "No"
          },
          {
            text: 'Yes',
            onPress: () => newGame(),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const newGame = () => {
    console.log('activeIndex.current ', activeIndex.current);
    if (
      puzzleQueryData?.orginal.length &&
      activeIndex.current === puzzleQueryData?.orginal.length - 1
    ) {
      refetch();
    } else {
      const totalPuzzles = puzzleQueryData?.puzzle?.length || 0;
      activeIndex.current = (activeIndex.current + 1) % totalPuzzles; // Move to next puzzle and wrap around
      newPuzzle(puzzleQueryData?.puzzle[activeIndex.current] ?? []); // Set the new puzzle data
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
      {isLoading ? (
        <ActivityIndicator color={colors.white} size={'large'} />
      ) : (
        <>
          <GestureHandlerRootView>
            <DraggableFlatList
              data={puzzleData}
              renderItem={RenderItem}
              bounces={false}
              keyExtractor={(_, index) => index.toString()}
              onDragEnd={({data}) => onDragEnd(data)}
            />
          </GestureHandlerRootView>
          <ResetButton title="New Game" onPress={() => newGame()} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
