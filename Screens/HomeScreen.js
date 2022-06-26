import React, { useState } from "react";
import { Text, View, SectionList, Image, Button } from 'react-native';
import styles from '../css/HomeScreenStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth } from '../firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LIST = [
  {
    title: "Food Outlets", data: [
      { text: 'Drinks Vending Machine @ Level 1', image: 'https://msba.nus.edu.sg/wp-content/uploads/2019/04/2010-School-of-Computing-pic-_5_.jpg', navi: 'Drinks Vending Machine @ Level 1' },
      { text: 'Drinks Vending Machine @ Level 2', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/COM_2_Building%2C_NUS_School_of_Computing%2C_National_University_of_Singapore_-_20100813.jpg/1280px-COM_2_Building%2C_NUS_School_of_Computing%2C_National_University_of_Singapore_-_20100813.jpg', navi: 'Drinks Vending Machine @ Level 2' }
    ]
  },
  {
    title: "Facilities", data: [
      { text: 'Printer @ Level 1', image: 'https://drive.google.com/file/d/1iupyn2093cJo9-n-o0TFOXBEhQruuhlE/view?usp=sharing', navi: 'Printer @ Level 1' },
      { text: 'Portable Charger @ Level 1', image: '', navi: 'Portable Charger @ Level 1' },
      { text: 'bluPort @ Level 1', image: '', navi: 'bluPort @ Level 1' },
    ]
  },
  {
    title: "Study Spaces", data: [
      { text: 'Study Space @ Level 1', image: 'https://drive.google.com/file/d/1iupyn2093cJo9-n-o0TFOXBEhQruuhlE/view?usp=sharing', navi: 'Study Space @ Level 1' },
      { text: 'Study Space @ Level 2', image: '', navi: 'Study Space @ Level 2' },
      { text: 'bluPort @ Level 1', image: '', navi: 'bluPort @ Level 1' },
    ]
  },
]

function L1VendingMachineDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} >
        <Text>HAHAHA</Text>
        </Button>
    </View>
  );
}

function HomeScreenMain({ navigation }) {
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
            >
              <Text style={styles.textStyle}>Profile</Text>
            </Pressable>
            <Pressable
              style={[styles.button]}
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
          sections={LIST}
          renderItem={({ item, index }) =>
            <View>
              <Pressable
              onPress={() => navigation.navigate(item.navi)}
              style={styles.item}
              >
              <Image style={styles.image} source={{uri:item.image}} />
              <Text key={index}>{item.text}</Text>
              </Pressable>
            </View>
          }
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Main" component={HomeScreenMain} />
      <Stack.Screen name="Drinks Vending Machine @ Level 1" component={L1VendingMachineDetails} />
    </Stack.Navigator >
  )
}

export default HomeScreen;