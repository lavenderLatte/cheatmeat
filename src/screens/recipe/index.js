import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


class Recipe extends React.Component {
  render() {
    return (
        <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text> Implement recipe screen here. </Text>
        </View>
        </>
       ); }
}
export default (props) => {
  const navigation = useNavigation();
  return (
    <Recipe {...props} navigation={navigation} />
  )
}