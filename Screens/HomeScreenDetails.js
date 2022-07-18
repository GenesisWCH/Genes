import React from "react";
import { Text, View, Image, Button } from 'react-native';


function HomeScreenDetails({ route, navigation }) {
    const { text } = route.params
    const { image } = route.params


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{uri:image}} style={{width: 300, height: 300}}/>
          <Text>{text}</Text>
          <Button title="Go back" onPress={() => navigation.goBack()}></Button>
        </View>
      );
}

export default HomeScreenDetails;

