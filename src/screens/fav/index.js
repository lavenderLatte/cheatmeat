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
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
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
import Modal from 'react-native-modal';

import Team from '../team';


const DATA = [
  {
    id: '1',
    title: 'Farmhouse hero',
    image_url: require('../../../assets/illustration.png'),
    description: 'Earned on April 10',
    popuptext: 'You recently opted for a plant-based burger over a meat patty. That\'s like saving 50 cows from the slaughterhouse!',
  },
  {
    id: '2',
    title: 'Carbon Offset',
    image_url: require('../../../assets/tree.png'),
    description: 'Earned on March 30',
    popuptext: 'You\'ve planted 1 tree by opting in to offset your carbon footprint. Congratulations!',


  },
  {
    id: '3',
    title: 'Grocery run',
    image_url: require('../../../assets/grocery.png'),
    description: 'Earned on March 19',
    popuptext: 'Your last month\'s grocery haul had limited platic use. Congratulations!',

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
    title: 'Sprouts Farmer\'s Market',
    date: 'Yesterday',
    image_url: require('../../../assets/sprouts-store.png'),
    points: '+2 pts',
  },
  {
    id: '3',
    title: 'Belcampo Meat Co.',
    date: 'April  1',
    image_url: require('../../../assets/belcampo-store.png'),
    points: '+1 pt',
  },

];



class Fav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isModalVisible:false};

  }

  openModal = () =>{
    this.setState({
    isModalVisible:true
    })
  }
  closeModal = () =>{
    this.setState({
    isModalVisible:false
    })
  }

  gotoTeams = () => {
  this.props.navigation.navigate("Team");
      };
  renderCategory = ({ item }) => (
    <TouchableOpacity onPress={()=>this.openModal()}>

      <View style = {styles.item}>
        <Image style={styles.categoriesPhoto} source={item.image_url} />
        <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.description} >{item.description}</Text>
      </View>
        <Modal isVisible={this.state.isModalVisible} 
            onBackdropPress={()=>this.closeModal()} 
            onSwipeComplete={()=>this.closeModal()}>
            <View style={styles.popup}>
              <Image style={styles.popupPhoto}
              source={item.image_url}/>     
              <Text style={styles.popUpDate} >{item.description}</Text>
              <Text style={styles.description} >{item.popuptext}</Text>
            </View> 
        </Modal>
    </TouchableOpacity>

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
          {/* <Header navigation={this.props.navigation} Title={'History'} isAtRoot={true} /> */}
          <View>
                      <ScrollView>

            <Text style={styles.mainTitle}> 4 points </Text>
            <Text style={styles.earned}>  EARNED </Text>
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

            <TouchableOpacity onPress={()=>this.gotoTeams()}>
             <View>
              <Text style={styles.achievement}>This week's winners </Text>
              <Image style={styles.leadershipimage} source={require('../../../assets/leadership.png')} />
            </View>
            </TouchableOpacity>

            <View>
            <Text style={styles.achievement}> Recent history </Text>
                <FlatList
                  vertical
                  data={HISTORY_DATA}
                  renderItem={this.renderHistoryCategory}
                  keyExtractor={item => `${item.id}`}
                />
            </View>

            {/* <TouchableOpacity onPress={()=>this.gotoTeams()}>
              <View style={styles.teamButton} onPress={() => Alert.alert('Simple Button pressed')}> 
              <Text style={styles.textbtn}> View team board </Text>
              <Text style={styles.arrow}> >> </Text>
              </View>
            </TouchableOpacity> */}
          </ScrollView>

          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  leadershipimage:{
    width: 400,
    height: 180,
    resizeMode: 'contain',
  },
  teamButton:{
    backgroundColor: '#F1F6ED',
    color: '#F1F6ED',
    width: 400,
    height: 50,
    alignItems: 'center',

    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 20,
    flexDirection: 'row',
  },
  textbtn:{
    fontSize: 14,
  },
  arrow:{
    fontSize: 10,
    marginTop: 1,
  },
  popup:{
    width: 290,
    height: 350,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    borderRadius: 20,
    padding: 5,
  },
  popupPhoto:{ 
    width: 150,
    height: 150,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

  },
  popUpDate:{
    color: '#969ba8',
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 10,
  },
  earned: {
    color: '#333333',
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
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
    marginTop: 10,
    textAlign: 'right',
    flex:1,
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
            <Stack.Screen name="Team" >
        {props => <Team {...props} isFocused={isFocused} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}