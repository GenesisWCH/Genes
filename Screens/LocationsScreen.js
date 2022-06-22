import React, { useEffect, useState, useRef } from "react";
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth, db } from '../firebase';

import styles from "../css/LocationsStyle";
import { Dropdown } from 'react-native-element-dropdown';
import { collection, collectionGroup, query, where, getDocs, Firestore } from "firebase/firestore";

const dummyData = [
  { label: 'L2_Foyer', value: 'L2_Foyer' },
]

function LocationsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [currPlace, setCurrPlace] = useState([])
  const [currPlaces, setCurrPlaces] = useState([])
  const [routeText, setRouteText] = useState('');
  const [data, setData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [showDirection, setShowDirection] = useState(false);

  useEffect(() => {
    const getDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "map"));
      setData(querySnapshot.docs.map((doc) => ({ label: doc.id, value: doc.id })))
      console.log(doc.id, " => ", doc.data());
    };

    getDocuments();
  }, []);

  // sets a map of place : false
  const setVisited = async () => {
    console.log('calling setVisited')
    const visited = new Map()
    const querySnapshot = await getDocs(collection(db, "map"));
    querySnapshot.forEach((doc) => {
      visited.set(doc.id, false)
      console.log(doc.id, ' is marked not visited!')
      // console.log(doc.id, " => ", doc.data());
    });
    return visited
  }

  // given the document id in string, returns the array 'links'
  const getNbrs = async (place) => {
    console.log('calling getNbrs')
    const docRef = doc(db, "map", place);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const nbrs = docSnap.get('links')
      console.log("Document data:", docSnap.data());
      console.log(nbrs)
      return nbrs
    } else {
      console.log("No such document!");
    }
  }

  const setRoute = (end, map) => {
    console.log('calling setRoute')
    const currPlace = end
    var text = ''
    while (currPlace != null) {
      text = ('->' + currPlace + text)
      setCurrPlace(map.get(currPlace))
    }
    
    setRouteText(text)
    console.log(routeText)
  }

  //BFS -> given a starting location/doc, and an end, 
  // query the doc. get the array links. and continuously find the next frontiers. When the location is reached,
  // break the while loop. 
  // hashmap will trace the path. 

  const BFS = (start, end) => {
    console.log('calling BFS')
    const map = new Map()
    const visited = setVisited()

    map.set(start, null)
    setCurrPlaces([start])
    while (currPlaces.length != 0) {
      const next = []
      for (var i = 0; i < currPlaces.length; i++) {
        const currPlace = currPlaces[i]
        const nbrs = getNbrs(currPlace)
        for (var j = 0; j < nbrs.length; j++) {
          
          const neighbour = nbrs[j]
          console.log(neighbour, 'is added!')
          if (!visited.get(neighbour)) {
            visited.set(neighbour, true)
            next.push(neighbour)
            map.set(neighbour, currPlace)
          }
        }
      }
      setCurrPlaces(next)
      if (map.has(end)) {
        break
      }
    }
    setRoute(end, map)
    setShowDirection(true)
  }

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
          <Dropdown
            // start
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder='Select starting point'
            searchPlaceholder="Search..."
            value={start}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setStart(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          />
          <Dropdown
            // end
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder='Select end point'
            searchPlaceholder="Search..."
            value={end}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setEnd(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          />
          <Pressable
            onPress={(start, end) => BFS(start, end)}
            style={styles.button}>
            <Text>Search</Text>
          </Pressable>
          {/* {showDirection ?
            <Text>{routeText}</Text>
            : <Text></Text>} */}
            {showDirection ?
            <Text>hello!</Text>
            : <Text></Text>}
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

