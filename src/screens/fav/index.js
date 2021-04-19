import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';

import Helper from '../../lib/helper';
import commonStyles from '../../../commonStyles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import FavDetail from '../favDetail';
import Header from '../../components/header';



const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Farmhouse hero',
    image_url: require('../../../assets/illustration.png'),
    description: 'Earned on April 10'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Gone green',
    image_url: require('../../../assets/car.png'),
    description: 'Earned on April 10'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Grocery run',
    image_url: require('../../../assets/illustration.png'),
    description: 'Earned on April 10'

  },
];

const HISTORY_DATA = [
  {
    id: '1',
    title: 'Monty\'s Good Burger',
    date: 'Today',
    image_url: require('../../../assets/montys_store.png'),
    points: '+2 pts',
  },
  {
    id: '2',
    title: 'Monty\'s Good Burger',
    date: 'Today',
    image_url: require('../../../assets/montys_store.png'),
    points: '+2 pts',
  },
  {
    id: '3',
    title: 'Monty\'s Good Burger',
    date: 'Today',
    image_url: require('../../../assets/montys_store.png'),
    points: '+2 pts',
  },

];



class Fav extends React.Component {
  constructor(props) {
    super(props);
  }
  renderCategory = ({ item }) => (
      <View style = {styles.item}>
        <Image style={styles.categoriesPhoto} source={item.image_url} />
        <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.description} >{item.description}</Text>
      </View>

  );
  renderHistoryCategory = ({ item }) => (
      <View style= {styles.historyItem}>
        <Image style= {styles.historyImage} source={item.image_url} />
        <View style={styles.titleItem}>
        <Text>{item.date}</Text>
        <Text>{item.title}</Text>
        </View>
        <Text style={styles.points}>{item.points}</Text>
      </View>

  );
  render() {
    return (
      <>
        <SafeAreaView>
          <Header navigation={this.props.navigation} Title={'History'} isAtRoot={true} />
          <View>
            <Text style={styles.mainTitle}> 4 points </Text>
            <Text style={styles.earned}>  Earned </Text>
            <View>
              <Text style={styles.achievement}> Achievements </Text>
              <View>
                  <FlatList
                    horizontal
                    data={DATA}
                    renderItem={this.renderCategory}
                    keyExtractor={item => `${item.id}`}
                  />
                </View>
            </View>
            <View>
            <Text style={styles.achievement}> Recent history </Text>
                <FlatList
                  vertical
                  data={HISTORY_DATA}
                  renderItem={this.renderHistoryCategory}
                  keyExtractor={item => `${item.id}`}
                />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  earned: {
    color: '#333333',
    marginHorizontal: 10,
    fontSize: 15,
  },
  achievement:{
    color: '#333333',
    marginLeft: 10,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 10,
  },
  categoriesPhoto: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 20,
  },
  item: {
      width: 185,
      height: 230,
      backgroundColor: '#F1F6ED',
      borderRadius: 20,
      marginHorizontal: 10,
      marginTop:20,

  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    color: '#969ba8',
    marginTop: 4,
    textAlign: 'center',

  },
  historyItem: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  historyImage: {
    width: 45,
    height: 45,
    resizeMode: 'contain',

  },
  titleItem:{
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 5,
  },
  points: {
    marginLeft: 100,
    marginTop: 10,
  }
});


/* put fav items in FIFO */
/* stack navitor inside of fav list */
const Stack = createStackNavigator();

export default function(props) {
  const isFocused = useIsFocused();
  
  return(
    <Stack.Navigator
      initialRouteName="Fav"
      headerMode="none"
    >
      <Stack.Screen name="Fav" options={{title: 'Word List'}}>
        {props => <Fav {...props} isFocused={isFocused} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}