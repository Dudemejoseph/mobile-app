import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Paginator from "../../components/Paginator";
import SwipeView from "../../components/SwipeView";
import { AUTH_SCREEN } from "../../constants/routeNames";
import { COLORS } from "../../constants/theme";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/features/userSlice";

// slide items
const slides = [
  {
    id: "1",
    title: "  Monitor your farm project easily ",
    description:
      "Managing your funds should be the easiest task on your to-do list, so we created wallets just for you",
    image: require("../../assets/images/cultivating.png"),
  },

  {
    id: "2",
    title: "Monitor your tax easily ",
    description: "Send money to any part of the world",
    image: require("../../assets/images/crop-selection.png"),
  },
];

const Onboarding = ({ navigation }) => {
  const { isAuthenticated, loading} = useSelector(userSelector);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { navigate } = navigation;

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const autoScroll = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      slidesRef.current.scrollToIndex({ index: 0 });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      autoScroll();
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <SwipeView item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <View style={styles.cta}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.signupBtn}
          onPress={() => navigate(AUTH_SCREEN)}
        >
          <Text style={styles.signupBtnTxt}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  cta: {
    marginBottom: "50@vs",
    width: "90%",
  },

  loginBtn: {
    width: "100%",
    height: "45@vs",
    borderWidth: 1,
    borderRadius: "12@ms",
    borderColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "14@vs",
  },
  loginBtnTxt: {
    color: COLORS.background,
    fontSize: "20@ms",
    fontFamily: "CircularStd-Medium",
  },
  signupBtn: {
    width: "100%",
    height: "45@vs",
    borderRadius: "12@ms",
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  signupBtnTxt: {
    color: COLORS.primary,
    fontSize: "20@ms",
    fontFamily: "CircularStd-Medium",
  },
});
