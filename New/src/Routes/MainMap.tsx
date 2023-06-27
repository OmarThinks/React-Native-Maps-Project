import React, {useMemo, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';

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

type Location = {
  latitude: number;
  longitude: number;
};

type Direction = {
  origin: Location;
  destination: Location;
  apikey: string;
  strokeWidth: number;
  strokeColor: string;
};

type Region = Location & {
  latitudeDelta: number;
  longitudeDelta: number;
};

const MainMap = () => {
  const location1: Location = {latitude: 37.78825, longitude: -122.4324};
  const location2: Location = {latitude: 37.3318456, longitude: -122.0296002};

  const [region, setRegion] = useState<Region>({
    ...location1,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  //console.log('region', region);

  const [loactionFrom, setLocationFrom] = useState<Location>(location1);
  const [directionFrom, setDirectionFrom] = useState<Location>(location1);
  const [loactionTo, setLocationTo] = useState<Location>(location2);
  const [directionTo, setDirectionTo] = useState<Location>(location2);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyCR2azJfzwS52Om_9MM2Ss6lE6unmg1HAU';

  const directionView = useMemo(() => {
    return (
      <MapViewDirections
        origin={directionFrom}
        destination={directionTo}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={10}
        strokeColor="blue"
      />
    );
  }, [directionFrom, directionTo]);

  const onRegionChange = (regionNew: Region) => {
    setRegion(regionNew);
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={region}
      onRegionChangeComplete={onRegionChange}>
      <Circle radius={300} center={loactionFrom} />
      <Marker
        coordinate={loactionFrom}
        draggable={true}
        onDrag={e => {
          console.log('onDragEnd', e.nativeEvent.coordinate);
          setLocationFrom(e.nativeEvent.coordinate);
        }}
        pinColor={'green'}
        onDragStart={e => {
          console.log('onDragStart', e.nativeEvent.coordinate);
          setLocationFrom(e.nativeEvent.coordinate);
        }}
        onDragEnd={e => {
          console.log('onDragEnd', e.nativeEvent.coordinate);
          setLocationFrom(e.nativeEvent.coordinate);
          setDirectionFrom(e.nativeEvent.coordinate);
        }}>
        <Callout>
          <Text>From</Text>
        </Callout>
      </Marker>

      <Marker
        coordinate={loactionTo}
        draggable={true}
        onDrag={e => {
          console.log('onDragEnd', e.nativeEvent.coordinate);
          setLocationTo(e.nativeEvent.coordinate);
        }}
        pinColor={'red'}
        onDragStart={e => {
          console.log('onDragStart', e.nativeEvent.coordinate);
          setLocationTo(e.nativeEvent.coordinate);
        }}
        onDragEnd={e => {
          console.log('onDragEnd', e.nativeEvent.coordinate);
          setLocationTo(e.nativeEvent.coordinate);
          setDirectionTo(e.nativeEvent.coordinate);
        }}>
        <Callout>
          <Text>To</Text>
        </Callout>
      </Marker>
      {directionView}
    </MapView>
  );
};

export default MainMap;

/*


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
