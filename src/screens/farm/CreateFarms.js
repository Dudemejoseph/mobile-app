import React, { useState, useEffect } from "react";
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
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { farmSelector, fetchCountries } from "../../redux/features/farmSlice";

const sizes = [
  {
    id: "1",
    name: "sqm (square meters)",
  },
  {
    id: "2",
    name: "sqkm (square kilometers)",
  },
  {
    id: "3",
    name: "ha (hectares)",
  },
  {
    id: "4",
    name: "sqft (square feet)",
  },
];

const ownerships = [
  {
    id: "1",
    name: "owned",
  },
  {
    id: "2",
    name: "rented",
  },
];

const CreateFarms = ({ navigation }) => {
  const dispatch = useDispatch();
  const { countries } = useSelector(farmSelector);
  const [showSizePicker, setShowSize] = useState(false);
  const [showOwnerPicker, setShowOwner] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [size_unit, setUnit] = useState("Size Unit");
  const [loaction, setLocation] = useState("");
  const [ownership, setOwnership] = useState("Ownership");
  const [coordinates, setCoordinates] = useState([]);
  const [lga_id, setLGA] = useState("");
  const [state_id, setState] = useState("");

  // ======== Country Picker ==========
  const [country_id, setCountry] = useState("Country");
  const [countryVisible, setCountryVisible] = useState(false);

  const onShowCountryPicker = () => {
    setCountryVisible(true);
  };

  const onSelectCountry = (item) => {
    setCountry(item.label);
    setCountryVisible(false);
  };

  const onCancelCountry = () => {
    setCountryVisible(false);
  };

  //   ======= Fetch Countries ======
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

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
              value={name}
              onChangeText={(val) => setName(val)}
            />

            {/* ======== Size ========== */}
            <TextInput
              placeholder='Size'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              value={size}
              onChangeText={(val) => setSize(val)}
            />

            {/* ========== Size Unit ========= */}
            <View>
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.dropBtn}
                onPress={() => setShowSize(!showSizePicker)}
              >
                <Text style={styles.dropTxt}>{size_unit}</Text>
                <Image
                  source={require("../../assets/icons/drop-icon.png")}
                  style={styles.dropIcon}
                />
              </TouchableOpacity>
              {showSizePicker && (
                <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                  {sizes.map((item) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        key={item.id}
                        style={styles.size}
                        onPress={() => {
                          setUnit(item.name);
                          setShowSize(false);
                        }}
                      >
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </Animatable.View>
              )}
            </View>

            {/* ========== Ownership ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowOwner(!showOwnerPicker)}
            >
              <Text style={styles.dropTxt}>{ownership}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showOwnerPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {ownerships.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setOwnership(item.name);
                        setShowOwner(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Country ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={onShowCountryPicker}
            >
              <Text style={styles.dropTxt}>Country</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            <ModalFilterPicker
              visible={countryVisible}
              onSelect={onSelectCountry}
              onCancel={onCancelCountry}
              options={countriesArray}
              listContainerStyle={{
                backgroundColor: "#fff",
                width: "90%",
                marginTop: 100,
                marginBottom: 20,
                height: "60%",
                borderRadius: 10,
              }}
              optionTextStyle={styles.optionTextStyle}
              filterTextInputStyle={styles.fontModalStyle}
              cancelButtonTextStyle={styles.cancelButtonTextStyle}
              cancelButtonStyle={styles.cancelButtonStyle}
              overlayStyle={styles.overlay}
            />

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
  sizePicker: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 5,
    borderRadius: 4,
    zIndex: 10000,
  },
  size: {
    padding: "6@ms",
  },
  fontModalStyle: {
    fontSize: 16,
    padding: 15,
  },
  optionTextStyle: {
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignContent: "flex-start",
    textAlign: "left",
    fontFamily: "CircularStd-Book",
    width: "100%",
  },
  cancelButtonStyle: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  cancelButtonTextStyle: {
    color: "#fff",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
