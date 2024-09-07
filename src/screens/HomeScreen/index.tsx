import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {generatePuzzule} from '../functions/generatePuzzule';
import RenderItem from './organization/RenderItem';
import styles from './styles';
import colors from '../../components/constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ResetButton from './molecules/button';
const HomeScreen = () => {
  const [puzzleData, setPuzzleData] = useState<string[]>([]);
  const orginalWord = useRef('');
  const [loading, setLoading] = useState(false);

  const loadPuzzle = useCallback(async () => {
    setLoading(true);
    let res = await generatePuzzule();
    if (res && typeof res !== 'boolean' && res) {
      const newPuzzle: string[] = res?.puzzle;
      if (newPuzzle.length) {
        setPuzzleData(newPuzzle);
      }
      orginalWord.current = res.orginal;
      setLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    loadPuzzle();
  }, [loadPuzzle]);
  console.log('orginalWord.current', orginalWord.current);

  const onDragEnd = (data: any) => {
    setPuzzleData(data);
    if (data.join('') === orginalWord.current) {
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
            onPress: () => loadPuzzle(), // Restart the game
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.white} size={'large'} />
      ) : (
        <>
          <GestureHandlerRootView>
            <DraggableFlatList
              data={puzzleData}
              renderItem={RenderItem}
              keyExtractor={(v, index) => index.toString()}
              onDragEnd={({data}) => onDragEnd(data)}
            />
          </GestureHandlerRootView>
          <ResetButton title="Restart Game" onPress={() => loadPuzzle()} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
