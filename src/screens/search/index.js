// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   TextInput,
//   Button,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// import Api from '../../lib/api';
// import Helper from '../../lib/helper';
// import WordDefinition from '../../components/wordDef';
// import Header from '../../components/header';
// import commonStyles from '../../../commonStyles';

// class Search extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {userWord: '', errorMsg: '', loading: false, definition: null};
//   }

//   onUserWordChange(text) {
//     this.setState({userWord: text});
//   }

//   async onSearch() {
//     if(this.state.userWord.length <= 0) {
//       this.setState({errorMsg: 'Please specify the word to lookup.'})
//       return;
//     }

//     try {
//       this.setState({loading: true});
//       let lemmas = await Api.getLemmas(this.state.userWord);
//       console.log('Lemmas: ', lemmas);
//       if(lemmas.success) {
//         let headWord = Helper.carefullyGetValue(lemmas, ['payload', 'results', '0', 'lexicalEntries', '0', 'inflectionOf', '0', 'id'], '');
//         console.log('Headword is: ', headWord);
//         if(headWord.length > 0) {
//           let wordDefinition = await Api.getDefinition(headWord);
//           if(wordDefinition.success) {
//             this.setState({errorMsg: '', loading: false, definition: wordDefinition.payload});
//             console.log('Word Definition: ', wordDefinition.payload);
//           }
//           else {
//             this.setState({errorMsg: 'Unable to get result from Oxford: ' + wordDefinition.message, loading: false, definition: null});
//           }
//         }
//         else {
//           this.setState({errorMsg: 'Invalid word. Please specify a valid word.', loading: false, definition: null});
//         }
//       }
//       else {
//         this.setState({errorMsg: 'Unable to get result from Oxford: ' + lemmas.message, loading: false, definition: null});
//       }
//     } catch (error) {
//       console.log('Error: ', error);
//       this.setState({loading: false, errorMsg: error.message, definition: null});
//     }
//   }

//   render() {
//     return (
//       <>
//         <SafeAreaView
//           style={commonStyles.content}>
//           <Header navigation={this.props.navigation} Title={'CheatMeat'} isAtRoot={true} />
//           <ScrollView
//             contentInsetAdjustmentBehavior="automatic"
//           >
            
//             <View style={[commonStyles.column, commonStyles.header]}>
//               <Image style={commonStyles.logo} source={require('../../../assets/cat.png')} />
//               <Text style={commonStyles.sectionTitle}>Picky Eater </Text>
//             </View>
            
//             <TextInput
//               style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 4, paddingRight: 4 }}
//               onChangeText={text => this.onUserWordChange(text)}
//               placeholder={'Key in the word to search'}
//               value={this.state.userWord}
//             />

//             <View style={{minHeight: 10, maxHeight: 10}}></View>

//             <Button
//               title="Search"
//               onPress={() => this.onSearch()}
//             />

//             {
//               this.state.errorMsg.length > 0 &&
//               <Text style={commonStyles.errMsg}>{this.state.errorMsg}</Text>
//             }

//             {/* Display word definition as custom component */}
//             <WordDefinition def={this.state.definition} />
//           </ScrollView>
//         </SafeAreaView>
//         {
//           this.state.loading &&
//           <ActivityIndicator style={commonStyles.loading} size="large" color={'#219bd9'} />
//         }
//       </>
//     );
//   }
// }

// export default (props) => {
//   const navigation = useNavigation();
//   return (
//     <Search {...props} navigation={navigation} />
//   )
// }

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
  FlatList
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
            <View style={styles.mainImage}> 
            <Image source={require('../../../assets/progress.png')} /> 
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
    // backgroundColor: '#FFFEF2',
    // // padding: 10,
    // // marginVertical: 8,
    // // marginHorizontal: 16,
    // flex: 1,
    // margin: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 215,
    // borderColor: '#cccccc',
    // borderWidth: 0.2,
    // borderRadius: 20,
    // marginVertical: 20,
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
    marginTop:20,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 10,
  }
});