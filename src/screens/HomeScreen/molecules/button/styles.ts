import {StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    marginTop: 20,
  },
  title: {
    color: colors.white,
    fontSize: 20,
  },
});
export default styles;
