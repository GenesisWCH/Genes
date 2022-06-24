import React, { useState } from "react";
import { Button, Image, Text, View, SectionList, TouchableOpacity } from 'react-native';
import styles from '../css/HomeScreenStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth } from '../firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function MainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} >
        <Text>HAHAHA</Text>
        </Button>
    </View>
  );
}

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Main" component={mainScreen} />
//       <Stack.Screen name="Details" component={detailScreen} />
//     </Stack.Navigator>
//   );
// } 

const DATA = [
  {
    title: "Food Outlets",
    data: [
      
        <Pressable
          style={styles.listButton}
          onPress={() => navigation.navigate('not Main')}
        >
          <Text>Drinks Vending Machine @ Level 1</Text>
        </Pressable>,
        <View>
        <Image source={{ uri: 'https://msba.nus.edu.sg/wp-content/uploads/2019/04/2010-School-of-Computing-pic-_5_.jpg' }} style={{ width: 50, height: 50 }} />
        
      </View>,
      <Text>Drinks Vending Machine @ Level 2</Text>
    ],
  },
  {
    title: "Facilities",
    data: ['Printer @ Level 1', 'Portable Charger @ Level 1', 'bluPort @ Level 1'],
  },
  {
    title: "Study Spaces",
    data: ['Study Space @ Level 1', 'Study Space @ Level 2'],
  }]

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
          sections={DATA}
          renderItem={({ item }) =>
            <View>
              <Text style={styles.item}>
                {item}
              </Text>
              <Pressable
                onPress={() => navigation.navigate('Details')}
                style={styles.directionbutton}
                android_ripple={{ color: '#FFF' }}>
                <Text style={styles.directionButtonText}>Directions</Text>
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

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Main" component={HomeScreenMain} />
      <Stack.Screen name="not Main" component={MainScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator >
  )
}

export default HomeScreen;
/*
{
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
*/