import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../components/Wrapper";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Polyline,
} from "react-native-maps";
import RNLocation from "react-native-location";
import { COLORS } from "../constants/theme";

const Fields = () => {
  const [lat, setLat] = useState(37.78825);
  const [lng, setLng] = useState(-122.4324);
  const [coordinates, setCoords] = useState([]);
  const [trackEnabled, setEnabled] = useState(false);

  console.log(trackEnabled);
  RNLocation.configure({
    distanceFilter: 10, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy",
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
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

  useEffect(() => {
    if (trackEnabled) {
      RNLocation.subscribeToLocationUpdates((location) => {
        const coords = location[0];
        setLat(coords.latitude);
        setLng(coords.longitude);
        setCoords([...coordinates, coords]);
        console.log(coords);
      });
    } else return;
  }, [trackEnabled]);

  const sub = () => {
    setEnabled(true);
  };

  const unsub = () => {
    setEnabled(false);
    console.log(coordinates);
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation
        zoomEnabled
        zoomControlEnabled={true}
        maxZoomLevel={50}
      >
        <Polygon
          coordinates={coordinates}
          fillColor={"rgba(100, 100, 200, 0.3)"}
          strokeColor='#000'
        />
      </MapView>
      {/* <View
        style={{
          position: "absolute",
          top: 100,
          left: 40,
          backgroundColor: COLORS.background,
          height: 50,
          width: 300,
          borderRadius: 8,
        }}
      /> */}
      <TouchableOpacity
        style={{ position: "absolute", bottom: 50, right: 40 }}
        onPress={sub}
      >
        <Text>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 30, right: 40 }}
        onPress={unsub}
      >
        <Text>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Fields;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
