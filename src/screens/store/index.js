import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

class Store extends React.Component {
  render() {
    return (
      <>
        <SafeAreaView>
          <StatusBar backgroundColor="rgba(1.0, 0, 0, 0.2)" translucent />
          <SearchBar
          ref='searchBar' 
          placeholder='Find cheatmeat'
          barStyle="default"
          showsCancelButtonWhileEditing={false}
          // position = absolute
        />
        </SafeAreaView>

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 34.020755529483175,
            longitude: -118.28933010210339,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >

          <Marker
            coordinate={{ latitude: 34.04857723789541, longitude: -118.24967692396997 }}
            title='far ass whole foods'
            description='This is where to get beyond meat!'
          ></Marker >
          <Marker
            coordinate={{ latitude: 34.0292215152339, longitude: -118.2797176929372 }}
            title="nearby trader joe's"
            description='good vegan choices here!'
          ></Marker > 
          <Marker
            coordinate={{ latitude: 34.02288873697428, longitude: -118.29083217294722 }}
            title="taco bell"
            description='some vegan choices here!'
          ></Marker >          
        </MapView>
      </>
    );
  }
}
export default (props) => {
  const navigation = useNavigation();
  return (
    <Store {...props} navigation={navigation} />
  )
}