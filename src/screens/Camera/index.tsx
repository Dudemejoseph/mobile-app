import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, useColorScheme, View, ScrollView, CameraRoll } from "react-native";
import { RNCamera } from "react-native-camera";
import ImagePicker from "react-native-image-crop-picker";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../components/Shared/Appbar";
import CustomModal from "../../components/Shared/CustomModal";
import SuccessSnackbar from "../../components/Shared/Snackbar/SuccessSnackbar";
import Wrapper from "../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { CropRating, HeightUnit } from "../../interfaces/crop";
import { Farm, FarmState } from "../../interfaces/farm";
import { getFarms } from "../../redux/features/farms/farm_actions";
import { farmSelector } from "../../redux/features/farms/farm_reducer";
import { heightUnits, ratings } from "../../seeder/cropHealth";
import { cloudinaryUpload, uploadChi } from "../../utils/cloudinary";
import styles from "./styles";
import { getAlbums, save } from "@react-native-community/cameraroll";
MaterialCommunityIcons.loadFont();

const Camera = () => {
  const dispatch = useDispatch();
  const cameraRef: any = useRef(null);
  const { dark } = useTheme();
  const scheme = useColorScheme();
  const { farmData } = useSelector(farmSelector) as FarmState;
  const [image, setImage] = useState<any>(null);
  const [imageUri, setImageUri] = useState<any>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | any>(null);
  const [selectedRating, setSelectedRating] = useState<CropRating | any>(null);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState<boolean>(false);
  const [farmId, setFarmId] = useState<number | any>(null);
  const [color, setColor] = useState<string>("");
  const [height, setHeight] = useState<number | string | any>(0);
  const [heightUnit, setHeightUnit] = useState<HeightUnit>(null);
  const [shape, setShape] = useState<string>("");
  const [texture, setTexture] = useState<string>("");

  const takePicture = async () => {
    try {
      if (cameraRef) {
        const options = {
          quality: 0.5,
          fixOrientation: true,
          forceUpOrientation: true,
          base64: true,
        };
        const data = await cameraRef?.current?.takePictureAsync(options);
        console.log("data ", data);
        setImageUri(data.uri);
        setImage(data);
        await save(data.uri, { type: "photo", album: "Farm monitor" });
      }
    } catch (error) {
      console.error("error while camera is ", error);
    }
  };

  useEffect(() => {
    const fetchFarms = async () => {
      dispatch(getFarms());
    };
    if (!farmData) {
      fetchFarms();
    }
  }, [dispatch, farmData]);

  const selectPictureFromGallery = async () => {
    const res = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    });
    setImageUri(res.path);
    setImage(res);
  };

  const handleImageUpload = async () => {
    try {
      setIsUploading(true);
      const uri = image.uri ?? image.path;
      const base64 = image.base64 ?? image.data;
      const type = uri.substr(uri.length - 3);
      const name = uri.substring(uri.indexOf("Camera/") + 7);
      const source = { uri, type, name, base64 };
      const res = await cloudinaryUpload(source);
      console.log("res is now ", res);
      if (res) {
        console.log("response from secure url  ", res);
        const body = {
          rating: selectedRating.value as number,
          farm_id: farmId,
          image_url: res,
          height,
          height_unit: "Inches",
          texture,
          color,
          shape,
        };
        await uploadChi(body);
        setImage(null);
        setShowSuccessSnackbar(true);
      }
      setIsUploading(false);
    } catch (error: any) {
      setIsUploading(false);
      console.error("error ", error.message);
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
      <Text>Initialising</Text>
    </View>
  );

  return (
    <Wrapper>
      <AppbarComponent backButton={true} title="Camera" search={false} />
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
          if (image) {
            return (
              <CustomModal visible={true} onDismiss={() => setImage(null)}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Surface
                    style={[
                      styles.pickerView,
                      {
                        borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.backdrop,
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  >
                    <Picker
                      mode="dropdown"
                      selectedValue={selectedFarm}
                      onValueChange={(itemValue: Farm) => {
                        setSelectedFarm(itemValue);
                        setFarmId(itemValue.id);
                      }}
                      itemStyle={[
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      <Picker.Item
                        color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                        label="Select Farm"
                        value={null}
                        style={styles.buttonLabel}
                      />
                      {farmData?.map((item: Farm, index: number) => {
                        return (
                          <Picker.Item
                            key={index}
                            color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                            label={item.name}
                            value={item}
                            style={styles.buttonLabel}
                          />
                        );
                      })}
                    </Picker>
                  </Surface>

                  <Surface
                    style={[
                      styles.pickerView,
                      {
                        borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.backdrop,
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  >
                    <Picker
                      mode="dropdown"
                      selectedValue={selectedRating}
                      onValueChange={(itemValue: CropRating) => {
                        setSelectedRating(itemValue);
                      }}
                      itemStyle={[
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      <Picker.Item
                        color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                        label="Select Rating"
                        value={null}
                        style={styles.buttonLabel}
                      />
                      {ratings?.map((item: CropRating, index: number) => {
                        return (
                          <Picker.Item
                            key={index}
                            color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                            label={item.label}
                            value={item}
                            style={styles.buttonLabel}
                          />
                        );
                      })}
                    </Picker>
                  </Surface>

                  <View style={styles.inputView}>
                    <TextInput
                      label="Color"
                      value={color}
                      onChangeText={(value) => setColor(value)}
                      mode="outlined"
                      // onBlur={handleBlur("unit_price")}
                      // error={errors?.unit_price ? true : false}
                      // selectionColor={colors.text}
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                      style={[
                        styles.buttonLabel,
                        {
                          backgroundColor: dark
                            ? combinedDarkTheme.colors.background
                            : combinedDefaultTheme.colors.surface,
                        },
                      ]}
                    />

                    {/* {errors?.unit_price && (
                    <HelperText type="error" visible={errors?.unit_price ? true : false}>
                      {errors?.unit_price}
                    </HelperText>
                  )} */}
                  </View>

                  <View style={styles.inputView}>
                    <TextInput
                      label="Height"
                      value={height}
                      onChangeText={(value) => setHeight(value)}
                      mode="outlined"
                      keyboardType="number-pad"
                      // onBlur={handleBlur("unit_price")}
                      // error={errors?.unit_price ? true : false}
                      // selectionColor={colors.text}
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                      style={[
                        styles.buttonLabel,
                        {
                          backgroundColor: dark
                            ? combinedDarkTheme.colors.background
                            : combinedDefaultTheme.colors.surface,
                        },
                      ]}
                    />

                    {/* {errors?.unit_price && (
                    <HelperText type="error" visible={errors?.unit_price ? true : false}>
                      {errors?.unit_price}
                    </HelperText>
                  )} */}
                  </View>

                  <Surface
                    style={[
                      styles.pickerView,
                      {
                        borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.backdrop,
                        backgroundColor: dark
                          ? combinedDarkTheme.colors.background
                          : combinedDefaultTheme.colors.surface,
                      },
                    ]}
                  >
                    <Picker
                      mode="dropdown"
                      selectedValue={heightUnit}
                      onValueChange={(itemValue: HeightUnit) => {
                        setHeightUnit(itemValue);
                      }}
                      itemStyle={[
                        {
                          borderColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text,
                        },
                      ]}
                    >
                      <Picker.Item
                        color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                        label="Select unit for height"
                        value={null}
                        style={styles.buttonLabel}
                      />
                      {heightUnits?.map((item: HeightUnit, index: number) => {
                        return (
                          <Picker.Item
                            key={index}
                            color={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.text}
                            label={item.label}
                            value={item}
                            style={styles.buttonLabel}
                          />
                        );
                      })}
                    </Picker>
                  </Surface>

                  <View style={styles.inputView}>
                    <TextInput
                      label="Shape"
                      value={shape}
                      onChangeText={(value) => setShape(value)}
                      mode="outlined"
                      // onBlur={handleBlur("unit_price")}
                      // error={errors?.unit_price ? true : false}
                      // selectionColor={colors.text}
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                      style={[
                        styles.buttonLabel,
                        {
                          backgroundColor: dark
                            ? combinedDarkTheme.colors.background
                            : combinedDefaultTheme.colors.surface,
                        },
                      ]}
                    />

                    {/* {errors?.unit_price && (
                    <HelperText type="error" visible={errors?.unit_price ? true : false}>
                      {errors?.unit_price}
                    </HelperText>
                  )} */}
                  </View>

                  <View style={styles.inputView}>
                    <TextInput
                      label="Texture"
                      value={texture}
                      onChangeText={(value) => setTexture(value)}
                      mode="outlined"
                      // onBlur={handleBlur("unit_price")}
                      // error={errors?.unit_price ? true : false}
                      // selectionColor={colors.text}
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      outlineColor={dark ? combinedDarkTheme.colors.border : combinedDefaultTheme.colors.backdrop}
                      style={[
                        styles.buttonLabel,
                        {
                          backgroundColor: dark
                            ? combinedDarkTheme.colors.background
                            : combinedDefaultTheme.colors.surface,
                        },
                      ]}
                    />

                    {/* {errors?.unit_price && (
                    <HelperText type="error" visible={errors?.unit_price ? true : false}>
                      {errors?.unit_price}
                    </HelperText>
                  )} */}
                  </View>

                  <Image style={{ height: 300 }} source={{ uri: imageUri }} />
                  <View style={styles.actionRow}>
                    <Button
                      onPress={() => setImage(null)}
                      uppercase={false}
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      labelStyle={[
                        styles.buttonLabelStyle,
                        {
                          color:
                            scheme === "dark" ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.primary,
                        },
                      ]}
                    >
                      Cancel
                    </Button>
                    <Button
                      uppercase={false}
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                      onPress={handleImageUpload}
                      mode={scheme === "dark" ? "contained" : "contained"}
                      loading={isUploading}
                      disabled={!farmId}
                      contentStyle={{ backgroundColor: !farmId ? "gray" : combinedDefaultTheme.colors.primary }}
                      labelStyle={[
                        styles.buttonLabelStyle,
                        {
                          color:
                            scheme === "dark"
                              ? combinedDarkTheme.colors.primary
                              : combinedDefaultTheme.colors.background,
                        },
                      ]}
                    >
                      Upload
                    </Button>
                  </View>
                </ScrollView>
              </CustomModal>
            );
          }
          return (
            <View style={styles.wrapper}>
              <TouchableOpacity onPress={selectPictureFromGallery} style={styles.galleryIconContainr}>
                <MaterialCommunityIcons name="folder-image" size={32} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
                <Image source={require("../../assets/icons/diaphragm.png")} style={styles.captureIcon} />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
      <SuccessSnackbar
        message="Image uploaded successfully"
        visible={showSuccessSnackbar}
        setVisible={setShowSuccessSnackbar}
      />
    </Wrapper>
  );
};

export default Camera;
