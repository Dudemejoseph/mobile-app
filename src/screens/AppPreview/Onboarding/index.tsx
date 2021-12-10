import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import OnboardingItem from "../../../components/Onboarding/OnboardingItem";
import Paginator from "../../../components/Onboarding/Paginator";
import Wrapper from "../../../components/Shared/Wrapper";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { OnboardingItemProps } from "../../../interfaces/shared_components";
import { setOnboarding } from "../../../redux/features/user/user_actions";
import onboarding_slides from "../../../seeder/onboarding_slides";
import styles from "./styles";

const OnboardingScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef: any = useRef(null);
  const scheme = useColorScheme();

  const scrollTo = async () => {
    if (currentIndex < onboarding_slides.length - 1) {
      slidesRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      dispatch(setOnboarding());
    }
  };

  return (
    <Wrapper>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              scheme === "dark"
                ? combinedDarkTheme.colors.background
                : combinedDefaultTheme.colors.primary,
          },
        ]}
      >
        <FlatList
          data={onboarding_slides}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
          renderItem={({ item }: OnboardingItemProps) => (
            <OnboardingItem item={item} />
          )}
        />
        <View style={[styles.bottomView, { width }]}>
          <Paginator item={onboarding_slides} scrollX={scrollX} />
          <Button
            mode={scheme === "dark" ? "outlined" : "contained"}
            color={
              scheme === "dark"
                ? combinedDarkTheme.colors.background
                : combinedDefaultTheme.colors.background
            }
            labelStyle={[
              styles.buttonLabelStyle,
              {
                color:
                  scheme === "dark"
                    ? combinedDarkTheme.colors.text
                    : combinedDefaultTheme.colors.primary,
              },
            ]}
            contentStyle={styles.buttonInnerStyle}
            style={styles.buttonOuterStyle}
            uppercase={false}
            onPress={() => scrollTo()}
          >
            {currentIndex === 0 ? "Next" : "Get Started"}
          </Button>
        </View>
      </View>
    </Wrapper>
  );
};

export default OnboardingScreen;
