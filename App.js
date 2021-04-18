import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  Linking
} from 'react-native';

/* creates status bar */
import { NavigationContainer, useNavigation } from '@react-navigation/native';
/* creates navigation bar */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import Search from './src/screens/search'; // --> home
import Fav from './src/screens/fav'; // --> history
import Scan from './src/screens/scan';
import Profile from './src/screens/profile';
import Store from './src/screens/store';
import Recipe from './src/screens/recipe';
import commonStyles from './commonStyles';

/* hamburger */
const Drawer = createDrawerNavigator();
const DrawerNav = (props) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TabNav" component={TabNav} options={{ title: 'Home' }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ title: 'My Profile' }} />


    </Drawer.Navigator>
  )
}

const DrawerContent = (props) => {
  return (
    <>
      <View style={commonStyles.drawerHeader}>
        <Image source={require('./assets/unnamed.png')} style={commonStyles.drawerProfilePhoto} />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList activeBackgroundColor={'transparent'} {...props} />
        <DrawerItem
          label="About"
          onPress={() => Linking.openURL('https://www.justnice.net')}
        />
      </DrawerContentScrollView>
    </>
  );
}

/* bottom navigation bar */
const Tab = createBottomTabNavigator();
const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'logo-react';

          if (route.name === 'Home') {
            iconName = require('./assets/ham.png');
          }
          else if (route.name === 'History') {
            iconName = require('./assets/clock.png');
          }
          else if (route.name === 'Scan') {
            iconName = require('./assets/camera.png');
          }
          else if (route.name === 'Store') {
            iconName = require('./assets/store.png');
          } else if (route.name === 'Recipe') {
            iconName = require('./assets/recipe.png');
          }


          // You can return any component that you like here!
          return <Image source={iconName} size={size} color={color} style={styles.imageicon} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: 'rgba(212, 216, 227, 0.3)',
        safeAreaInsets: { bottom: 0 },
        style: { height: 70 },
        showLabel: false,
        tabStyle: { paddingBottom: 15 }
      }}
    >
      <Tab.Screen name="Home" component={Search} />
      <Tab.Screen name="History" component={Fav} />
      <Tab.Screen name="Scan" component={Scan} />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="Recipe" component={Recipe} />

    </Tab.Navigator>
  );
}


/* functional component --> class component */
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="default" backgroundColor="#219bd9" />
        <DrawerNav />
      </NavigationContainer>

    );
  }
}


const styles = StyleSheet.create({
  imageicon: {
    flex: 1,
    width: 35,
    height: 35,
    resizeMode: 'contain'
  }

});
export default App;