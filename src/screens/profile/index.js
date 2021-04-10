
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';
import commonStyles from '../../../commonStyles';

class Profile extends React.Component {
  
  render() {
    return (
      <>
        <SafeAreaView
          style={commonStyles.content}>
          <Header navigation={this.props.navigation} Title={'My Profile'} isAtRoot={true} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            
            <View style={[commonStyles.column, commonStyles.header]}>
              <Image style={commonStyles.logo} source={require('../../../assets/cat.png')} />
            </View>
            
            <View style={{minHeight: 10, maxHeight: 10}}></View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Name</Text>
              <Text>Trojan Tommy</Text>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Gender</Text>
              <Text>Male</Text>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Age</Text>
              <Text>Yong in spirit</Text>
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email Address</Text>
              <Text>trojan@usc.edu</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  fieldGroup: {
    marginTop: 5,
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold'
  },
  
});

export default (props) => {
  const navigation = useNavigation();
  return (
    <Profile {...props} navigation={navigation} />
  )
}