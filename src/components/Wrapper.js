import React from 'react';
import {StatusBar, View} from 'react-native';
import {COLORS} from '../constants/theme';
import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';

const Wrapper = ({...props}) => {
  return (
    <SafeAreaView style={[styles.wrapper, props.style]}>
      {/* <StatusBar
        backgroundColor={COLORS.background}
        barStyle="dark-content"
        translucent={true}
      /> */}
      {props.children}
    </SafeAreaView>
  );
};

export default Wrapper;

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: '20@ms',
    paddingTop: Platform.OS === 'ios' ? '10@vs' : '20@ms',
  },
});
