import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native';
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

function LocationsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
    const[region, setRegion] = useState({
    latitude: 1.3398239189160044,
    longitude: 103.70272617604708,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

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

  const mapRef = React.createRef();

  // const onLoading = () => {
  //   const newRegion = {
  //     latitude: latitude,
  //     longitude: longitude
  //   }
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
            }}
            query={{
              key: 'AIzaSyD5tEVCdFTTHyin4scVIfcwM9LPlDO7wxA',
              language: 'en',
              components: 'country:sg',
              types: 'establishment',
              radius: 30000,
              location: `${region.latitude}, ${region.longitude}`
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
            // ref={mapRef}
            style={styles.map}
            // onMapReady={() => onLoading()}
            showsUserLocation
            followsUserLocation //Apple only
            showsIndoorLevelPicker
          //minZoomLevel={18}
          >
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
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