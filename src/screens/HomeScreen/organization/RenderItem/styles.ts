import {StyleSheet} from 'react-native';
import ScreenRatio from '../../../../assets/constants/ScreenRatio';
import colors from '../../../../assets/constants/colors';

const styles = StyleSheet.create({
  letterContainer: {
    width: ScreenRatio.width * 0.8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: colors.green,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  letter: {
    fontSize: 24,
    color: colors.white,
  },
});

export default styles;
