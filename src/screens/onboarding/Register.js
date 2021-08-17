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
import {LOGIN_SCREEN} from '../../constants/routeNames';
import {COLORS} from '../../constants/theme';

const Register = ({navigation}) => {
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headTxt}>Register</Text>

        {/* ========= Full Name ========= */}
        <TextInput
          placeholder="Full name"
          placeholderTextColor={COLORS.text_grey}
          autoCapitalize="words"
          style={styles.input}
        />

        {/* ========== Email ========= */}
        <TextInput
          placeholder="Email"
          placeholderTextColor={COLORS.text_grey}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        {/* ========= Phone Number ========== */}
        <TextInput
          placeholder="Phone number"
          placeholderTextColor={COLORS.text_grey}
          autoCapitalize="none"
          keyboardType="number-pad"
          style={styles.input}
        />

        {/* ========= Password ======== */}
        <View style={styles.inputView}>
          <TextInput
            placeholder="Create password"
            placeholderTextColor={COLORS.text_grey}
            autoCapitalize="none"
            secureTextEntry
            style={styles.input2}
          />
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/visible-eye-icon.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ========= Select Location ========= */}
        <View style={styles.inputView}>
          <TextInput
            placeholder="Select location"
            placeholderTextColor={COLORS.text_grey}
            autoCapitalize="none"
            secureTextEntry
            style={styles.input2}
          />
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/drop-icon.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ========== Button View ============= */}
        <View style={styles.buttonView}>
          <TouchableOpacity activeOpacity={0.6} style={styles.registerBtn}>
            <Text style={styles.registerTxt}>Register</Text>
          </TouchableOpacity>

          {/* ===== Login ====== */}
          <View style={styles.login}>
            <Text style={styles.loginTxt}>Already have an account?</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate(LOGIN_SCREEN)}>
              <Text style={styles.loginTxt2}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Register;

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

  inputView: {
    width: '100%',
    height: '42@vs',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#F3F3F3',
    marginBottom: '15@vs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10@ms',
  },
  eyeIcon: {
    width: '16@ms',
    height: '14@ms',
    resizeMode: 'contain',
  },
  input2: {
    width: '90%',
    fontFamily: 'CircularStd-Medium',
    color: COLORS.text_grey,
  },
  buttonView: {
    marginTop: '40@vs',
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
  login: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15@vs',
  },
  loginTxt: {
    fontFamily: 'CircularStd-Medium',
    fontSize: '14@ms',
    marginRight: '5@ms',
  },
  loginTxt2: {
    fontFamily: 'CircularStd-Medium',
    fontSize: '14@ms',
    marginRight: '5@ms',
    color: COLORS.primary,
  },
  headTxt: {
    fontFamily: 'CircularStd-Medium',
    fontSize: '16@ms',
    fontWeight: '700',
    marginBottom: '30@vs',
  },
});
