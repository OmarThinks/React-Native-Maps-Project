import React, {useMemo, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
  Callout,
  Circle,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections, {
  MapDirectionsResponse,
} from 'react-native-maps-directions';

const styles = StyleSheet.create({
  detailHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 3,
  },
});

const GOOGLE_MAPS_APIKEY = 'AIzaSyCR2azJfzwS52Om_9MM2Ss6lE6unmg1HAU';

const MainMap = () => {
  const location1: LatLng = {latitude: 37.78825, longitude: -122.4324};
  const location2: LatLng = {latitude: 37.3318456, longitude: -122.0296002};

  const region = {
    ...location1,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const [circleCenter, setCircleCenter] = useState<LatLng>(location1);

  const [directionFrom, setDirectionFrom] = useState<LatLng>(location1);
  const [directionTo, setDirectionTo] = useState<LatLng>(location2);

  const [duration, setDuration] = useState<string>('');
  const [distance, setDistance] = useState<string>('');

  const directionView = useMemo(() => {
    return (
      <MapViewDirections
        origin={directionFrom}
        destination={directionTo}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={10}
        strokeColor="blue"
        onReady={(directionsObject: MapDirectionsResponse) => {
          // console.log(directionsObject);
          console.log('distance', directionsObject.distance);
          console.log('duration', directionsObject.duration);
          console.log('coordinates', directionsObject.coordinates);
          console.log('fares', directionsObject.fares);
          console.log('waypointOrder', directionsObject.waypointOrder);
          console.log('legs', directionsObject.legs);

          setDuration(String(directionsObject.duration));
          setDistance(String(directionsObject.distance));
        }}
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
        <GooglePlacesInput setTime={setDuration} setDistance={setDistance} />
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

      <View
        style={{
          //flexGrow: 1,
          flexShrink: 1,
          alignSelf: 'stretch',
          backgroundColor: 'white',
          //justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Text style={[styles.detailHeader]}>Distance</Text>
          <Text style={[styles.detailHeader]}>{distance}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={[styles.detailHeader]}>Duration</Text>
          <Text style={[styles.detailHeader]}>{duration}</Text>
        </View>
      </View>
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

/*
- [ ]: add the details of React Native maps Directions
- [ ]: display search result Google Maps Places API

*/
