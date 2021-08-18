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
    }}
    style={{
      backgroundColor: COLORS.background,
      elevation: 0,
      height: 50,
      padding: 0,
      margin: 0,
      width: "100%",
    }}
    activeColor={COLORS.primary}
    inactiveColor={COLORS.text_grey}
    scrollEnabled
    renderLabel={({ route, color }) => (
      <Text style={{ color, margin: 0 }}>{route.title}</Text>
    )}
  />
);

const Auths = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Register" },
    { key: "second", title: "Login" },
  ]);
  return (
    <Wrapper>
      <Text>Auth</Text>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: () => <Register navigation={navigation} />,
          second: () => <Login navigation={navigation} />,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Wrapper>
  );
};

export default Auths;

const styles = ScaledSheet.create({});
