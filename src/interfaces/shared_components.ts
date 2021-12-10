import { PaginationData } from "./farm";
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

export interface AppbarType {
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  search?: boolean;
  otherRightIcon?: boolean;
  profileIcon?: boolean;
}

export interface PayloadType {
  payload: {
    data?: [];
    message?: string | any;
    error?: any;
    paginationData?: PaginationData;
    action?: Function;
  };
}

export interface CarouselDataType {
  id: number;
  title: string;
  percentage: number;
  percent: number;
  color?: string;
  size?: number;
  crop?: string;
}

export interface HomeDIrectoryProps {
  id?: number;
  title: string;
  color: string;
  onAction: Function;
}

export interface ErrorComponentProps {
  error: string;
  action: Function;
  loading: boolean;
}
