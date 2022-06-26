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
import { collection, collectionGroup, query, where, getDocs, doc, getDoc, Firestore } from "firebase/firestore";


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
  const [data2, setData2] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [showDirection, setShowDirection] = useState(false);
  const [dummyMap2, setDummyMap2] = useState(new Map())

  useEffect(() => {
    const getDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "map"));
      setData(querySnapshot.docs.map((doc) => ({ label: doc.id, value: doc.id })))
      setData2(querySnapshot.docs.map((doc) => ({ label: doc.id, value: doc.id })))
      console.log(doc.id, " => ", doc.data());
    };

    getDocuments();
  }, []);

  // sets a map of place : false


  // dummyMap.set('02-AHU1', ['02-AHU1 dummy'])
  // dummyMap.set('02-AHU1 dummy', ['02-AHU1', 'SR 5 dummy'])
  // dummyMap.set('02-AHU2', ['02-AHU2 dummy'])
  // dummyMap.set('02-AHU2 dummy', ['02-AHU2', 'L2 Convenience Store dummy', 'SR 10 dummy'])
  // dummyMap.set('02-AHU4', ['Wire Centre dummy'])
  // dummyMap.set('Cerebro@SoC', ['Student Area'])
  // dummyMap.set('Computing Club', ['ICPC Lab dummy'])
  // dummyMap.set('DR 12', ['DR 12 dummy'])
  // dummyMap.set('DR 12 dummy', ['DR 12', 'TR 11', 'L2 Undergraduate Studies dummy', 'TR 10 dummy'])
  // dummyMap.set('Foyer Entrance', ['L2_Foyer', 'L2 Lift'])
  // dummyMap.set('ICPC Lab', ['ICPC Lab dummy'])
  // dummyMap.set('ICPC Lab dummy', ['ICPC Lab', 'L2 Convenience Store dummy', 'Wire Centre dummy', 'Computing Club'])
  // dummyMap.set('L2 Convenience Store', ['L2 Convenience Store dummy'])
  // dummyMap.set('L2 Convenience Store corner', ['L2 Convenience Store dummy', 'ICPC Lab dummy'])
  // dummyMap.set('L2 Convenience Store dummy', ['L2 Convenience Store', '02-AHU2 dummy', 'Stairs to COM2', 'L2 Convenience Store corner'])
  // dummyMap.set('L2 Lift', ['Foyer Entrance'])
  // dummyMap.set('L2 Undergraduate Studies', ['L2 Undergraduate Studies dummy'])
  // dummyMap.set('L2 Undergraduate Studies dummy', ['L2 Undergraduate Studies', 'Wire Centre dummy', 'DR 12 dummy', 'TR 11'])
  // dummyMap.set('L2_Foyer', ["Students' Lounge", 'SR 1', 'Student Area', 'SR 7 dummy', 'TR 10 dummy', 'Foyer Entrance'])
  // dummyMap.set('Linkway', ['SR 6 dummy', 'Makers@SoC dummy'])
  // dummyMap.set('Makers@SoC', ['Makers@SoC dummy'])
  // dummyMap.set('Makers@SoC dummy', ['Makers@SoC', 'SR 6 dummy', 'Linkway', 'SR 5 dummy'])
  // dummyMap.set('SR 1', ['L2_Foyer'])
  // dummyMap.set('SR 10', ['SR 10 dummy'])
  // dummyMap.set('SR 10 dummy', ['SR 10', 'VC Room', 'SR 9 dummy', '02-AHU2 dummy'])
  // dummyMap.set('SR 2', ['Student Area'])
  // dummyMap.set('SR 3', ['SR 8 dummy'])
  // dummyMap.set('SR 5', ['SR 5 dummy'])
  // dummyMap.set('SR 5 dummy', ['02-AHU1 dummy', 'SR 5', 'Makers@SoC dummy'])
  // dummyMap.set('SR 6', ['SR 6 dummy'])
  // dummyMap.set('SR 6 dummy', ['SR 6', 'Student Area', 'Linkway', 'Makers@SoC dummy'])
  // dummyMap.set('SR 7', ['SR 7 dummy'])
  // dummyMap.set('SR 7 dummy', ['L2_Foyer', 'SR 7', 'SR 8 dummy'])
  // dummyMap.set('SR 8', ['SR 8 dummy'])
  // dummyMap.set('SR 8 dummy', ['SR 7 dummy', 'SR 8', 'SR 3', 'SR 9 dummy'])
  // dummyMap.set('SR 9', ['SR 9 dummy'])
  // dummyMap.set('SR 9 dummy', ['SR 9', 'VC Room', 'SR 10 dummy', 'SR 8 dummy'])
  // dummyMap.set('Stair 5 (North)', ['Student Area'])
  // dummyMap.set('Stairs to COM 2', ['L2 Convenience Store dummy'])
  // dummyMap.set('Student Area', ['SR 6 dummy', 'Toilet near Stair 5 (North)', 'Stair 5 (North)', 'SR 2', 'L2_Foyer'])
  // dummyMap.set("Students' Lounge", ['L2_Foyer', 'TR 10 dummy'])
  // dummyMap.set('TR 10', ['TR 10 dummy'])
  // dummyMap.set('TR 10 dummy', ['TR 10', 'DR 12 dummy', "Students' Lounge", 'L2_Foyer'])
  // dummyMap.set('TR 11', ['DR 12 dummy', 'L2 Undergraduate Studies dummy'])
  // dummyMap.set('Toilet near Stair 5 (North)', ['Student Area'])
  // dummyMap.set('VC Room', ['SR 9 dummy', 'SR 10 dummy'])
  // dummyMap.set('Wire Centre', ['Wire Centre dummy'])
  // dummyMap.set('Wire Centre dummy', ['ICPC Lab dummy', '02-AHU4', 'L2 Undergraduate Studies dummy', 'Wire Centre'])







  const setVisited = async () => {
    console.log('calling setVisited')
    const visited = new Map()
    const querySnapshot = await getDocs(collection(db, "map"));
    console.log('hey i queried!')
    querySnapshot.forEach((doc) => {
      visited.set(doc.id, false)
      // console.log(doc.id, false)
      // console.log(doc.id, ' is marked not visited!')
      // console.log(doc.id, " => ", doc.data());
    });
    return visited
  }

  // given the document id in string, returns the array 'links'
  const getNbrs = async (place, nbrList, map) => {
    console.log('calling getNbrs')
    const docRef = doc(db, "map", place);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const nbrs = docSnap.get('links')
      // console.log('Neighbours of Place:', nbrs)
      for (var i = 0; i < nbrs.length; i++) {
        // if (nbrs[i] == end) {
        //   map.set(nbrs[i], place)
        // } else {
        // nbrList.push(nbrs[i])
        // }
        nbrList.push(nbrs[i])
      }
      console.log('nbrList:', nbrList)
    } else {
      console.log("\nNo such document!\n\nCurrent Place checked:", place);
    }
  }

  const setRoute = (map) => {
    console.log('calling setRoute')
    const currPlace = end
    var text = ''
    while (currPlace != null) {
      text = ('->' + currPlace + text)
      console.log('currPlace:', currPlace)
      setCurrPlace(map.get(currPlace))
    }
    setRouteText(text)
    console.log(routeText)
  }

  //BFS -> given a starting location/doc, and an end, 
  // query the doc. get the array links. and continuously find the next frontiers. When the location is reached,
  // break the while loop. 
  // hashmap will trace the path. 

  const BFS = async (startPoint, endPoint) => {
    console.log('calling BFS', ' ', start, '->', end)
    const map = new Map()
    const visited = await setVisited()
    var queue = []
    queue.push(start)
    console.log('Queue:', queue)

    map.set(start, null)
    visited.set(start, true)
    console.log('Marked', start, 'as visited!')
    // console.log(map)
    // setCurrPlaces([startPoint])
    // console.log(currPlaces)

    while (queue.length != 0) {
      var next = []
      for (var i = 0; i < queue.length; i++) {
        var currPlace = queue[i]
        console.log('current place:', currPlace)
        var nbrs = []
        await getNbrs(currPlace, nbrs, map)
        // var iter = map.entries()
        //     for (var ele of iter){
        //       console.log(ele)
        //     }
        // console.log('neighbours of curr point added')
        // console.log(nbrs)
        for (var j = 0; j < nbrs.length; j++) {
          var neighbour = nbrs[j]
          if (!visited.get(neighbour)) {
            console.log(neighbour, 'is visited!')
            visited.set(neighbour, true)
            next.push(neighbour)
            map.set(neighbour, currPlace)
            // var iter = map.entries()
            // for (var ele of iter){
            //   console.log(ele)
            // }
          }

        }
      }
      if (map.has(end)) {
        break
      }
      queue = next

    }

    //   for (var i = 0; i < currPlaces.length; i++) {
    //     const currPlace = currPlaces[i]
    //     const nbrs = getNbrs(currPlace)
    //     for (var j = 0; j < nbrs.length; j++) {

    //       const neighbour = nbrs[j]
    //       console.log(neighbour, 'is added!')
    //       if (!visited.get(neighbour)) {
    //         visited.set(neighbour, true)
    //         next.push(neighbour)
    //         map.set(neighbour, currPlace)
    //       }
    //     }
    //   }
    //   setCurrPlaces(next)
    //   if (map.has(end)) {
    //     break
    //   }
    // }


    setRoute(map)
    setShowDirection(true)
  }


  const setVisitedDummy = (map) => {
    console.log('calling setVisitedDummy')
    const visited = new Map()
    for (let key of map.keys()) {
      console.log(key);
      visited.set(key, false)
    }
    return visited
  }

  const getNbrsDummy = (place, map) => {
    console.log('calling getNbrsDummy')
    console.log(map)
    nbrList = []
    if (map.has(place)) {
      var nbrs = map.get(place)
      for (var i = 0; i < nbrs.length; i++) {
        nbrList.push(nbrs[i])
      }
      console.log('nbrList:', nbrList)
      return nbrList
    } else {
      console.log("\nNo such document!\n\nCurrent Place checked:", place);
    }
  }

  const BFSDummy = (startPoint, endPoint) => {
    console.log('calling BFSDummy', ' ', start, '->', end)

    const dummyMap = new Map()

    dummyMap.set('02-AHU1', ['02-AHU1 dummy'])
    dummyMap.set('02-AHU1 dummy', ['02-AHU1', 'SR 5 dummy'])
    dummyMap.set('02-AHU2', ['02-AHU2 dummy'])
    dummyMap.set('02-AHU2 dummy', ['02-AHU2', 'L2 Convenience Store dummy', 'SR 10 dummy'])
    dummyMap.set('02-AHU4', ['Wire Centre dummy'])
    dummyMap.set('Cerebro@SoC', ['Student Area'])
    dummyMap.set('Computing Club', ['ICPC Lab dummy'])
    dummyMap.set('DR 12', ['DR 12 dummy'])
    dummyMap.set('DR 12 dummy', ['DR 12', 'TR 11', 'L2 Undergraduate Studies dummy', 'TR 10 dummy'])
    dummyMap.set('Foyer Entrance', ['L2_Foyer', 'L2 Lift'])
    dummyMap.set('ICPC Lab', ['ICPC Lab dummy'])
    dummyMap.set('ICPC Lab dummy', ['ICPC Lab', 'L2 Convenience Store dummy', 'Wire Centre dummy', 'Computing Club'])
    dummyMap.set('L2 Convenience Store', ['L2 Convenience Store dummy'])
    dummyMap.set('L2 Convenience Store corner', ['L2 Convenience Store dummy', 'ICPC Lab dummy'])
    dummyMap.set('L2 Convenience Store dummy', ['L2 Convenience Store', '02-AHU2 dummy', 'Stairs to COM2', 'L2 Convenience Store corner'])
    dummyMap.set('L2 Lift', ['Foyer Entrance'])
    dummyMap.set('L2 Undergraduate Studies', ['L2 Undergraduate Studies dummy'])
    dummyMap.set('L2 Undergraduate Studies dummy', ['L2 Undergraduate Studies', 'Wire Centre dummy', 'DR 12 dummy', 'TR 11'])
    dummyMap.set('L2_Foyer', ["Students' Lounge", 'SR 1', 'Student Area', 'SR 7 dummy', 'TR 10 dummy', 'Foyer Entrance'])
    dummyMap.set('Linkway', ['SR 6 dummy', 'Makers@SoC dummy'])
    dummyMap.set('Makers@SoC', ['Makers@SoC dummy'])
    dummyMap.set('Makers@SoC dummy', ['Makers@SoC', 'SR 6 dummy', 'Linkway', 'SR 5 dummy'])
    dummyMap.set('SR 1', ['L2_Foyer'])
    dummyMap.set('SR 10', ['SR 10 dummy'])
    dummyMap.set('SR 10 dummy', ['SR 10', 'VC Room', 'SR 9 dummy', '02-AHU2 dummy'])
    dummyMap.set('SR 2', ['Student Area'])
    dummyMap.set('SR 3', ['SR 8 dummy'])
    dummyMap.set('SR 5', ['SR 5 dummy'])
    dummyMap.set('SR 5 dummy', ['02-AHU1 dummy', 'SR 5', 'Makers@SoC dummy'])
    dummyMap.set('SR 6', ['SR 6 dummy'])
    dummyMap.set('SR 6 dummy', ['SR 6', 'Student Area', 'Linkway', 'Makers@SoC dummy'])
    dummyMap.set('SR 7', ['SR 7 dummy'])
    dummyMap.set('SR 7 dummy', ['L2_Foyer', 'SR 7', 'SR 8 dummy'])
    dummyMap.set('SR 8', ['SR 8 dummy'])
    dummyMap.set('SR 8 dummy', ['SR 7 dummy', 'SR 8', 'SR 3', 'SR 9 dummy'])
    dummyMap.set('SR 9', ['SR 9 dummy'])
    dummyMap.set('SR 9 dummy', ['SR 9', 'VC Room', 'SR 10 dummy', 'SR 8 dummy'])
    dummyMap.set('Stair 5 (North)', ['Student Area'])
    dummyMap.set('Stairs to COM 2', ['L2 Convenience Store dummy'])
    dummyMap.set('Student Area', ['SR 6 dummy', 'Toilet near Stair 5 (North)', 'Stair 5 (North)', 'SR 2', 'L2_Foyer'])
    dummyMap.set("Students' Lounge", ['L2_Foyer', 'TR 10 dummy'])
    dummyMap.set('TR 10', ['TR 10 dummy'])
    dummyMap.set('TR 10 dummy', ['TR 10', 'DR 12 dummy', "Students' Lounge", 'L2_Foyer'])
    dummyMap.set('TR 11', ['DR 12 dummy', 'L2 Undergraduate Studies dummy'])
    dummyMap.set('Toilet near Stair 5 (North)', ['Student Area'])
    dummyMap.set('VC Room', ['SR 9 dummy', 'SR 10 dummy'])
    dummyMap.set('Wire Centre', ['Wire Centre dummy'])
    dummyMap.set('Wire Centre dummy', ['ICPC Lab dummy', '02-AHU4', 'L2 Undergraduate Studies dummy', 'Wire Centre'])

    console.log(dummyMap)
    const visited = setVisitedDummy(dummyMap)


    var queue = []
    queue.push(start)
    console.log('Queue:', queue)


    const map = new Map()
    map.set(start, null)
    visited.set(start, true)
    console.log('Marked', start, 'as visited!')
    // console.log(map)
    // setCurrPlaces([startPoint])
    // console.log(currPlaces)

    while (queue.length != 0) {
      var next = []
      for (var i = 0; i < queue.length; i++) {
        var currPlace = queue[i]
        console.log('Current place:', currPlace)
        var nbrs = getNbrsDummy(currPlace, dummyMap)

        for (var j = 0; j < nbrs.length; j++) {
          var neighbour = nbrs[j]
          if (!visited.get(neighbour)) {
            console.log(neighbour, 'is visited!')
            visited.set(neighbour, true)
            next.push(neighbour)
            map.set(neighbour, currPlace)

          }

        }
      }
      if (map.has(end)) {
        break
      }
      queue = next

    }
    setRoute(map)
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
            // value={start}
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
            // end
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder='Select end point'
            searchPlaceholder="Search..."
            // value={end}
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
            onPress={(start, end) => BFSDummy(start, end)}
            style={styles.searchButton}>
            <Text>Search</Text>
          </Pressable>
          {/* {showDirection ?
            <Text>{routeText}</Text>
            : <Text></Text>} */}
          {showDirection ?
            <Text>{routeText}</Text>
            : <Text></Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}


export default LocationsScreen;
