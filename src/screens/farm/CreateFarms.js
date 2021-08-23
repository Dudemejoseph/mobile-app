import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import { COLORS } from "../../constants/theme";

const CreateFarms = ({ navigation }) => {
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========= Header View ========= */}
        <View style={styles.headerView}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/icons/back-arrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/bell-icon.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Create Farms</Text>

        {/* ======= Field Form ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Field Form</Text>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default CreateFarms;

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.background,
    flex: 1,
  },
  headerView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bellIcon: {
    width: "24@ms",
    height: "24@ms",
    resizeMode: "contain",
  },
  backIcon: {
    width: "24@ms",
    height: "24@ms",
    resizeMode: "contain",
  },

  headerTxt: {
    fontSize: "18@ms",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    marginTop: "20@vs",
  },
  formView: {
    width: "100%",
    height: "100%",
    marginTop: "20@ms",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },

  headTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
    fontFamily: "Poppins-Regular",
    padding: "12@ms",
    backgroundColor: COLORS.surface,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
