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
import {
  createFarm,
  farmSelector,
  fetchCountries,
  fetchStates,
} from "../../redux/features/farmSlice";

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
  const { states } = useSelector(farmSelector);
  const [lgas, setLGAS] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState("LGA");
  const [selectedState, setSelectedState] = useState("State");
  const [showSizePicker, setShowSize] = useState(false);
  const [showOwnerPicker, setShowOwner] = useState(false);
  const [showStatesPicker, setShowStates] = useState(false);
  const [showLGAPicker, setShowLGAPicker] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [size_unit, setUnit] = useState("Size Unit");
  const [location, setLocation] = useState("");
  const [ownership, setOwnership] = useState("Ownership");
  const [coordinates, setCoordinates] = useState("");
  const [country_id, setCountry] = useState(161);
  const [lga_id, setLGA] = useState("");
  const [state_id, setStateID] = useState("");

  //   ======= Fetch Countries ======
  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchStates());
  }, [dispatch]);

  const submitFarmData = () => {
    const data = {
      name,
      size,
      size_unit,
      location,
      location_type: "address",
      ownership,
      coordinates,
      country_id,
      state_id,
      lga_id,
      crop_id: 1,
    };
    dispatch(createFarm(data));
  };

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

            {/* ========== States ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowStates(!showStatesPicker)}
            >
              <Text style={styles.dropTxt}>{selectedState}</Text>
              <Image
                source={require("../../assets/icons/drop-icon.png")}
                style={styles.dropIcon}
              />
            </TouchableOpacity>
            {showStatesPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {states.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setStateID(item.id);
                        setLGAS(item.lgas);
                        setSelectedState(item.name);
                        setShowStates(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== LGAs ========= */}
            {lgas.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.dropBtn}
                onPress={() => setShowLGAPicker(!showLGAPicker)}
              >
                <Text style={styles.dropTxt}>{selectedLGA}</Text>
                <Image
                  source={require("../../assets/icons/drop-icon.png")}
                  style={styles.dropIcon}
                />
              </TouchableOpacity>
            )}
            {showLGAPicker && (
              <Animatable.View style={styles.sizePicker} animation='fadeIn'>
                {lgas.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setLGA(item.id);
                        setSelectedLGA(item.name);
                        setShowLGAPicker(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ======== Address ========== */}
            <TextInput
              placeholder='Address'
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              value={location}
              onChangeText={(val) => setLocation(val)}
            />
            <View style={styles.btnView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.createBtn}
                onPress={submitFarmData}
              >
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
});
