import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../components/Wrapper";
import * as geolib from "geolib";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Polyline,
} from "react-native-maps";
import RNLocation from "react-native-location";
import { COLORS } from "../constants/theme";
import * as Animatable from "react-native-animatable";
import { createFarm } from "../redux/features/farmSlice";
import { CREATE_FARMS_SCREEN } from "../constants/routeNames";
import backIcon from "../assets/icons/back-arrow.png";
import Geolocation from 'react-native-geolocation-service';

const GeoFence = ({ navigation }) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = 0.005;
  let [mapRegion, setMapRegion] = useState(null);
  const [coordinates, setCoords] = useState([]);
  const [trackEnabled, setEnabled] = useState(false);
  const [distance, setDistance] = useState(0);
  const [area, setArea] = useState(0);
  const [hecres, setHecres] = useState(0);
  const [showActionBox, setShowActionBox] = useState(false);

  let polyPoints = coordinates.map(function (obj) {
    return Object.keys(obj)
      .sort()
      .map(function (key) {
        return obj[key];
      });
  });

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

  useEffect(() => {
    if (trackEnabled) {
      RNLocation.subscribeToLocationUpdates((location) => {
        const coords = location[0];
        setLat(coords.latitude);
        setLng(coords.longitude);
        setCoords((prev) => [
          ...prev,
          { latitude: coords.latitude, longitude: coords.longitude },
        ]);
      });
    } else return null;
  }, [trackEnabled]);

  useEffect(() => {
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        position => {
          setMapRegion({
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        error => {
          console.error('location error ', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    getCurrentPosition();
  }, []);

  const sub = () => {
    setEnabled(true);
  };

  const unsub = () => {
    setEnabled(false);
    // Subscribe
    setDistance(geolib.getPathLength(coordinates, geolib.getDistance));
    setArea(geolib.getAreaOfPolygon(polyPoints));
    setHecres(geolib.convertArea(area, "ha").toFixed(3));
    // Unsubscribe
  };

  const unsubscribe = RNLocation.subscribeToPermissionUpdates(
    (currentPermission) => {
      console.log(currentPermission);
    }
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={mapRegion}
        showsUserLocation
        zoomEnabled
        zoomControlEnabled={true}
        maxZoomLevel={50}
      >
        <Polyline
          coordinates={coordinates}
          strokeColor={COLORS.primary}
          fillColor={COLORS.primary}
          strokeWidth={4}
        />
      </MapView>
      <View style={styles.distanceView}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.goBack()}
        >
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text>Perimeter: {distance}m</Text>
        <Text>Area: {hecres}ha</Text>
      </View>
      {showActionBox && (
        <Animatable.View
          animation='fadeInUp'
          duration={300}
          style={styles.actionBox}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.boxItem}
            onPress={sub}
          >
            <Text>Start Geo Fencing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.boxItem}
            onPress={() => {
              unsub();
              navigation.navigate(CREATE_FARMS_SCREEN, { hecres });
            }}
          >
            <Text>Create Farm</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.iconView}
        onPress={() => setShowActionBox(!showActionBox)}
      >
        {!showActionBox ? (
          <Image
            source={require("../assets/icons/plus-icon.png")}
            style={styles.icon}
          />
        ) : (
          <Image
            source={require("../assets/icons/close-icon.png")}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GeoFence;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  iconView: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: COLORS.background,
    width: 55,
    height: 55,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  actionBox: {
    position: "absolute",
    bottom: 110,
    right: 20,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 6,
  },
  boxItem: {
    padding: 12,
  },
  distanceView: {
    position: "absolute",
    top: 40,
    right: 20,
    left: 20,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 6,
    width: "90%",
    height: 50,
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});
