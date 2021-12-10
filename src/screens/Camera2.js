import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../components/Wrapper";
import { COLORS } from "../constants/theme";
import { fetchUsers, userSelector } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RNCamera } from "react-native-camera";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Camera = ({ navigation, initialProps }) => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector(userSelector);
  const camera = useRef(null);
  const [image, setImage] = useState();

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      setImage(data.uri);
    }
  };

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "lightgreen",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Waiting</Text>
    </View>
  );

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== "READY") return <PendingView />;
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.capture}
                >
                  <Image
                    source={require("../assets/icons/diaphragm.png")}
                    style={styles.captureIcon}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
        <View>
          {image && <Image source={{ uri: image }} style={styles.img} />}
          {/* ======== Description ========== */}
          {image && (
            <TextInput
              placeholder='Description...'
              style={styles.inputDesc}
              multiline
              placeholderTextColor={COLORS.text_grey}
            />
          )}

          {image && (
            <TouchableOpacity activeOpacity={0.4} style={styles.btn}>
              <Text style={styles.btnTxt}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default Camera;

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
  tableView: {
    borderRadius: 4,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: "15@vs",
  },
  inputDesc: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    color: COLORS.text_dark,
    paddingHorizontal: "10@ms",
    fontFamily: "Poppins-Regular",
    marginTop: "15@vs",
    backgroundColor: COLORS.surface,
    marginBottom: "20@vs",
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    padding: "12@ms",
  },
  headTxt: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowTxt: {
    flex: 1,
    // borderWidth: 1,
    padding: 5,
    fontSize: 12,
    borderColor: COLORS.border,
  },
  preview: {
    flex: 1,
    height: 600,
  },
  capture: {
    width: "70@ms",
    height: "70@ms",
    backgroundColor: COLORS.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    marginBottom: "20@vs",
  },
  captureIcon: {
    width: "50@ms",
    height: "50@ms",
  },
  img: {
    width: "100%",
    height: "300@ms",
    marginTop: "20@vs",
  },
  btn: {
    width: "100%",
    padding: "13@ms",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: "20@vs",
  },

  btnTxt: {
    fontWeight: "600",
    fontSize: "18@ms",
    fontFamily: "Poppins-Regular",
    color: COLORS.background,
  },
});
