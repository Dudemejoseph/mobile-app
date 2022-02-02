import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  ProgressBar,
  Subheading,
  Text,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../../components/Shared/Appbar";
import ErrorSnackbar from "../../../components/Shared/Snackbar/ErrorSnackbar";
import InfoSnackbar from "../../../components/Shared/Snackbar/InfoSnackbar";
import Wrapper from "../../../components/Shared/Wrapper";
import {
  CALENDAR_TAB,
  DASHBOARD_TAB_SCREEN,
} from "../../../constants/route_names";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { Farm } from "../../../interfaces/farm";
import { DefaultScreenProps } from "../../../interfaces/shared_components";
import {
  fetchActivityForCrop,
  submitCropActivities,
} from "../../../redux/features/crop/crop_actions";
import { cropSelector } from "../../../redux/features/crop/crop_reducer";
import { darkModeMapStyles } from "../../../seeder/mapStyles";
import styles from "./styles";

const FarmDetails: React.FC<DefaultScreenProps> = ({ route }) => {
  const item: any = route?.params;
  const farmItem: Farm | any = item?.item;
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const {
    fetchingDefaultCropActivities,
    cropActivity,
    submitDefaultCropActivitiesError,
    submitDefaultCropActivitiesMessage,
    submitingDefaultCropActivities,
  } = useSelector(cropSelector);
  const [errorSnackbarVisible, setErrorSnackbarVisible] =
    useState<boolean>(false);
  const [infoSnackbarVisible, setInfoSnackbarVisible] =
    useState<boolean>(false);

  const getDefaultCropActivities = (id: number) => {
    dispatch(fetchActivityForCrop(id));
  };

  const submitDefaultCropActivities = () => {
    let data: any = [];
    cropActivity.forEach((element: any) => {
      data.push({
        crop_activity_id: element.crop_activity_id,
        farm_id: farmItem.id,
        crop_id: farmItem?.crops[0]?.crop?.id,
        start_date: element.start_date,
        end_date: element.end_date,
        note: "",
      });
    });
    dispatch(submitCropActivities(data));
  };

  useEffect(() => {
    if (submitDefaultCropActivitiesError) {
      setErrorSnackbarVisible(true);
    }

    const setSuccessSnackbar = async () => {
      await setInfoSnackbarVisible(true);
      setVisible2(false);
      setVisible(false);
    };
    if (submitDefaultCropActivitiesMessage) {
      setSuccessSnackbar();
    }
  }, [submitDefaultCropActivitiesError, submitDefaultCropActivitiesMessage]);

  return (
    <Wrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <AppbarComponent
          backButton={true}
          title={`${farmItem.name} details`}
          search={false}
        />
        <View>
          <View style={styles.row}>
            <Subheading style={styles.leftText}>Farm Name:</Subheading>
            <Text style={styles.rightText}>{farmItem.name}</Text>
          </View>
          <View style={styles.row}>
            <Subheading style={styles.leftText}>Location:</Subheading>
            <Text style={styles.rightText}>{farmItem.location}</Text>
          </View>
          <View style={styles.row}>
            <Subheading style={styles.leftText}>Size:</Subheading>
            <Text style={styles.rightText}>
              {farmItem.size} {farmItem.size_unit}
            </Text>
          </View>
          <View style={styles.row}>
            <Subheading style={styles.leftText}>Crop assigned:</Subheading>
            <Text style={styles.rightText}>
              {farmItem?.crops ? farmItem?.crops[0]?.crop?.name : "N/A"}
            </Text>
          </View>
          <View style={styles.mapView}>
            <MapView
              style={styles.map}
              customMapStyle={dark ? darkModeMapStyles : []}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
              zoomEnabled
              zoomControlEnabled={true}
              maxZoomLevel={50}
            />
          </View>
          <View style={styles.row}>
            <Button
              uppercase={false}
              mode="text"
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
            >
              Edit Farm
            </Button>
            <Button
              uppercase={false}
              mode="contained"
              labelStyle={{
                color: dark
                  ? combinedDarkTheme.colors.text
                  : combinedDefaultTheme.colors.background,
              }}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              onPress={() => setVisible(true)}
            >
              Start Activity
            </Button>
          </View>
        </View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {
              setVisible(false);
            }}
          >
            <Dialog.Title
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
            >
              What would you like to do?
            </Dialog.Title>
            <Dialog.Content style={styles.dialogContent}>
              <Button
                uppercase={false}
                theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                icon="chevron-right"
                mode="text"
                contentStyle={styles.dialogButton}
                onPress={() => {
                  getDefaultCropActivities(farmItem?.crops[0]?.crop?.id);
                  setVisible2(true);
                }}
              >
                Start a new activity
              </Button>
              <Button
                uppercase={false}
                icon="chevron-right"
                contentStyle={styles.dialogButton}
                theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              >
                Add a random farm activity
              </Button>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                uppercase={false}
                onPress={() => {
                  setVisible(false);
                }}
                mode="outlined"
                theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={visible2}
            onDismiss={() => {
              setVisible2(false);
            }}
          >
            <Dialog.Title
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
            >
              Default Activities for {farmItem?.crops[0]?.crop?.name}
            </Dialog.Title>
            <Dialog.Content>
              {fetchingDefaultCropActivities && (
                <ProgressBar
                  indeterminate={true}
                  color={
                    dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.primary
                  }
                />
              )}
              {cropActivity?.length < 1 && !fetchingDefaultCropActivities && (
                <Paragraph>
                  No Default activities for {farmItem?.crops[0]?.crop?.name}
                </Paragraph>
              )}

              {cropActivity?.length > 0 &&
                !fetchingDefaultCropActivities &&
                cropActivity.map((item: any, index: number) => {
                  return (
                    <View key={index} style={styles.row3}>
                      <Paragraph style={{ color: "grey", width: "50%" }}>
                        {item.activity_type}
                      </Paragraph>
                      <Paragraph style={{ marginRight: 20 }}>
                        {item.start_date}
                      </Paragraph>
                      <Paragraph style={{}}>{item.end_date}</Paragraph>
                    </View>
                  );
                })}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={async () => {
                  setVisible2(false);
                  setVisible(true);
                }}
                mode="text"
                uppercase={false}
                theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              >
                Cancel
              </Button>
              {cropActivity?.length > 0 && (
                <Button
                  onPress={async () => {
                    submitDefaultCropActivities();
                    // navigation.navigate(DASHBOARD_TAB_SCREEN, {
                    //   screen: CALENDAR_TAB,
                    // });
                    // setVisible2(false);
                  }}
                  labelStyle={{
                    color: dark
                      ? combinedDarkTheme.colors.text
                      : combinedDefaultTheme.colors.background,
                  }}
                  mode="contained"
                  uppercase={false}
                  loading={submitingDefaultCropActivities}
                  theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                >
                  Proceed
                </Button>
              )}
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {submitDefaultCropActivitiesError &&
          ErrorSnackbar(
            errorSnackbarVisible,
            setErrorSnackbarVisible,
            submitDefaultCropActivitiesError,
            () => submitDefaultCropActivities()
          )}
        {submitDefaultCropActivitiesMessage &&
          InfoSnackbar(
            infoSnackbarVisible,
            setInfoSnackbarVisible,
            submitDefaultCropActivitiesMessage
          )}
      </ScrollView>
    </Wrapper>
  );
};

export default FarmDetails;
