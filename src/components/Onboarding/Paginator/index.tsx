import React from "react";
import {
  Animated,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { PaginatorProps } from "../../../interfaces/shared_components";
import styles from "./styles";

const Paginator: React.FC<PaginatorProps> = ({ item, scrollX }) => {
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();

  return (
    <View style={styles.container}>
      {item.map((_, i) => {
        // for the dots on the onboarding
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.dot,
              {
                width: dotWidth,
                backgroundColor:
                  scheme === "dark"
                    ? combinedDarkTheme.colors.primary
                    : combinedDefaultTheme.colors.background,
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
