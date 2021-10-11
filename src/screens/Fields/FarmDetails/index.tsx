import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button, Dialog, Portal, Subheading, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../../components/Shared/Appbar";
import Wrapper from "../../../components/Shared/Wrapper";
import {
  combinedDarkTheme,
  combinedDefaultTheme,
} from "../../../constants/theme";
import { Farm } from "../../../interfaces/farm";
import { DefaultScreenProps } from "../../../interfaces/shared_components";
import { fetchActivityForCrop } from "../../../redux/features/crop/crop_actions";
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
  const [setVisible3] = useState(false);
  const { fetchingDefaultCropActivities } = useSelector(cropSelector);

  return (
    <Wrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <AppbarComponent backButton={true} title={`${farmItem.name} details`} />
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
              Start New Activity
            </Dialog.Title>
            <Dialog.Content>
              <View style={styles.row2}>
                <Subheading style={styles.leftText2}>Crop:</Subheading>
                <Text style={styles.rightText}>
                  {farmItem?.crops ? farmItem?.crops[0]?.crop?.name : "N/A"}
                </Text>
              </View>
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
              <Button
                onPress={async () => {
                  await dispatch(
                    fetchActivityForCrop(farmItem?.crops[0]?.crop?.id)
                  );
                  // setVisible2(false);
                  setVisible3(true);
                }}
                mode="contained"
                uppercase={false}
                loading={fetchingDefaultCropActivities}
                theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              >
                Proceed
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </Wrapper>
  );
};

export default FarmDetails;
