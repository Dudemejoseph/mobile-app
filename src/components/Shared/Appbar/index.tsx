import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Appbar, Avatar, Badge } from "react-native-paper";
import { PROFILE_STACK } from "../../../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { AppbarType } from "../../../interfaces/shared_components";
import styles from "./styles";

const AppbarComponent: React.FC<AppbarType> = ({ title, backButton, profileIcon = true, search = true }) => {
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
      {search && <Appbar.Action icon="magnify" />}
      <View style={styles.badgeView}>
        <Appbar.Action icon="bell" color={dark ? colors.primary : combinedDefaultTheme.colors.backdrop} />
        <Badge
          theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          style={[
            styles.badge,
            {
              backgroundColor: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.primary,
              color: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.background,
            },
          ]}
        >
          3
        </Badge>
      </View>
      {profileIcon && (
        <TouchableOpacity onPress={() => navigation.navigate(PROFILE_STACK as any)}>
          <Avatar.Image
            size={32}
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/ADea4I4_iCRtDwSjCQXdHrWZkDS7UyjWb82972L-R1SPfQ=s83-c-mo",
            }}
          />
        </TouchableOpacity>
      )}
    </Appbar.Header>
  );
};

export default AppbarComponent;
