import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../../components/Wrapper";
import { ACTIVITIES_SCREEN, CALENDAR_SCREEN } from "../../constants/routeNames";
import { COLORS } from "../../constants/theme";
import Toast from "react-native-toast-message";
import { Modal, Portal, Dialog, Paragraph, Button } from "react-native-paper";
import {
  fetchFarms,
  fetchCrops,
  farmSelector,
  fetchActivityForCrop,
  submitCropActivities,
} from "../../redux/features/farmSlice";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";

const FarmDetails = ({ navigation, route }) => {
  const { item: farm } = route.params;
  let dispatch = useDispatch();
  let { width } = useWindowDimensions();

  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("Select Crop");
  const [selectedFarm, setSelectedFarm] = useState("Select Farm");
  const [showCropPicker, setShowCrop] = useState(false);
  const [showFarmPicker, setShowFarm] = useState(false);
  const [crop_id, setCropID] = useState("");
  const [farm_id, setFarmID] = useState(farm.id);
  const {
    crops,
    loading: farmLoading,
    message,
    error,
    farms,
    farmActivities,
    cropActivity,
  } = useSelector(farmSelector);

  useEffect(() => {
    message &&
      Toast.show({
        type: "success",
        text1: "Success",
        text2: message ?? farmMessage,
        topOffset: 40,
      });
  }, [message]);

  useEffect(() => {
    error &&
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error ?? farmError,
        topOffset: 40,
      });
  }, [error]);

  // useEffect(() => {
  //   dispatch(getDashboard());
  //   dispatch(fetchFarms());
  //   dispatch(fetchCrops());
  // }, [dispatch]);

  const submitDefaultCropActivities = async() => {
    let data = [];
    cropActivity.forEach((element) => {
      data.push({
        activity: element.activity_name,
        farm_id,
        crop_id,
        start_date: element.start_date,
        end_date: element.end_date,
      });
    });
    console.log("data ", data);
    await dispatch(submitCropActivities(data[1]));
    setVisible4(false);
    navigation.navigate(CALENDAR_SCREEN);
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

        <Text style={styles.headerTxt}>Farm Details</Text>
        <View style={styles.detailsView}>
          <View style={styles.item}>
            <Text style={styles.title}>Farm Name:</Text>
            <Text style={styles.name}>{farm.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Location:</Text>
            <Text style={styles.name}>{farm.location}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Size:</Text>
            <Text style={styles.name}>
              {farm.size} {farm.size_unit}
            </Text>
          </View>
        </View>
        <View style={styles.ctaView}>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.6}>
            <Text style={styles.editTxt}>Edit Farm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.activityBtn}
            activeOpacity={0.6}
            onPress={() => setVisible2(true)}
          >
            <Text style={styles.activityTxt}>Start Activity</Text>
          </TouchableOpacity>
        </View>
        <Portal>
          <Dialog
            visible={visible2}
            onDismiss={() => {
              setVisible2(false);
            }}
          >
            <Dialog.Title selectionColor="green">
              What would you like to do?
            </Dialog.Title>
            <Dialog.Content style={{ alignItems: "flex-start" }}>
              <Button
                icon="chevron-right"
                mode="text"
                contentStyle={{ flexDirection: "row-reverse" }}
                color="green"
                onPress={() => {
                  setVisible2(false);
                  setVisible3(true);
                }}
              >
                Start a new activity
              </Button>
              <Button
                icon="chevron-right"
                contentStyle={{ flexDirection: "row-reverse" }}
                color="green"
              >
                Add a random farm activity
              </Button>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setVisible2(false);
                }}
                mode="outlined"
                color="green"
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={visible3}
            onDismiss={() => {
              setVisible3(false);
            }}
          >
            <Dialog.Title>Start New Activity</Dialog.Title>
            <Dialog.Content style={{ alignItems: "flex-start" }}>
              {/* ========== Choose Crop ========= */}
              <TouchableOpacity
                activeOpacity={0.4}
                style={styles.dropBtn}
                onPress={() => setShowCrop(!showCropPicker)}
              >
                <Text style={styles.dropTxt}>{selectedCrop}</Text>
                <Image
                  source={require("../../assets/icons/drop-icon.png")}
                  style={styles.dropIcon}
                />
              </TouchableOpacity>
              {showCropPicker && (
                <ScrollView style={styles.sizePicker}>
                  <Animatable.View style={styles.sizePicker} animation="fadeIn">
                    {farm?.crops &&
                      farm?.crops.map((item) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.6}
                            key={item.id}
                            style={styles.size}
                            onPress={() => {
                              setSelectedCrop(item.crop.name);
                              setCropID(item.crop.id);
                              setShowCrop(false);
                            }}
                          >
                            <Text>{item.crop.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                  </Animatable.View>
                </ScrollView>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={async () => {
                  setVisible3(false);
                  setVisible2(true);
                }}
                mode="text"
                color="green"
              >
                Cancel
              </Button>
              <Button
                onPress={async () => {
                  await dispatch(fetchActivityForCrop(crop_id));
                  setVisible3(false);
                  setVisible4(true);
                }}
                mode="contained"
                color="green"
                icon={farmLoading ? "loading" : null}
              >
                Proceed
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={visible4}
            onDismiss={() => {
              setVisible4(false);
            }}
          >
            <Dialog.Title>New Activity</Dialog.Title>
            <Dialog.Content style={{ alignItems: "flex-start" }}>
              {cropActivity &&
                cropActivity.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Paragraph style={{ color: "grey" }}>
                        {item.activity_name}
                      </Paragraph>
                      <Paragraph style={{}}>{item.start_date}</Paragraph>
                      <Paragraph style={{}}>{item.end_date}</Paragraph>
                    </View>
                  );
                })}
              {cropActivity && cropActivity.length < 1 && (
                <Paragraph>No Default activities for {selectedCrop}</Paragraph>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setVisible4(false);
                  setVisible3(true);
                }}
                mode="text"
                color="green"
              >
                Cancel
              </Button>
              <Button
                onPress={() => {}}
                mode="outlined"
                color="green"
                style={{ marginHorizontal: 3 }}
              >
                Create Custom
              </Button>

              {farmLoading ? (
                <ActivityIndicator color={COLORS.background} size="small" />
              ) : (
                <Button
                  disabled={!cropActivity &&  (cropActivity &&cropActivity.length < 1)}
                  onPress={() => {
                    // console.log(cropActivity);
                    submitDefaultCropActivities();
                    // setVisible4(false);
                  }}
                  mode="contained"
                  color="green"
                >
                  Agree
                </Button>
              )}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </Wrapper>
  );
};

export default FarmDetails;

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
    fontSize: "16@ms",
    fontWeight: "500",
    marginTop: "40@vs",
    fontFamily: "Poppins-Regular",
  },
  detailsView: {
    marginTop: "20@vs",
  },
  item: {
    marginBottom: "20@vs",
  },
  title: {
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
    fontSize: "14@ms",
  },
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: "12@ms",
    fontWeight: "400",
  },
  ctaView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20@vs",
  },
  editBtn: {
    backgroundColor: COLORS.primary,
    width: "50%",
    height: "35@vs",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  activityBtn: {
    width: "50%",
    height: "35@vs",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  editTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
    color: COLORS.background,
  },
  activityTxt: {
    fontWeight: "500",
    fontSize: "14@ms",
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
  size: {
    padding: "6@ms",
  },
  createTxt: {
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
    color: COLORS.background,
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
  dropTxt: {
    color: COLORS.text_grey,
    fontFamily: "Poppins-Regular",
  },
});
