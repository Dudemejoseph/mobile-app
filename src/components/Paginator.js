import React from 'react';
import {View, Animated, useWindowDimensions} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS} from '../constants/theme';

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row', height: 64}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,

          outputRange: [12, 12, 12],

          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,

          outputRange: [0.3, 1, 0.3],

          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = ScaledSheet.create({
  dot: {
    height: 12,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginHorizontal: '8@ms',
  },
});
