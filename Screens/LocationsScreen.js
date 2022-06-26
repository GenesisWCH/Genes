import React, { useEffect, useState } from "react";
import { Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { db } from '../firebase';
import styles from "../css/LocationsStyle";
import { Dropdown } from 'react-native-element-dropdown';
import { collection, getDocs, doc, getDoc} from "firebase/firestore";
import Toast from 'react-native-root-toast';

function LocationsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [routeText, setRouteText] = useState('');
  const [data, setData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [showDirection, setShowDirection] = useState(false);

  useEffect(() => {
    const getDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "map"));
      setData(querySnapshot.docs.map((doc) => ({ label: doc.id, value: doc.id })))
    };
    getDocuments();
  }, []);

  const searchToast = () => {
    let toast = Toast.show('Searching takes up to 10 seconds. Please wait.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 3000);
};

  const setVisited = async () => {
    // console.log('calling setVisited')
    const visited = new Map()
    const querySnapshot = await getDocs(collection(db, "map"));
    // console.log('hey i queried!')
    querySnapshot.forEach((doc) => {
      visited.set(doc.id, false)
    });
    return visited
  }

  const getNbrs = async (place, nbrList) => {
    // console.log('calling getNbrs')
    const docRef = doc(db, "map", place);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const nbrs = docSnap.get('links')
      for (var i = 0; i < nbrs.length; i++) {
        nbrList.push(nbrs[i])
      }
      // console.log('nbrList:', nbrList)
    } else {
      console.log("\nNo such document!\n\nCurrent Place checked:", place);
    }
  }

  const setRoute = (map) => {
    // console.log('calling setRoute')
    var currPlace = end
    var text = ''
    while (currPlace != null) {
      text = (' -> ' + currPlace + text)
      // console.log('currPlace:', currPlace)
      currPlace = map.get(currPlace)
    }
    text = text.slice(3)
    console.log(text)
    setRouteText(text)
    setShowDirection(true)
  }

  //BFS -> given a starting location/doc, and an end, 
  // query the doc. get the array links. and continuously find the next frontiers. When the location is reached,
  // break the while loop. 
  // Map pathMap will trace the path. 

  const BFS = async () => {
    searchToast()
    // console.log('calling BFS', ' ', start, '->', end)
    const pathMap = new Map()
    const visited = await setVisited()
    var queue = []
    queue.push(start)
    // console.log('Queue:', queue)

    pathMap.set(start, null)
    visited.set(start, true)
    // console.log('Marked', start, 'as visited!')

    while (queue.length != 0) {
      var next = []
      for (var i = 0; i < queue.length; i++) {
        var currPlace = queue[i]
        // console.log('current place:', currPlace)
        var nbrs = []
        await getNbrs(currPlace, nbrs)
        for (var j = 0; j < nbrs.length; j++) {
          var neighbour = nbrs[j]
          if (!visited.get(neighbour)) {
            // console.log(neighbour, 'is visited!')
            visited.set(neighbour, true)
            next.push(neighbour)
            pathMap.set(neighbour, currPlace)
          }
        }
      }
      if (pathMap.has(end)) {
        break
      }
      queue = next
    }
    setRoute(pathMap)
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
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setStart(item.value);
              setIsFocus(false);
              console.log(start)
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
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setEnd(item.value);
              setIsFocus(false);
              console.log(end)
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
            onPress={() => BFS()}
            style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
          {showDirection ?
            <Text style={styles.routeText}>{routeText}</Text>
            : <Text></Text>}
            <Image 
            style = {styles.L2Map}
            source={{uri: 'https://www.comp.nus.edu.sg/images/resources/content/mapsvenues/COM1_L2.jpg'}}/>
        </View>
      </View>
    </SafeAreaView>
  );
}


export default LocationsScreen;
