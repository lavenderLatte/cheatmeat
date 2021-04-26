import React from 'react';
import {
  Text,
  View, SafeAreaView, FlatList, StyleSheet, StatusBar, Image,  TouchableHighlight, TouchableOpacity, Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';


const DATA = [
  {
    id: '1',
    title: 'Impossible Kofta Meatloaf',
    image_url: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_1460,h_1825/k%2FPhoto%2FRecipes%2F2020-01-impossible-meatloaf%2F2020_alternativemeats_impossiblemeatloaf2_196_Crop1',
    description: 'Delicious kofta-inspired meatloaf to pair with salads',
    url:   'https://www.thekitchn.com/impossible-kofta-meatloaf-22988254',
    time: '1h20m',
    likes: '56',

  },
  {
    id: '2',
    title: 'Vegetarian Bolognese',
    image_url: 'https://thecookreport.co.uk/wp-content/uploads/2019/06/Vegetarian-Spaghetti-Bolognese-5.jpg',
    description: 'Traditional bolognese with a rich vegetarian sauce',
    url:   'https://www.cookinglight.com/recipes/vegetarian-bolognese',
    time: '2h',
    likes: '41',

  },
  {
    id: '3',
    title: 'Impossible Street Tacos',
    image_url: 'https://res.cloudinary.com/dlvhhibcv/image/fetch/f_auto,w_2880/https://images.ctfassets.net/hhv516v5f7sj/64JlXlOvlLZ2j3mObrVr9/a15defb20aed27983792291a32b8610c/IMPOSSIBLE__STREET_TACOS_.jpeg?width=2880',
    description: 'Bite-size street tacos',
    url:   'https://impossiblefoods.com/recipes/impossible-street-tacos',
    time: '40m',
    likes: '40',

  },
  {
    id: '4',
    title: 'Vegan Spaghetti and Beyond Meatballs',
    image_url: 'https://images.media-allrecipes.com/userphotos/7729239.jpg',
    description: 'Plant-based meatballs with a slow-simmered tomato sauce',
    url:   'https://www.allrecipes.com/recipe/278805/vegan-spaghetti-and-beyond-meatballs/',
    time: '55m',
    likes: '33',

  },
  {
    id: '5',
    title: 'Protein Packed Vegetarian Chili',
    image_url: 'https://www.twopeasandtheirpod.com/wp-content/uploads/2012/01/quinoa-chili1.jpg',
    description: 'Faux chili made in an Instant Pot',
    url:   'https://www.allrecipes.com/recipe/277456/instant-pot-protein-packed-vegetarian-chili/',
    time: '35m',
    likes: '30',

  },
];
 
class Recipe extends React.Component {


  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => {  Linking.openURL(item.url);}}>
      <View style = {styles.item}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.image_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} >{item.description} </Text>

        <View style={styles.recipeIconBox}>
              <AntDesignIcon name='clockcircle' style={{color: '#29B289' }} size={10} />
              <Text style={styles.recipeIcon}> {item.time} </Text>
              <AntDesignIcon name='heart' style={{color: '#29B289' }} size={10} />
              <Text style={styles.recipeIcon}> {item.likes} </Text>

        </View>
      </View>
    </TouchableHighlight>

  );
  render() {
    return (
        <SafeAreaView>
          <Header navigation={this.props.navigation} Title={'Recipes'} isAtRoot={true} />
        
          <View style={styles.featuresBox}>
              <Icon name='fire' style={{color: '#444444' }} size={20} />
              <Text style={styles.featured}> Popular </Text>
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
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.2,
    borderRadius: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 10,
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

});