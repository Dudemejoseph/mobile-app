import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Wrapper from '../../components/Wrapper';
import {COLORS} from '../../constants/theme';

const ResetPassword = () => {
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headTxt}>Reset password</Text>

        {/* ========== Email ========= */}
        <TextInput
          placeholder="Email"
          placeholderTextColor={COLORS.text_grey}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        {/* ========== Button View ============= */}
        <View style={styles.buttonView}>
          <TouchableOpacity activeOpacity={0.6} style={styles.registerBtn}>
            <Text style={styles.registerTxt}>Send request password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default ResetPassword;

const styles = ScaledSheet.create({
  input: {
    width: '100%',
    height: '42@vs',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: '10@ms',
    color: COLORS.text_grey,
    borderColor: '#F3F3F3',
    marginBottom: '15@vs',
    fontFamily: 'CircularStd-Medium',
  },
  buttonView: {
    marginTop: '10@vs',
  },
  registerBtn: {
    width: '100%',
    height: '45@vs',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  registerTxt: {
    fontFamily: 'CircularStd-Medium',
    color: COLORS.background,
  },
  headTxt: {
    fontFamily: 'CircularStd-Medium',
    fontSize: '16@ms',
    fontWeight: '700',
    marginBottom: '30@vs',
  },
});
