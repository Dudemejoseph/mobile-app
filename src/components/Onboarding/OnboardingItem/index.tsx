import React from "react";
import { useColorScheme, useWindowDimensions, View } from "react-native";
import { Text } from "react-native-paper";
import CropSelection from "../../../assets/svgs/crop_selection.svg";
import PeasantTools from "../../../assets/svgs/peasant_tools.svg";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { OnboardingItemProps } from "../../../interfaces/shared_components";
import styles from "./styles";

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.image]}>
        {item.id === 1 && (
          <PeasantTools stroke={scheme === "dark" ? "green" : "transparent"} />
        )}
        {item.id === 2 && (
          <CropSelection stroke={scheme === "dark" ? "green" : "transparent"} />
        )}
      </View>
      <View style={styles.titleView}>
        <Text
          style={[
            styles.title,
            {
              color:
                scheme === "dark"
                  ? combinedDarkTheme.colors.text
                  : combinedDefaultTheme.colors.background,
            },
          ]}
        >
          {item.title}
        </Text>
      </View>
    </View>
  );
};

export default OnboardingItem;
