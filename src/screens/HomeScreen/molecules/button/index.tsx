import {Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
interface props {
  title: string;
  onPress: () => void;
}

const ResetButton: FC<props> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ResetButton;
