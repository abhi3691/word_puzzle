import {StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';

const styles = StyleSheet.create({
  letterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: colors.green,
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
  },
  activeStyle: {
    elevation: 3,
    shadowColor: colors.green,
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  letter: {
    fontSize: 24,
    color: colors.white,
  },
});

export default styles;
