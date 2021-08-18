import React, { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLORS } from "../../constants/theme";
import Login from "./Login";
import Register from "./Register";

/**
 * Renders the Tab Bar
 * @param {*} props
 * @returns TabBar
 */
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: COLORS.primary,
      width: 50,
    }}
    tabStyle={{ alignItems: "flex-start", padding: 0 }}
    style={{
      backgroundColor: COLORS.background,
      elevation: 0,
      height: 42,
      padding: 0,
      margin: 0,
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
      marginBottom: 30,
    }}
    activeColor={COLORS.primary}
    inactiveColor={COLORS.text_grey}
    scrollEnabled
    renderLabel={({ route, color }) => (
      <Text style={{ color, margin: 0, textAlign: "left" }}>{route.title}</Text>
    )}
  />
);

const Auths = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "first", title: "Register" },
    { key: "second", title: "Login" },
  ]);
  return (
    <Wrapper>
      <Text style={styles.headTxt}>Welcome to Farm Monitor</Text>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: () => (
            <Register
              navigation={navigation}
              setIndex={setIndex}
              index={index}
            />
          ),
          second: () => (
            <Login navigation={navigation} setIndex={setIndex} index={index} />
          ),
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Wrapper>
  );
};

export default Auths;

const styles = ScaledSheet.create({
  headTxt: {
    fontSize: "18@ms",
    fontWeight: "700",
    textAlign: "center",
    marginTop: "40@vs",
    marginBottom: "20@vs",
  },
});
