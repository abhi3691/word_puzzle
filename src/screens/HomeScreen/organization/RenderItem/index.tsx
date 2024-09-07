import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import colors from '../../../../components/constants/colors';

const RenderItem = ({item, drag, isActive}: RenderItemParams<string>) => {
  const borderColor = isActive ? colors.blue : colors.white;
  return (
    <ScaleDecorator activeScale={0.8}>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[styles.letterContainer, {borderColor: borderColor}]}>
        <Text style={styles.letter}>{item}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

export default RenderItem;
