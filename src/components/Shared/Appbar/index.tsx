import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Appbar, Avatar, Badge } from "react-native-paper";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { AppbarType } from "../../../interfaces/shared_components";
import styles from "./styles";

const AppbarComponent: React.FC<AppbarType> = ({ title, backButton }) => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  return (
    <Appbar.Header
      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
      dark={dark}
      style={{ backgroundColor: colors.background }}
    >
      {backButton && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content title={title ? title : ""} subtitle="" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <View style={styles.badgeView}>
        <Appbar.Action
          icon="bell"
          color={dark ? colors.primary : combinedDefaultTheme.colors.backdrop}
          onPress={() => {}}
        />
        <Badge
          theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          style={[
            styles.badge,
            {
              backgroundColor: dark
                ? combinedDarkTheme.colors.text
                : combinedDefaultTheme.colors.primary,
              color: dark
                ? combinedDarkTheme.colors.primary
                : combinedDefaultTheme.colors.background,
            },
          ]}
        >
          3
        </Badge>
      </View>

      <Avatar.Image
        size={32}
        source={{
          uri: "https://lh3.googleusercontent.com/ogw/ADea4I4_iCRtDwSjCQXdHrWZkDS7UyjWb82972L-R1SPfQ=s83-c-mo",
        }}
      />
    </Appbar.Header>
  );
};

export default AppbarComponent;
