import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import colors from '../../../../constants/colors';
interface props {
  title: string;
  onPress: () => void;
  isFetching: boolean;
}

const ResetButton: FC<props> = ({title, onPress, isFetching}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={isFetching}>
      {isFetching ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ResetButton;
