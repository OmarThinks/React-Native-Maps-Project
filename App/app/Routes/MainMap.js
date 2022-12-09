import React, {useState, Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Overlay,
  UrlTile,
  Callout,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

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

  const onRegionChange = regionNew => {
    setRegion(regionNew);
  };

  return (
    <View style={styles.container2}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        //onRegionChange={onRegionChange}
        onRegionChangeComplete={onRegionChange}>
        <Marker
          coordinate={markerLocation}
          draggable={true}
          onDragEnd={e => {
            console.log('onDragEnd', e.nativeEvent.coordinate);
            setMarkerLocation(e.nativeEvent.coordinate);
          }}
          pinColor={'red'}
          onDragStart={e => {
            console.log('onDragStart', e.nativeEvent.coordinate);
          }}>
          <Callout>
            <Text>Hey</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default MainMap;

/*
class MainMap2 extends Component {
  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({region});
  }

  render() {
    return (
      <MapView
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}
*/
