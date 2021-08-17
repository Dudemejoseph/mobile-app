import React from 'react';
import {Text, View, Image, useWindowDimensions} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS} from '../constants/theme';

const SwipeView = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />

      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

export default SwipeView;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 0.5,
    justifyContent: 'center',
  },

  title: {
    fontWeight: '800',
    fontSize: '38@ms',
    marginBottom: '10@vs',
    textAlign: 'center',
    color: COLORS.background,
    fontFamily: 'CircularStd-Medium',
  },

  desc: {
    fontWeight: '300',
    fontSize: '14@ms',
    textAlign: 'center',
    color: '#62656b',
    paddingHorizontal: '64@ms',
  },
});
