import React, { useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { Text } from "react-native-paper";
import AppbarComponent from "../../components/Shared/Appbar";
import Wrapper from "../../components/Shared/Wrapper";
import styles from "./styles";

const Camera = () => {
  const cameraRef: any = useRef(null);
  const [image, setImage] = useState<any>();

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef?.current?.takePictureAsync(options);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <AppbarComponent search={false} />
        <RNCamera
          ref={cameraRef}
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
          {({ status }) => {
            if (status !== "READY") {
              return <PendingView />;
            }
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
                  onPress={() => takePicture()}
                  style={styles.capture}
                >
                  <Image
                    source={require("../../assets/icons/diaphragm.png")}
                    style={styles.captureIcon}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </ScrollView>
    </Wrapper>
  );
};

export default Camera;
