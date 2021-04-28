import React from 'react';
import {
  Text,
  View, SafeAreaView, FlatList, StyleSheet, StatusBar, Image,  TouchableHighlight, TouchableOpacity, Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';


const HISTORY_DATA = [
  {
    id: '1',
    title: 'Jules',
    date: 'Today',
    image_url: require('../../../assets/jules.png'),
    points: '11 pts',
  },
  {
    id: '2',
    title: 'Ashna',
    date: 'Yesterday',
    image_url: require('../../../assets/ashna.png'),
    points: '9 pts',
  },
  {
    id: '3',
    title: 'Hana',
    date: 'April  1',
    image_url: require('../../../assets/hana.png'),
    points: '8 pts',
  },
  {
    id: '4',
    title: 'Jessica',
    date: 'April  1',
    image_url: require('../../../assets/jessica.png'),
    points: '3 pts',
  },


];
class Team extends React.Component {


  renderHistoryCategory = ({ item }) => (
      <View style= {styles.historyItem}>
        <Image style= {styles.historyImage} source={item.image_url} />
        <View style={styles.titleItem}>
        <Text>{item.title}</Text>
        </View>
        <Text style={styles.points}>{item.points}</Text>
      </View>

  );
  render() {
    return (
        <SafeAreaView>
          <Text style={styles.mainTitle}> Leaderboard </Text>

         <View style={styles.image}>
            <Image style={styles.veganimage} source={require('../../../assets/list.png')}/>
            </View>

   <Image style={styles.leaderboard} source={require('../../../assets/leaderboard2.png')}/>
          {/* <View>
            <FlatList
                  vertical
                  data={HISTORY_DATA}
                  renderItem={this.renderHistoryCategory}
                  keyExtractor={item => `${item.id}`}
                />
          </View> */}
      </SafeAreaView>
    );
  }
}
export default (props) => {
  const navigation = useNavigation();
  return (
    <Team {...props} navigation={navigation} />
  )
}
const styles = StyleSheet.create({
    veganimage:{
        width: 400,
        height: 300,
        resizeMode: 'contain',
        marginBottom:  10,
    },
    image:{
                justifyContent: 'center', 
        alignItems: 'center',
    },
    competition:{
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 20,

    },
    weak:{
        fontSize: 13,
        justifyContent: 'flex-start', 
        marginLeft: 10,
        marginTop: 10,
    },
    current: {
        fontSize: 20,
    },
    challenge: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
    },
  container: {
    flex: 1,
    marginTop: 50,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
  },
  leaderboard:{
    height: 500,
    width: 390,
    resizeMode: 'contain',
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    flex:3
  },
  item: {

    flex: 1,
    margin: 10,
    justifyContent: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.2,
    borderRadius: 20,
    marginVertical: 20,
  },
  featured: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444444',
  },
  featuresBox: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  recipeIconBox: {
    flexDirection: 'row', 
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 10,

  },
  recipeIcon:{
    fontSize: 12,
    fontWeight: 'bold',
    color: '#29B289',
    marginRight:7,

  },
  description: {
    color: '#969ba8',
    marginHorizontal: 10,


  },
  historyItem: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  historyImage: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    overflow: 'hidden',

  },
  titleItem:{
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 12,
  },
  points: {
    marginTop: 10,
    textAlign: 'right',
    flex:1,
  },
title: {
    fontSize: 20,
    textAlign: 'center',
  },

});