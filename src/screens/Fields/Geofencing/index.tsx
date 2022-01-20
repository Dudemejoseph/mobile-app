import { useTheme } from "@react-navigation/native";
import * as geolib from "geolib";
import React, { useEffect, useRef, useState } from "react";
import { PermissionsAndroid, Platform, ScrollView } from "react-native";
import Geolocation from "react-native-geolocation-service";
import RNLocation from "react-native-location";
import MapView, { Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { FAB, Surface, Text } from "react-native-paper";
import AppbarComponent from "../../../components/Shared/Appbar";
import Wrapper from "../../../components/Shared/Wrapper";
import { CREATE_FARMS_SCREEN } from "../../../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { DefaultScreenProps } from "../../../interfaces/shared_components";
import { darkModeMapStyles } from "../../../seeder/mapStyles";
import styles from "./styles";

const Geofencing: React.FC<DefaultScreenProps> = ({ navigation }) => {
  const [state, setState] = useState({ open: false });
  const LATITUDE_DELTA = 0.005 as any;
  const LONGITUDE_DELTA = 0.005;
  let [mapRegion, setMapRegion] = useState<Region | any>(null);
  const [coordinates, setCoords] = useState<[] | any>([]);
  const [trackEnabled, setEnabled] = useState<boolean>(false);
  const [distance, setDistance] = useState(0);
  const [area, setArea] = useState(0);
  const [hecres, setHecres] = useState<number>(0);
  const { dark } = useTheme();
  const mapRef: any = useRef(null);

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

  let polyPoints = coordinates.map(function (obj: any) {
    return Object.keys(obj)
      .sort()
      .map(function (key) {
        return obj[key];
      });
  });

  // Asking user for permission to access location
  useEffect(() => {
    const checkPermission = () => {
      if (Platform.OS === "ios") {
        getCurrentPosition();
      } else if (Platform.OS === "android") {
        checkAndroidPermission();
      }
    };

    const checkAndroidPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: "Farm monitor Permission",
          message: "We need permission to access your location",
          buttonNeutral: "Later",
          buttonNegative: "No",
          buttonPositive: "OK",
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentPosition();
        } else {
          checkAndroidPermission();
        }
      } catch (err) {}
    };

    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          setMapRegion({
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          console.error("location error ", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    checkPermission();
  }, []);

  useEffect(() => {
    if (trackEnabled) {
      RNLocation.subscribeToLocationUpdates((location) => {
        const coords = location[0];
        setCoords((prev: any) => [...prev, { latitude: coords.latitude, longitude: coords.longitude }]);
      });
    }
  }, [trackEnabled]);

  useEffect(() => {
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        (position: any) => {
          setMapRegion({
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error: any) => {
          console.error("location error ", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
    getCurrentPosition();
  }, []);

  RNLocation.configure({
    distanceFilter: 10, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy",
    },
    // Android only
    androidProvider: "auto",
    // interval: 5000, // Milliseconds
    // fastestInterval: 5000, // Milliseconds
    // maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
  });

  RNLocation.requestPermission({
    ios: "whenInUse", // or 'always'
    android: {
      detail: "coarse", // or 'fine'
      rationale: {
        title: "We need to access your location",
        message: "We use your location to show where you are on the map",
        buttonPositive: "OK",
        buttonNegative: "Cancel",
      },
    },
  });

  const sub = () => {
    setEnabled(true);
  };

  const unsub = () => {
    setEnabled(false);
    setDistance(geolib.getPathLength(coordinates, geolib.getDistance));
    setArea(geolib.getAreaOfPolygon(polyPoints));
    setHecres(geolib.convertArea(area, "ha").toFixed(3) as any);
  };

  return (
    <Wrapper>
      <AppbarComponent backButton={true} search={false} title="Geofencing" />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={mapRegion}
          zoomEnabled
          zoomControlEnabled={true}
          maxZoomLevel={50}
          customMapStyle={dark ? darkModeMapStyles : []}
          showsBuildings={true}
          showsMyLocationButton={true}
          showsUserLocation={true}
          showsCompass={true}
          followsUserLocation={true}
        >
          <Polyline
            coordinates={coordinates}
            strokeColor={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.primary}
            fillColor={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.primary}
            strokeWidth={4}
          />
        </MapView>
        <Surface style={styles.distanceView}>
          <Text>Perimeter: {distance}m</Text>
          <Text>Area: {hecres}ha</Text>
        </Surface>
        <FAB.Group
          theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          open={open}
          icon={open ? "cancel" : "plus"}
          visible={true}
          actions={[
            {
              icon: "google-maps",
              label: trackEnabled ? "Stop Geofencing" : "Start Geofencing",
              onPress: () => {
                if (trackEnabled) {
                  unsub();
                } else {
                  sub();
                }
              },
            },
            {
              icon: "island",
              label: "Create Farm",
              onPress: () => {
                unsub();
                navigation.navigate(CREATE_FARMS_SCREEN, {
                  hecres,
                  coordinates,
                  distance,
                });
              },
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </ScrollView>
    </Wrapper>
  );
};

export default Geofencing;
