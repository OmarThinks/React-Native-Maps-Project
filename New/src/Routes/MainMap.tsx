import React, {useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import {LatLng} from 'react-native-maps';

type Region = LatLng & {
  latitudeDelta: number;
  longitudeDelta: number;
};

const GOOGLE_MAPS_APIKEY = 'AIzaSyCR2azJfzwS52Om_9MM2Ss6lE6unmg1HAU';

const MainMap = () => {
  const location1: LatLng = {latitude: 37.78825, longitude: -122.4324};
  const location2: LatLng = {latitude: 37.3318456, longitude: -122.0296002};

  const [region, setRegion] = useState<Region>({
    ...location1,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  //console.log('region', region);

  const [circleCenter, setCircleCenter] = useState<LatLng>(location1);

  const [directionFrom, setDirectionFrom] = useState<LatLng>(location1);
  const [directionTo, setDirectionTo] = useState<LatLng>(location2);

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

  return (
    <View
      style={{
        flexGrow: 1,
        flexShrink: 1,
        alignSelf: 'stretch',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1,
          alignSelf: 'stretch',
          width: '100%',
        }}>
        <GooglePlacesInput />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{
          flexGrow: 1,
          flexShrink: 1,
          alignSelf: 'stretch',
        }}
        initialRegion={region}>
        <Circle
          radius={300}
          center={circleCenter}
          fillColor={'rgba(0,255,0,0.2)'}
          strokeColor="'rgba(0,255,0,0.8)'"
          strokeWidth={2.5}
        />
        <Marker
          coordinate={location1}
          draggable={true}
          onDrag={e => {
            console.log('onDragEnd', e.nativeEvent.coordinate);
            setCircleCenter(e.nativeEvent.coordinate);
          }}
          pinColor={'green'}
          onDragStart={e => {
            console.log('onDragStart', e.nativeEvent.coordinate);
            setCircleCenter(e.nativeEvent.coordinate);
          }}
          onDragEnd={e => {
            console.log('onDragEnd', e.nativeEvent.coordinate);
            setCircleCenter(e.nativeEvent.coordinate);
            setDirectionFrom(e.nativeEvent.coordinate);
          }}>
          <Callout>
            <Text>From</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={location2}
          draggable={true}
          onDrag={e => {
            console.log('onDragEnd', e.nativeEvent.coordinate);
            // setLocationTo(e.nativeEvent.coordinate);
          }}
          pinColor={'red'}
          onDragStart={e => {
            console.log('onDragStart', e.nativeEvent.coordinate);
            // setLocationTo(e.nativeEvent.coordinate);
          }}
          onDragEnd={e => {
            console.log('onDragEnd', e.nativeEvent.coordinate);
            // setLocationTo(e.nativeEvent.coordinate);
            setDirectionTo(e.nativeEvent.coordinate);
          }}>
          <Callout>
            <Text>To</Text>
          </Callout>
        </Marker>
        {directionView}
      </MapView>
    </View>
  );
};

export default MainMap;

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
    />
  );
};
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
