import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import ImagePicker from "react-native-image-crop-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Modal, Portal } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../components/Shared/Wrapper";
import { COLORS } from "../constants/theme";

const emergencies = [
  {
    id: "1",
    name: "Snake bite",
  },
  {
    id: "2",
    name: "Knife wound",
  },
  {
    id: "3",
    name: "Herdsmen",
  },
  {
    id: "4",
    name: "Scorpion",
  },
  {
    id: "5",
    name: "Bandits",
  },
  {
    id: "6",
    name: "Fire",
  },
];

const Emergency = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState("Select Date");
  const [time, setTime] = useState("Select Time");
  const [showEmergencyPicker, setShowEmergency] = useState(false);
  const [emergency, setEmergency] = useState("Type of Emergency");
  const containerStyle = {
    backgroundColor: "white",
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDate = (date) => {
    setDate(date.toString().substr(0, 16));
    hideDatePicker();
  };

  const handleTime = (time) => {
    setTime(time.toString().substr(16, 5));
    hideTimePicker();
  };

  const openGallery = () => {
    hideModal();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image?.path);
    });
  };

  const openCamera = () => {
    hideModal();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image?.path);
    });
  };

  return (
    <Wrapper
      customStyle={{
        padding: 10,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ========= Header View ========= */}
        <View style={styles.headerView}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
            <Image source={require("../assets/icons/back-arrow.png")} style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../assets/icons/bell-icon.png")} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTxt}>Emergency Options</Text>

        {/* ======= Options ========= */}
        <View style={styles.formView}>
          <Text style={styles.headTxt}>Options</Text>
          <View style={styles.form}>
            {/* ========== Type of Emergency ========= */}
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.dropBtn}
              onPress={() => setShowEmergency(!showEmergencyPicker)}
            >
              <Text style={styles.dropTxt}>{emergency}</Text>
              <Image source={require("../assets/icons/drop-icon.png")} style={styles.dropIcon} />
            </TouchableOpacity>
            {showEmergencyPicker && (
              <Animatable.View style={styles.sizePicker} animation="fadeIn">
                {emergencies.map((item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={item.id}
                      style={styles.size}
                      onPress={() => {
                        setEmergency(item.name);
                        setShowEmergency(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </Animatable.View>
            )}

            {/* ========== Select Date ========= */}
            <TouchableOpacity activeOpacity={0.4} style={styles.dateBtn} onPress={showDatePicker}>
              <Image source={require("../assets/icons/calender-icon.png")} style={styles.dateIcon} />
              <Text style={styles.dropTxt}>{date}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDate}
              onCancel={hideDatePicker}
            />

            {/* ======== Time ========== */}
            <TouchableOpacity activeOpacity={0.4} style={styles.dateBtn} onPress={showTimePicker}>
              <Text style={styles.dropTxt}>{time}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTime}
              onCancel={hideTimePicker}
            />

            {/* ========== Photo ========= */}
            <TouchableOpacity activeOpacity={0.4} style={styles.dateBtn} onPress={showModal}>
              <Image source={require("../assets/icons/photo-icon.png")} style={styles.dateIcon} />
              <Text style={styles.dropTxt}>Photo</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.img} />}

            {/* ========= Buttons ======== */}
            <View style={styles.btnView}>
              <TouchableOpacity activeOpacity={0.6} style={styles.createBtn}>
                <Text style={styles.createTxt}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <TouchableOpacity activeOpacity={0.6} style={styles.enter1} onPress={openCamera}>
              <Text style={styles.enterTxt}>Take Photo</Text>
              <Image source={require("../assets/icons/arrow-right.png")} style={styles.enterIcon} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.enter} onPress={openGallery}>
              <Text style={styles.enterTxt}>Chose From Library</Text>
              <Image source={require("../assets/icons/arrow-right.png")} style={styles.enterIcon} />
            </TouchableOpacity>
          </Modal>
        </Portal>
      </ScrollView>
    </Wrapper>
  );
};

export default Emergency;

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
  enter1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12@ms",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  enter: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12@ms",
  },
  enterIcon: {
    width: "12@ms",
    height: "12@ms",
    resizeMode: "contain",
  },
  enterTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
    fontFamily: "Poppins-Regular",
  },
  img: {
    width: "100%",
    height: "300@ms",
    marginTop: "20@vs",
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
