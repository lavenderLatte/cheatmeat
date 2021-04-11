import React from 'react';
import {
  Text,
  View,
  StyleSheet 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps'


class Store extends React.Component {
  render() {
    return (
      <>
        <MapView style={{ ...StyleSheet.absoluteFillObject }}> 
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