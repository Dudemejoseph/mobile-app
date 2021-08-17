import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../screens/onboarding/Onboarding';
import {
  LOGIN_SCREEN,
  ONBOARDING_SCREEN,
  REGISTER_SCREEN,
  RESET_PASSWORD_SCREEN,
} from '../constants/routeNames';
import Register from '../screens/onboarding/Register';
import Login from '../screens/onboarding/Login';
import ResetPassword from '../screens/onboarding/ResetPassword';

const Auth = createStackNavigator();

const AuthRoute = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name={ONBOARDING_SCREEN} component={Onboarding} />
      <Auth.Screen name={REGISTER_SCREEN} component={Register} />
      <Auth.Screen name={LOGIN_SCREEN} component={Login} />
      <Auth.Screen name={RESET_PASSWORD_SCREEN} component={ResetPassword} />
    </Auth.Navigator>
  );
};

export default AuthRoute;
