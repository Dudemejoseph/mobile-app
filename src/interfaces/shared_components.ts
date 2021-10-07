import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactNode } from "react";
import {
  StyleProp,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from "react-native";

export interface WrapperTypes {
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}

export type OnboardingTypes = {
  id: number;
  title: string;
};

export interface OnboardingItemProps {
  item: OnboardingTypes;
}

export interface PaginatorProps {
  item: OnboardingTypes[];
  scrollX: any;
}

export interface DefaultScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route?: RouteProp<any, any>;
}

export interface CustomTextInputProps extends RNTextInputProps {
  icon?: string;
  touched?: boolean;
  error?: string;
}
