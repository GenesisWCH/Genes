import React, { useState } from "react";
import { Text, View, SectionList, Image } from 'react-native';
import styles from '../css/HomeScreenStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth } from '../firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LIST from "../DummyData/HomeScreenData";
import HomeScreenDetails from "./HomeScreenDetails";


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
              onPress={() => navigation.navigate('Details', {
                text: item.text,
                image: item.image
              })}
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
      <Stack.Screen name="Details" component={HomeScreenDetails} />
    </Stack.Navigator >
  )
}


export default HomeScreen;