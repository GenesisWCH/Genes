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
      { text: 'Drinks Vending Machine @ Level 1', image: 'https://drive.google.com/uc?export=view&id=1tJZUiK5VK3MOKgxCWYh574__AcxIsqR2', navi: 'Drinks Vending Machine @ Level 1' },
      { text: 'Drinks Vending Machine @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1cyMDd645LiwPmAW2kv2D_cT6UO6d7Wbc', navi: 'Drinks Vending Machine @ Level 2' },
    ]
  },
  {
    title: "Facilities", data: [
      { text: 'Printer @ Level 1', image: 'https://drive.google.com/uc?export=view&id=182HG7-kIMQy7WwgZlvTKACm5iQiGRWE3', navi: 'Printer @ Level 1' },
      { text: 'bluPort @ Level 1', image: 'https://drive.google.com/uc?export=view&id=1kDyvpxZOqd7vXhojJ3StbivApLL_BpTS', navi: 'bluPort @ Level 1' },
    ]
  },
  {
    title: "Study Spaces", data: [
      { text: 'Study Space @ Level B1', image: 'https://drive.google.com/uc?export=view&id=1J94yKs4BnJf7OLuDu9I21iefAWJehxn_', navi: 'Study Space @ Level B1' },
      { text: 'Study Space @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1QZXjJmY4apFmV2onWnZ9qqcp_k0qhP7d', navi: 'Study Space @ Level 2' },
    ]
  },
]

function L1VendingMachineDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1tJZUiK5VK3MOKgxCWYh574__AcxIsqR2'}} style={{width: 300, height: 300}}/>
      <Text>Vending Machine @ Level 1</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function L2VendingMachineDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1cyMDd645LiwPmAW2kv2D_cT6UO6d7Wbc'}} style={{width: 300, height: 300}}/>
      <Text>Vending Machine @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function L1PrinterDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=182HG7-kIMQy7WwgZlvTKACm5iQiGRWE3'}} style={{width: 300, height: 300}}/>
      <Text>Printer @ Level 1</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}


function L1bluPortDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1kDyvpxZOqd7vXhojJ3StbivApLL_BpTS'}} style={{width: 300, height: 300}}/>
      <Text>bluPort @ Level 1</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function B1StudySpaceDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Image source={{uri:'https://drive.google.com/uc?export=view&id=1J94yKs4BnJf7OLuDu9I21iefAWJehxn_'}} style={{width: 300, height: 300}}/>
       <Text>Study Space @ Basement 1</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function L2StudySpaceDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Image source={{uri:'https://drive.google.com/uc?export=view&id=1QZXjJmY4apFmV2onWnZ9qqcp_k0qhP7d'}} style={{width: 300, height: 300}}/>
       <Text>Study Space @ Level 2</Text>
      <Button style={{flex: 1, marginTop: 30}} title="Go back" onPress={() => navigation.goBack()}></Button>
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
          Welcome, {auth.currentUser.isAnonymous ? 'User' : auth.currentUser.displayName}!
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
      <Stack.Screen name="Main" component={HomeScreenMain}  />
      <Stack.Screen name="Drinks Vending Machine @ Level 1" component={L1VendingMachineDetails} />
      <Stack.Screen name="Drinks Vending Machine @ Level 2" component={L2VendingMachineDetails} />
      <Stack.Screen name="Printer @ Level 1" component={L1PrinterDetails} />
      <Stack.Screen name="bluPort @ Level 1" component={L1bluPortDetails} />
      <Stack.Screen name="Study Space @ Level B1" component={B1StudySpaceDetails} />
      <Stack.Screen name="Study Space @ Level 2" component={L2StudySpaceDetails} />
    </Stack.Navigator >
  )
}

export default HomeScreen;