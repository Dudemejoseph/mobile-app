import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../components/Shared/Wrapper";
import { COLORS } from "../../constants/theme";
import { fetchActivities } from "../../redux/features/farmSlice";
import {
  addInventory,
  inventorySelector,
} from "../../redux/features/inventorySlice";

const AddInventory = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setDate] = useState("Select Date");
  const [product, setProduct] = useState(null);
  const [type, setType] = useState(null);
  const [purchase_quantity, setPurchaseQuantity] = useState(null);
  const [size, setSize] = useState(null);
  const [name, setName] = useState(null);
  const { error, message, loading } = useSelector(inventorySelector);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDate = (date) => {
    setDate(date.toString().substr(0, 16));
    hideDatePicker();
  };

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  useEffect(() => {
    message &&
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        topOffset: 40,
      });

    message && navigation.navigate("Finance");
  }, [message, navigation]);

  useEffect(() => {
    error &&
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
        topOffset: 40,
      });
  }, [error]);

  const handleSubmit = () => {
    let data = {
      type,
      name,
      size,
      purchase_quantity,
      purchace_price: null,
      purchase_date: null,
      note: null,
      product,
    };
    dispatch(addInventory(data));
  };

  return (
    <Wrapper customStyle={{ flex: 1, backgroundColor: "white", padding: 10 }}>
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
              source={require("../../assets/icons/user-profile.png")}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Inventory</Text>

        {/* ======= Log In Activities ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Add Inventory</Text>
          <View style={styles.form}>
            {/* ========== Select Date ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dateBtn}
              onPress={showDatePicker}
            >
              <Image
                source={require("../../assets/icons/calender-icon.png")}
                style={styles.dateIcon}
              />
              <Text style={styles.dropTxt}>{selectedDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDate}
              onCancel={hideDatePicker}
            />

            {/* ======== Product ========== */}
            <TextInput
              placeholder="Product"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              value={product}
              onChangeText={(e) => setProduct(e)}
            />

            {/* ======== Brand ========== */}
            <TextInput
              placeholder="Brand"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              value={type}
              onChangeText={(e) => setType(e)}
            />

            {/* ======== Name ========== */}
            <TextInput
              placeholder="Name"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              value={name}
              onChangeText={(e) => setName(e)}
            />

            {/* ======== Starting Stock ========== */}
            <TextInput
              placeholder="Starting Stock"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Added Stock ========== */}
            <TextInput
              placeholder="Added Stock"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              value={purchase_quantity}
              onChangeText={(e) => setPurchaseQuantity(e)}
            />

            {/* ======== Used Stock ========== */}
            <TextInput
              placeholder="Used Stock"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Remaining Stock ========== */}
            <TextInput
              placeholder="Remaining Stock"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Variance ========== */}
            <TextInput
              placeholder="Variance"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Size ========== */}
            <TextInput
              placeholder="Size"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
              value={size}
              onChangeText={(e) => setSize(e)}
            />

            {/* ======== Amount checked out ========== */}
            <TextInput
              placeholder="Amount checked"
              style={styles.input}
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ======== Description ========== */}
            <TextInput
              placeholder="Purpose..."
              style={styles.inputDesc}
              multiline
              placeholderTextColor={COLORS.text_grey}
            />

            {/* ========= Buttons ======== */}
            <View style={styles.btnView}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.createBtn}
                onPress={handleSubmit}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.background} />
                ) : (
                  <Text style={styles.createTxt}>Create</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default AddInventory;

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
  dateBtn: {
    height: "40@vs",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10@ms",
    marginTop: "15@vs",
  },
  dropIcon: {
    width: "10@ms",
    height: "10@ms",
    resizeMode: "contain",
  },
  dateIcon: {
    width: "18@ms",
    height: "18@ms",
    resizeMode: "contain",
    marginRight: "10@ms",
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
    borderRadius: 4,
  },
  createTxt: {
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    color: COLORS.background,
  },
});
