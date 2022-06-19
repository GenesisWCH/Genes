import React, { useEffect, useState, useRef } from "react";
import { Text, View, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth } from '../firebase';

import styles from "../css/LocationsStyle";
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { render } from "react-dom";
import { autocompleteKey } from '@env';
import { Animated, KeyboardAvoidingView } from "react-native-web";
import MapViewDirections from "../MapViewDirections";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 1.3398239189160044;
const LONGITUDE = 103.70272617604708;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 1.3398239189160044,
  longitude: 103.70272617604708,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

function LocationsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showDirections, setShowDirections] = useState(false)
  const [duration, setDuration] = useState(0)
  const [distance, setDistance] = useState(0)
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  })
  const [markerRegion, setMarkerRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  })
  const mapRef = useRef();
  const edgePaddingValue = 20
  // const edgePadding = {
  //   top: edgePaddingValue,
  //   right: edgePaddingValue,
  //   bottom: edgePaddingValue,
  //   left: edgePaddingValue
  // }

  const locationToast = () => {
    let toast = Toast.show('You have given permission to DestiNUS to use your current location.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        locationToast();
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5
      });

      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
    })();
  }, []);




  // const onLoading = () => {
  //   const newRegion = {
  //     latitude: latitude,
  //     longitude: longitude
  //   }
  // }

  // const animateMap = () => {
  //   mapRef.current.animateToRegion({ // Takes a region object as parameter
  //     region
  //   }, 1000);
  // }

  return (
    <SafeAreaView style={styles.page}>
      <Modal
        animationIn={"slideInRight"}
        animationOut={'slideOutRight'}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AntDesign style={styles.modalProfileIcon} name="user" size={28} color='black' />
            <Pressable
              style={[styles.button]}
            //</View>onPress={}
            >
              <Text style={styles.textStyle}>Profile</Text>

            </Pressable>
            <Pressable
              style={[styles.button]}
            //onPress={}
            >
              <Text style={styles.textStyle}>Settings</Text>

            </Pressable>
            <Pressable
              style={[styles.button]}
            //</View>onPress={}
            >
              <Text style={styles.textStyle}>About</Text>

            </Pressable>
            <Pressable
              style={[styles.button]}
              onPress={LogOutHandler}
            >
              <Text style={styles.textStyle}>Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerText}>Location</Text>
        <Pressable
          style={styles.profileIcon}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="user" size={28} color='black' />
        </Pressable>

      </View>
      <View style={styles.body}>
        <View style={styles.page}>
          <GooglePlacesAutocomplete
            // layering issue: not above map and need to manually remove keyboard avoiding view
            placeholder='Search'
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: 'distance'
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              })
              setMarkerRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              })
              setShowDirections(true)
            }}
            query={{
              key: autocompleteKey,
              language: 'en',
              components: 'country:sg',
              types: '',
              radius: 30000,
              location: `${markerRegion.latitude}, ${markerRegion.longitude}`
            }}
            styles={{
              container: {
                flex: 0,
                position: "absolute",
                width: '100%',
                zIndex: 1
              },
              listView: { backgroundColor: 'white' }
            }}
          />
          <MapView
            ref={mapRef}
            style={styles.map}
            region={region}
            // onMapReady={() => onLoading()}
            showsUserLocation
            followsUserLocation //Apple only
            showsIndoorLevelPicker
          >
            {showDirections ?
              <MapViewDirections
                origin={{ latitude: latitude, longitude: longitude }}
                destination={{ latitude: markerRegion.latitude, longitude: markerRegion.longitude }}
                apikey={autocompleteKey}
                strokeWidth={3}
                strokeColor="hotpink"
                optimizeWaypoints={true}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`)
                  console.log(`Duration: ${result.duration} min.`)
                  setDistance(result.distance)
                  setDuration(result.duration)
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      top: height / 10,
                      right: width / 10,
                      bottom: height / 10,
                      left: width / 10
                    }
                  })
                  console.log('zoomed in?')
                }}
                onError={(errorMessage) => {
                  console.log('GOT AN ERROR');
              }}
              />
              : null}
            <Marker coordinate={{ latitude: markerRegion.latitude, longitude: markerRegion.longitude }} />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
}


export default LocationsScreen;

// my home coordinates
// initialRegion={{
//   latitude: 1.3398239189160044,
//   longitude: 103.70272617604708,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421
// }}

// COM 1 coordinates: 1.294898512582403, 103.77367351793063
// note: zoom level for 'centralise map to current location' button is same as the current zoom.

