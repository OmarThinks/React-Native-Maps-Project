import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
  detailHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 3,
  },

  detailText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingBottom: 3,
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

  const mapRef = React.useRef(null);
  const fromMarkerRef = React.useRef(null);

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

          /*
          console.log('distance', directionsObject.distance);
          console.log('duration', directionsObject.duration);
          console.log('coordinates', directionsObject.coordinates);
          console.log('fares', directionsObject.fares);
          console.log('waypointOrder', directionsObject.waypointOrder);
          console.log('legs', directionsObject.legs);
          */
          setDuration(
            String(Math.round(directionsObject.duration * 1000) / 1000),
          );
          setDistance(
            String(Math.round(directionsObject.distance * 1000) / 1000),
          );
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
        <GooglePlacesInput
          setLocation={(location: LatLng) => {
            setCircleCenter(location);
            setDirectionFrom(location);
            mapRef.current.animateToRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });

            fromMarkerRef.current.animateMarkerToCoordinate({
              latitude: location.latitude,
              longitude: location.longitude,
            });
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{
          flexGrow: 1,
          flexShrink: 1,
          alignSelf: 'stretch',
        }}
        initialRegion={region}
        ref={mapRef}>
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
            //console.log('onDragEnd', e.nativeEvent.coordinate);
            setCircleCenter(e.nativeEvent.coordinate);
          }}
          pinColor={'green'}
          onDragStart={e => {
            //console.log('onDragStart', e.nativeEvent.coordinate);
            setCircleCenter(e.nativeEvent.coordinate);
          }}
          onDragEnd={e => {
            //console.log('onDragEnd', e.nativeEvent.coordinate);
            setCircleCenter(e.nativeEvent.coordinate);
            setDirectionFrom(e.nativeEvent.coordinate);
          }}
          ref={fromMarkerRef}>
          <Callout>
            <Text>From</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={location2}
          draggable={true}
          onDrag={e => {
            //console.log('onDragEnd', e.nativeEvent.coordinate);
            // setLocationTo(e.nativeEvent.coordinate);
          }}
          pinColor={'red'}
          onDragStart={e => {
            //console.log('onDragStart', e.nativeEvent.coordinate);
            // setLocationTo(e.nativeEvent.coordinate);
          }}
          onDragEnd={e => {
            //console.log('onDragEnd', e.nativeEvent.coordinate);
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
          padding: 3,
        }}>
        <View style={{flex: 1}}>
          <Text style={[styles.detailHeader]}>Distance</Text>
          <Text style={[styles.detailText]}>{distance} Kilometers</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={[styles.detailHeader]}>Duration</Text>
          <Text style={[styles.detailText]}>{duration} Minutes</Text>
        </View>
      </View>
    </View>
  );
};

export default MainMap;

const GooglePlacesInput = ({
  setLocation,
}: {
  setLocation: (location: LatLng) => void;
}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details: GooglePlaceDetail | null = null) => {
        // 'details' is provided when fetchDetails = true

        if (details) {
          console.log('details', details);
          console.log(
            details.geometry.location.lat,
            details.geometry.location.lng,
          );

          setLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }

        // console.log('data', data);
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
      fetchDetails
      GooglePlacesDetailsQuery={{fields: 'geometry'}}
      //currentLocation
    />
  );
};

/*
- [ ]: display search result Google Maps Places API
*/
