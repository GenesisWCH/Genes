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
  {title: "Food Outlets", sublist: [
    {text: 'Drinks Vending Machine @ Level 1', image:{uri: 'https://msba.nus.edu.sg/wp-content/uploads/2019/04/2010-School-of-Computing-pic-_5_.jpg'}, navi: 'Drinks Vending Machine @ Level 1'},
    {text: 'Drinks Vending Machine @ Level 2', image:{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/COM_2_Building%2C_NUS_School_of_Computing%2C_National_University_of_Singapore_-_20100813.jpg/1280px-COM_2_Building%2C_NUS_School_of_Computing%2C_National_University_of_Singapore_-_20100813.jpg'}, navi: 'Drinks Vending Machine @ Level 2'}
  ]
},
 {title: "Facilities", sublist: [
   {text: 'Printer @ Level 1', image:{uri: 'https://drive.google.com/file/d/1iupyn2093cJo9-n-o0TFOXBEhQruuhlE/view?usp=sharing'}, navi: 'Printer @ Level 1'},
   {text: 'Portable Charger @ Level 1', image:{uri: ''}, navi: 'Portable Charger @ Level 1'},
   {text: 'bluPort @ Level 1', image:{uri: ''}, navi: 'bluPort @ Level 1'},
]
},
{title: "Study Spaces", sublist: [
  {text: 'Study Space @ Level 1', image:{uri: 'https://drive.google.com/file/d/1iupyn2093cJo9-n-o0TFOXBEhQruuhlE/view?usp=sharing'}, navi: 'Study Space @ Level 1'},
  {text: 'Study Space @ Level 2', image:{uri: ''}, navi: 'Study Space @ Level 2'},
  {text: 'bluPort @ Level 1', image:{uri: ''}, navi: 'bluPort @ Level 1'},
]
},
]

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
          renderItem={( item ) => 
          <View>
            <Text style={styles.item}>
              {item}
              </Text>
              <Pressable 
              onPress={() => navigation.navigate('Locations')}
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

export default HomeScreen;