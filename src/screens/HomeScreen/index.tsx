import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, StatusBar, View, Text} from 'react-native';
import {generatePuzzule} from '../functions/generatePuzzule';
import RenderItem from './organization/RenderItem';
import styles from './styles';
import colors from '../../assets/constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ResetButton from './molecules/button';
import {useQuery} from '@tanstack/react-query';
import {
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController,
} from 'rn-tourguide';

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
            style: 'cancel',
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
    if (
      puzzleQueryData?.orginal.length &&
      activeIndex.current === puzzleQueryData?.orginal.length - 1
    ) {
      refetch();
    } else {
      const totalPuzzles = puzzleQueryData?.puzzle?.length || 0;
      activeIndex.current = (activeIndex.current + 1) % totalPuzzles;
      newPuzzle(puzzleQueryData?.puzzle[activeIndex.current] ?? []);
    }
  };

  // Tour Guide Setup
  const {canStart, start, eventEmitter} = useTourGuideController();

  React.useEffect(() => {
    if (canStart) {
      start();
    }
  }, [canStart]);

  const handleOnStart = () => console.log('Tour started');
  const handleOnStop = () => console.log('Tour stopped');
  const handleOnStepChange = () => console.log('Step changed');

  React.useEffect(() => {
    eventEmitter?.on('start', handleOnStart);
    eventEmitter?.on('stop', handleOnStop);
    eventEmitter?.on('stepChange', handleOnStepChange);

    return () => {
      eventEmitter?.off('start', handleOnStart);
      eventEmitter?.off('stop', handleOnStop);
      eventEmitter?.off('stepChange', handleOnStepChange);
    };
  }, [eventEmitter]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />

      {isLoading ? (
        <ActivityIndicator color={colors.white} size={'large'} />
      ) : (
        <View>
          <GestureHandlerRootView>
            <DraggableFlatList
              data={puzzleData}
              renderItem={RenderItem}
              bounces={false}
              keyExtractor={(_, index) => index.toString()}
              onDragEnd={({data}) => onDragEnd(data)}
            />
          </GestureHandlerRootView>
          <TourGuideZoneByPosition
            zone={1}
            shape={'circle'}
            text="Drag these letters to solve the puzzle!"
            isTourGuide
            top={30}
            left={50}
            width={200}
            height={50}
          />
          {/* Tour Guide for Reset Button */}
          <TourGuideZone
            zone={2}
            text="click New  Game to  start with new the puzzle!">
            <ResetButton title="New Game" onPress={() => newGame()} />
          </TourGuideZone>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
