import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../css/NotificationsScreenStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import LogOutHandler from "../functions/LogOutHandler";
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { toJSDateStr, toTimeStr } from "../functions/timeFunctions";
import Toast from 'react-native-root-toast';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsMessage from "./NotificationsMessage";

const Stack = createNativeStackNavigator();

function NotificationsScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [reset, setReset] = useState(true);

  useEffect(() =>
    navigation.addListener('focus', () => setReset(true)),
    []);

  useEffect(() => {
    const getNotifications = async () => {
      const dummyNotifications = []
      const notificationRef = collection(db, 'users', auth.currentUser.uid, "notifications");
      const querySnapshot = await getDocs(notificationRef);
      // avoid asynchronous function within forEach. 
      querySnapshot.forEach((docSnapshot) => {

        console.log(docSnapshot.id)

        var admin = docSnapshot.get('admin')
        var createdTime = docSnapshot.get('created')
        var jsCreatedTime = toTimeStr(createdTime)
        var jsCreatedDate = toJSDateStr(createdTime.toDate())
        var message = docSnapshot.get('message')
        var type = docSnapshot.get('type')
        var datetimeText = jsCreatedDate + ", " + jsCreatedTime

        dummyNotifications.push({
          key: docSnapshot.id , type: type, date: jsCreatedDate,
          value: {
            id: docSnapshot.id, admin: admin, datetimeText: datetimeText, message: message
          }
        })
        console.log('notifications:', dummyNotifications)
      })

      setNotifications(dummyNotifications)
      console.log('notifications:', notifications)
      setReset(false)
    };

    if (reset) {
      getNotifications()
    }

    if (notifications != null && notifications == false) {
      console.log('\ncalling toast\n')
      noNotificationsToast()
    }
  }, [reset]);

  const refreshToast = () => {
    let toast = Toast.show('Please wait for a few seconds while refreshing.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const noNotificationsToast = () => {
    let toast = Toast.show('You have no notifications', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const refreshNotifications = async () => {
    setReset(true)
    refreshToast()
  };


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
        <View style={styles.top}>
          <Pressable
            onPress={() => refreshNotifications()}
            style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>Refresh Notifications</Text>
          </Pressable>
        </View>
        <View style={styles.bottom}>
          <FlatList
            data={notifications}
            renderItem={({ item }) =>
              <View>
                <Pressable
                  onPress={() => navigation.navigate('Notifications Message', {
                    details: item.value
                  })}
                  style={styles.item}
                >
                  { item.type == 'bookings'
                  ? <View style={styles.leftCol}>
                  <Text style={styles.typeText}>Bookings</Text>
                </View>
                : <View style={styles.leftCol}>
                <Text style={styles.typeText}>System Maintenance</Text>
              </View>}
                  <View style={styles.rightCol}>
                    <Text style={styles.typeText}>{item.date}</Text>
                  </View>
                </Pressable>
              </View>
            }
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const NotificationsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Notifications List" component={NotificationsScreen} />
      <Stack.Screen name="Notifications Message" component={NotificationsMessage}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: 'darkorange',
          }
        }} />
    </Stack.Navigator>
  )
}

export default NotificationsStack;