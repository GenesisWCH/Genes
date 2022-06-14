import React, { useState } from "react";
import { Text, View, SectionList } from 'react-native';
import styles from '../css/HomeScreenStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth } from '../firebase';

const DATA = [
  {
    title: "Food Outlets",
    data: ['Drinks Vending Machine @ Level 1','Drinks Vending Machine @ Level 2'],
  },
  {
    title: "Facilities",
    data: ['Printer @ Level 1', 'Portable Charger @ Level 1', 'bluPort @ Level 1'],
  },
  {
    title: "Study Spaces",
    data: ['Study Space @ Level 1', 'Study Space @ Level 2'],
  }]

function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
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
        <Text style={styles.headerText}>Home</Text>
        <Pressable style={styles.profileIcon} onPress={() => setModalVisible(true)}>
          <AntDesign name="user" size={28} color='black' />
        </Pressable>

      </View>

      <View style={styles.body}>

        <Text style={styles.welcomeText}>
          Welcome, {auth.currentUser.isAnonymous ? 'Guest' : auth.currentUser.displayName}!
          </Text>
        <SectionList
          sections={DATA}
          renderItem={({ item }) => 
          <View>
            <Text style={styles.item}>
              {item}
              </Text>
              <Pressable 
              onPress={() => navigation.navigate('Locations')}
              style={styles.directionbutton}
              android_ripple={{ color: '#FFF' }}>
                <Text style={styles.buttonText}>  Directions</Text>
              </Pressable>
            </View>
            }
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;