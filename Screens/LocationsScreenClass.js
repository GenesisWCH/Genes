import React, { useEffect, useState } from "react";
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

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 1.3398239189160044;
const LONGITUDE = 103.70272617604708;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


// examples on GitHub repo were done by class instead of function
class LocationsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markerRegion: {
        latitude: 1.3398239189160044,
        longitude: 103.70272617604708,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      location: {
        latitude: null,
        longitude: null
      },
      modalVisible: false
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  updateState(location) {
    this.setState({
      ...this.state,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  async componentDidMount() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5
      });
      this.updateState(location);
    } catch (error) {
      console.log(error);
    }
  }

  locationToast() {
    let toast = Toast.show('You have given permission to DestiNUS to use your current location.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  toggleModal() {
    const modalState = this.state.modalVisible;
    this.setState({ modalVisible: !modalState});
  }

  autoCompleteSearch(latitude, longitude) {
    const markerRegion2 = this.state.markerRegion
    markerRegion2.latitude = latitude
    markerRegion2.longitude = longitude
    this.setState(
      {markerRegion: markerRegion2}
    )
  }



// const mapRef = React.createRef();

// const onLoading = () => {
//   let location = Location.getCurrentPositionAsync({
//     accuracy: Location.Accuracy.Balanced,
//     enableHighAccuracy: true,
//     timeInterval: 5
//   });


//   mapRef.current.animateToRegion({
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421
//   }, 5000)

// }




render() {
  return (
    <SafeAreaView style={styles.page}>
      <Modal
        animationIn={"slideInRight"}
        animationOut={'slideOutRight'}
        isVisible={this.state.modalVisible}
        onBackdropPress={this.toggleModal}
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
          onPress={this.toggleModal}
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
              this.autoCompleteSearch(details.geometry.location.lat, details.geometry.location.lng)
            }}
            query={{
              key: 'AIzaSyD5tEVCdFTTHyin4scVIfcwM9LPlDO7wxA',
              language: 'en',
              components: 'country:sg',
              types: 'establishment',
              radius: 30000,
              location: `${this.state.region.latitude}, ${this.state.region.longitude}`
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
            region={this.state.region}
      onRegionChange={region => this.onRegionChange(region)}
            showsUserLocation
            followsUserLocation //Apple only
            showsIndoorLevelPicker
          //minZoomLevel={18}
          >
            <Marker coordinate={{ latitude: this.state.markerRegion.latitude, longitude: this.state.markerRegion.longitude }} />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
}
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


  // const[modalVisible, setModalVisible] = useState(false);
  // const[location, setLocation] = useState(null);
  // const[latitude, setLatitude] = useState(null);
  // const[longitude, setLongitude] = useState(null);
  // const[region, setRegion] = useState({
  //   latitude: 1.3398239189160044,
  //   longitude: 103.70272617604708,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421
  // })

  

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       locationToast();
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.Balanced,
  //       enableHighAccuracy: true,
  //       timeInterval: 5
  //     });

  //     setLatitude(location.coords.latitude)
  //     setLongitude(location.coords.longitude);
  //     setLocation(location.coords);
  //   })();
  // }, []);

  // modal function
  // onPress={() => setModalVisible(true)}
  

  // setRegion({
  //   latitude: details.geometry.location.lat,
  //   longitude: details.geometry.location.lng,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421
  // })