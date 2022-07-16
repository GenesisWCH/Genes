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
      { text: 'Cerebro @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1-G7XOO--8ZaJ0Cz3cXhQlE97JVrFHJSb', navi: 'Cerebro @ Level 2' },
      { text: 'Makers @ SOC @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1aeNEFQi8yvr3RK7GV6H3ovtpfm5Ajr8t', navi: 'Makers @ SOC @ Level 2' },
      { text: 'Student Lounge @ SOC @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1PK4Rs2KSStGzyxQE0VjoXfseyRHW1oRa', navi: 'Student Lounge @ SOC @ Level 2' },
      { text: 'Computing Club Room @ Level 2', image: 'https://drive.google.com/uc?export=view&id=10T1OSkJmyG-MZc4EJIGN1YU23rZ-JjPV', navi: 'Computing Club Room @ Level 2' },
    ]
  },
  {
    title: "Seminar Rooms", data: [
      { text: 'Seminar Room 1 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=18N_Zk6ZCsipeTkAC5Y_SwDsD48xXu9Jh', navi: 'Seminar Room 1 @ Level 2' },
      { text: 'Seminar Room 2 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1UUtrn9-jW4LgfrC2B_xH0sgMbeJKn3Eg', navi: 'Seminar Room 2 @ Level 2' },
      { text: 'Seminar Room 3 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1c08l-ysJsitJoN3pZJUbpDSo0T5HyvOP', navi: 'Seminar Room 3 @ Level 2' },
      { text: 'Seminar Room 5 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=16HNgKm6TnwOCN5-ugv4G6SQo7fvLn_u9', navi: 'Seminar Room 5 @ Level 2' },
      { text: 'Seminar Room 6 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1QXRdRsJHBwJtqjlJEzKCI-pulc8XYXGR', navi: 'Seminar Room 6 @ Level 2' },
      { text: 'Seminar Room 7 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=13EzRPz5zsII7ExJLGuBt4in8AjxVR0B2', navi: 'Seminar Room 7 @ Level 2' },
      { text: 'Seminar Room 8 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1Ecxxi-QmujFekUmUYo8rf0Wj2jstX-_h', navi: 'Seminar Room 8 @ Level 2' },
      { text: 'Seminar Room 9 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1AKwcNAFSIK0sL_uNkJCuUd_pcUdME_VB', navi: 'Seminar Room 9 @ Level 2' },
      { text: 'Seminar Room 10 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1Xj_7gngWvM59gq9FRh4GoTN5OOcZbdYs', navi: 'Seminar Room 10 @ Level 2' },
    ]
  },
  {
    title: "Tutorial Rooms", data: [
      { text: 'Tutorial Room 10 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1mQQ8_nmY3MVPLmstcuQdVGf3j28eA5RK', navi: 'Tutorial Room 10 @ Level 2' },
      { text: 'Tutorial Room 11 @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1fnd9w6sG0dILfn5bxcscUVF48bU8AXo4', navi: 'Tutorial Room 11 @ Level 2' },
    ]
  },
  {
    title: "Study Spaces", data: [
      { text: 'Study Space @ Level B1', image: 'https://drive.google.com/uc?export=view&id=1J94yKs4BnJf7OLuDu9I21iefAWJehxn_', navi: 'Study Space @ Level B1' },
      { text: 'Study Space @ Level 2', image: 'https://drive.google.com/uc?export=view&id=1QZXjJmY4apFmV2onWnZ9qqcp_k0qhP7d', navi: 'Study Space @ Level 2' },
    ]
  },
  {
    title: "Staff Office", data: [
      { text: 'Office of Student Life and Undergraduate Studies', image: 'https://drive.google.com/uc?export=view&id=1IsPdREQKh4tT6d_HZ8j-bOTqLU_8WHN9', navi: 'Office of Student Life and Undergraduate Studies' },
    ]
  },
]

function OfficeDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1IsPdREQKh4tT6d_HZ8j-bOTqLU_8WHN9'}} style={{width: 300, height: 300}}/>
      <Text>Office of Student Life and Undergraduate Studies</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR1Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=18N_Zk6ZCsipeTkAC5Y_SwDsD48xXu9Jh'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 1 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR2Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1UUtrn9-jW4LgfrC2B_xH0sgMbeJKn3Eg'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 2 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR3Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1c08l-ysJsitJoN3pZJUbpDSo0T5HyvOP'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 3 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR5Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=16HNgKm6TnwOCN5-ugv4G6SQo7fvLn_u9'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 5 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR6Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1QXRdRsJHBwJtqjlJEzKCI-pulc8XYXGR'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 6 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR7Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=13EzRPz5zsII7ExJLGuBt4in8AjxVR0B2'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 7 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR8Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1Ecxxi-QmujFekUmUYo8rf0Wj2jstX-_h'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 8 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR9Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1AKwcNAFSIK0sL_uNkJCuUd_pcUdME_VB'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 9 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function SR10Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1Xj_7gngWvM59gq9FRh4GoTN5OOcZbdYs'}} style={{width: 300, height: 300}}/>
      <Text>Seminar Room 10 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function TR10Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1mQQ8_nmY3MVPLmstcuQdVGf3j28eA5RK'}} style={{width: 300, height: 300}}/>
      <Text>Tutorial Room 10 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function TR11Details({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1fnd9w6sG0dILfn5bxcscUVF48bU8AXo4'}} style={{width: 300, height: 300}}/>
      <Text>Tutorial Room 11 @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

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

function L2CerebroDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1-G7XOO--8ZaJ0Cz3cXhQlE97JVrFHJSb'}} style={{width: 300, height: 300}}/>
      <Text>Cerebro @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function L2MakersSOCDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1aeNEFQi8yvr3RK7GV6H3ovtpfm5Ajr8t'}} style={{width: 300, height: 300}}/>
      <Text>Makers@SOC @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function L2StudentLoungeDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=1PK4Rs2KSStGzyxQE0VjoXfseyRHW1oRa'}} style={{width: 300, height: 300}}/>
      <Text>Student Lounge @ Level 2</Text>
      <Button title="Go back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

function L2ComputingClubDetails({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri:'https://drive.google.com/uc?export=view&id=10T1OSkJmyG-MZc4EJIGN1YU23rZ-JjPV'}} style={{width: 300, height: 300}}/>
      <Text>Computing Club Room @ Level 2</Text>
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
      <Stack.Screen name="Seminar Room 1 @ Level 2" component={SR1Details} />
      <Stack.Screen name="Seminar Room 2 @ Level 2" component={SR2Details} />
      <Stack.Screen name="Seminar Room 3 @ Level 2" component={SR3Details} />
      <Stack.Screen name="Seminar Room 5 @ Level 2" component={SR5Details} />
      <Stack.Screen name="Seminar Room 6 @ Level 2" component={SR6Details} />
      <Stack.Screen name="Seminar Room 7 @ Level 2" component={SR7Details} />
      <Stack.Screen name="Seminar Room 8 @ Level 2" component={SR8Details} />
      <Stack.Screen name="Seminar Room 9 @ Level 2" component={SR9Details} />
      <Stack.Screen name="Seminar Room 10 @ Level 2" component={SR10Details} />
      <Stack.Screen name="Tutorial Room 10 @ Level 2" component={TR10Details} />
      <Stack.Screen name="Tutorial Room 11 @ Level 2" component={TR11Details} />
      <Stack.Screen name="Cerebro @ Level 2" component={L2CerebroDetails} />
      <Stack.Screen name="Makers @ SOC @ Level 2" component={L2MakersSOCDetails} />
      <Stack.Screen name="Student Lounge @ SOC @ Level 2" component={L2StudentLoungeDetails} />
      <Stack.Screen name="Computing Club Room @ Level 2" component={L2ComputingClubDetails} />
      <Stack.Screen name="Office of Student Life and Undergraduate Studies" component={OfficeDetails} />
    </Stack.Navigator >
  )
}

export default HomeScreen;