import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const RenderItem = ({item, drag, isActive}: RenderItemParams<string>) => {
  return (
    <ScaleDecorator activeScale={1.1}>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[styles.letterContainer, isActive && styles.activeStyle]}>
        <Text style={styles.letter}>{item}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

export default RenderItem;
