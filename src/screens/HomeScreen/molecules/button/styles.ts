import {StyleSheet} from 'react-native';
import colors from '../../../../assets/constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  title: {
    color: colors.white,
    fontSize: 20,
  },
});
export default styles;
