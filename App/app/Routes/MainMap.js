import React, {useState, Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Overlay,
  UrlTile,
  Callout,
  Circle,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
  );
};

const MainMap = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  //console.log('region', region);

  const [markerLocation, setMarkerLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = markerLocation;
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCR2azJfzwS52Om_9MM2Ss6lE6unmg1HAU';

  const onRegionChange = regionNew => {
    setRegion(regionNew);
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={region}
      onRegionChangeComplete={onRegionChange}>
      <Circle radius={300} center={markerLocation} />
      <Marker
        coordinate={markerLocation}
        draggable={true}
        onDragEnd={e => {
          console.log('onDragEnd', e.nativeEvent.coordinate);
          setMarkerLocation(e.nativeEvent.coordinate);
        }}
        onDrag={e => {
          console.log('onDragEnd', e.nativeEvent.coordinate);
          setMarkerLocation(e.nativeEvent.coordinate);
        }}
        pinColor={'red'}
        onDragStart={e => {
          console.log('onDragStart', e.nativeEvent.coordinate);
          setMarkerLocation(e.nativeEvent.coordinate);
        }}>
        <Callout>
          <Text>Hey</Text>
        </Callout>
      </Marker>
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={10}
        strokeColor="hotpink"
      />
    </MapView>
  );
};

export default MainMap;

/*
    <View style={styles.container2}>
      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
      />
    </View>
*/
