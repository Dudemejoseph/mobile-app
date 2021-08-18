import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../components/Wrapper";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Polyline,
} from "react-native-maps";
import { COLORS } from "../constants/theme";

const Fields = () => {
  const coordinates = [
    { name: "Burger", latitude: 37.8025259, longitude: -122.4351431 },
    { name: "Pizza", latitude: 37.7946386, longitude: -122.421646 },
    { name: "Soup", latitude: 37.7865248, longitude: -122.4165628 },
    { name: "Sushi", latitude: 37.7834153, longitude: -122.4527787 },
    { name: "Curry", latitude: 37.7948105, longitude: -122.4596065 },
  ];
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation
        zoomEnabled
        zoomControlEnabled={true}
        maxZoomLevel={13}
      >
        <Polygon
          coordinates={coordinates}
          fillColor={"rgba(100, 100, 200, 0.3)"}
        />
        {coordinates.map((marker) => {
          return (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
            ></Marker>
          );
        })}
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
