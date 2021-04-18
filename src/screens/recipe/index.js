import React from 'react';
import {
  Text,
  View, SafeAreaView, FlatList, StyleSheet, StatusBar, Image,  TouchableHighlight
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Vegetarian Breakfast Taco',
    image_url: 'https://images.media-allrecipes.com/userphotos/7749385.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Vegan Spaghetti and Beyond Meatballs',
    image_url: 'https://images.media-allrecipes.com/userphotos/9096815.jpg',

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Protein Packed Vegetarian Chili',
    image_url: 'https://images.media-allrecipes.com/userphotos/7349506.jpg',

  },
];
 
// const Item = ({ title }) => (
//  <View style={styles.item}>
//     <Image style={styles.categoriesPhoto} source={image_url} />
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );




class Recipe extends React.Component {
  // render() {
  //   return (
  //       <>
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "center",
  //           alignItems: "center"
  //         }}>
  //         <Text> Implement recipe screen here. </Text>
  //       </View>
  //       </>
  // //      ); }
  // renderItem = ({ item }) => (
  //   <Item title={item.title} />
  // );

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style = {styles.item}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.image_url }} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
          </TouchableHighlight>

  );
  render() {
    return (
        <SafeAreaView>
          <Header navigation={this.props.navigation} Title={'Recipes'} isAtRoot={true} />
          <View>
          </View>


      <View>
        <FlatList
          data={DATA}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
      </SafeAreaView>
    );
  }
}
export default (props) => {
  const navigation = useNavigation();
  return (
    <Recipe {...props} navigation={navigation} />
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
    // padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 16,
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.2,
    borderRadius: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    flex:1
  },
});