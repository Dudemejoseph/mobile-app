import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
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
          <View style={styles.form}>
            {/* ======== Field Name ========== */}
            <TextInput
              placeholder='Field Name'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========== Size ========= */}
            <TouchableOpacity activeOpacity={0.4} style={styles.dropBtn}>
              <Text style={styles.dropTxt}>Size</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>

            {/* ========== Ownership ========= */}
            <TouchableOpacity activeOpacity={0.4} style={styles.dropBtn}>
              <Text style={styles.dropTxt}>Ownership</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>

            {/* ========== Location ========= */}
            <TouchableOpacity activeOpacity={0.4} style={styles.dropBtn}>
              <Text style={styles.dropTxt}>Location</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>

            {/* ======== Address ========== */}
            <TextInput
              placeholder='Address'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========== Crop type ========= */}
            <TouchableOpacity activeOpacity={0.4} style={styles.dropBtn}>
              <Text style={styles.dropTxt}>Crop Type</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>

            {/* ======== Quantity========== */}
            <TextInput
              placeholder='Quantity Bought'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Description ========== */}
            <TextInput
              placeholder='Description...'
              style={styles.inputDesc}
              multiline
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========= Buttons ======== */}
            <View style={styles.btnView}>
              <TouchableOpacity activeOpacity={0.6} style={styles.createBtn}>
                <Text style={styles.createTxt}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.cancelBtn}>
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginTop: "20@ms",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  form: {
    width: "100%",
    padding: "14@ms",
  },
  input: {
    width: "100%",
    height: "40@vs",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    color: COLORS.text_dark,
    paddingHorizontal: "10@ms",
    fontFamily: "Poppins-Regular",
    marginTop: "15@vs",
  },
  inputDesc: {
    width: "100%",
    height: "80@vs",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    color: COLORS.text_dark,
    paddingHorizontal: "10@ms",
    fontFamily: "Poppins-Regular",
    marginTop: "15@vs",
    backgroundColor: COLORS.surface,
  },
  dropBtn: {
    height: "40@vs",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "10@ms",
    marginTop: "15@vs",
  },
  dropIcon: {
    width: "10@ms",
    height: "10@ms",
    resizeMode: "contain",
  },
  dropTxt: {
    color: COLORS.text_grey,
    fontFamily: "Poppins-Regular",
  },
  btnView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "40@vs",
  },
  createBtn: {
    width: "90@ms",
    height: "35@vs",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginRight: "15@ms",
    borderRadius: 4,
  },
  createTxt: {
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    color: COLORS.background,
  },
  cancelTxt: {
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    color: COLORS.primary,
  },
});
