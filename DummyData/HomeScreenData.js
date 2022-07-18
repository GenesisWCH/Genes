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

export default LIST;

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