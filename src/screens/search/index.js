import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  SectionList,
  ListItem,
  StyleSheet,
  FlatList,TouchableHighlight, Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Api from '../../lib/api';
import Helper from '../../lib/helper';
import WordDefinition from '../../components/wordDef';
import Header from '../../components/header';
import commonStyles from '../../../commonStyles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';



const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Monty\'s Good Burger',
    image_url: require('../../../assets/montys.png'),
    description: 'Vegan diner food & 12 burgers!'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chronic Taco',
    image_url: require('../../../assets/chronictaco.png'),
    description: 'Fast casual Mexican grill with vegan options'


  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'WahlBurgers',
    image_url: require('../../../assets/wahlburgers-2.jpg'),
    description: 'Vegan diner food & 12 burgers!'


  },
];



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userWord: '', errorMsg: '', loading: false, definition: null};
  }
  
  renderCategory = ({ item }) => (

      <View style = {styles.item}>
        <Image style={styles.categoriesPhoto} source={item.image_url} />
        <Text style={styles.discountText}> DISCOUNTS </Text>
        <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.description} >{item.description}</Text>
      </View>

  );

  render() {
    return (
      <>  
        <SafeAreaView>
          <Header navigation={this.props.navigation} Title={'Home'} isAtRoot={true} />
          <View>
            <Text style={styles.mainTitle}> Good morning, {"\n"} Dane! </Text>
            <View > 
            <Image style={styles.mainImage} source={require('../../../assets/progress-high.png')} /> 
            </View>
            <View style={styles.featuresBox}>
              <Icon name='fire' style={{color: '#9EA3B0' }} size={20} />
              <Text style={styles.featured}> Featured for you </Text>
            </View>
              <View>
                <FlatList
                  horizontal
                  data={DATA}
                  renderItem={this.renderCategory}
                  keyExtractor={item => `${item.id}`}
                />
              </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default (props) => {
  const navigation = useNavigation();
  return (
    <Search {...props} navigation={navigation} />
    // <ScannerScreen  {...props} navigation={navigation} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
    elevation: 3,
    flex:3
  },
  item: {
      padding: 5,
      width: 185,
      height: 270,
      backgroundColor: '#FFFFFF',
      // box-shadow: 0px 0px 15px rgba(158, 163, 176, 0.25),
      borderRadius: 20,
      flex: 0,
      marginHorizontal: 10,
      marginTop:20,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    flex: 1,
  },
  discountText: {
    marginTop: 10,
    backgroundColor: 'rgba(212, 216, 227, 0.3)',
    borderRadius: 4,
    alignSelf: 'flex-start',
    fontSize: 10,
    color: '#444444',
    fontWeight: 'bold',
    padding: 5,
    
  },
  description: {
    color: '#969ba8',
    marginTop: 4,
  },
  featured: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9EA3B0',
  },
  featuresBox: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 10,
  },
  mainImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:5,
    width: 400,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 5,

  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 10,


  }
});