import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


class Store extends React.Component {
  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text> Implement store screen here. </Text>
        </View>
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