import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  Image,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import RBSheet from "react-native-raw-bottom-sheet";
import { Assets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';


class Store extends React.Component {
  // componentDidMount() {
  //   this.RBSheet.open();
  // }
  onMarkerPressed() {
    this.RBSheet.open();
  }
  state = {
    search: '',
    imageViewType: 0,
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 34.020755529483175,
            longitude: -118.28933010210339,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >

          <Marker 
            coordinate={{ latitude: 34.022987501610416, longitude: -118.29253265962846 }}
            title='Sprouts'
            description='0.1 mi'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/spicon.png')} style={{ height: 35, width: 35 }} />
          </Marker >
          <Marker
            coordinate={{ latitude: 34.02711090119319, longitude: -118.28079531990532 }}
            title="Trader Joe's"
            description='0.1 mi'
            onPress={() => this.onMarkerPressed()} 
          >
            <Image source={require('../../../assets/traderjoes.png')} style={{ height: 35, width: 35 }} />
          </Marker >
          <Marker
            coordinate={{ latitude: 34.0292215152339, longitude: -118.2797176929372 }}
            title="Whole Foods"
            description='0.1 mi'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/whicon.png')} style={{ height: 35, width: 35 }} />
          </Marker > 
          <Marker
            coordinate={{ latitude: 34.02288873697428, longitude: -118.29083217294722 }}
            title="Taco Bell"
            description='0.1 mi'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/tacobell.png')} style={{ height: 35, width: 35 }} />
          </Marker >
          <Marker
            coordinate={{ latitude: 34.04211639729417, longitude: -118.29169582439991 }}
            title="Burger King"
            description='0.3 mi'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/bkicon.png')} style={{ height: 35, width: 35 }} />
          </Marker >
          <Marker   
            coordinate={{ latitude: 34.005125121065, longitude: -118.28019451179 }}
            title="Burger King"
            description='0.2 mi'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/bkicon.png')} style={{ height: 35, width: 35 }} />
          </Marker >
          <Marker   
            coordinate={{ latitude: 34.012145801709146, longitude: -118.29174702454186 }}
            title="Carl's Jr."  
            description='0.1 mi'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/carlsjr.png')} style={{ height: 35, width: 35 }} />
          </Marker >
        </MapView>

        {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> */}
        {/* <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} /> */}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          animationType={"fade"}
          height={500}
          openDuration={250}
          minClosingHeight={50}
          dragFromTopOnly={true}
          closeOnDragDown={true}
          customStyles={{
            container: {
              // justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              draggableIcon: {
                backgroundColor: "#fff"
              }
            }
          }}
        >

          <View>
            <SearchBar
              platform={'default'}
              containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderRadius: 5 }}
              inputStyle={{ backgroundColor: 'transparent' }} q

              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              lightTheme={true}
              round={true}
            />

            <View style={styles.fixToText}>
              <Button
                title="Filters (0)"
                onPress={() => this.setState({imageViewType: 1})}
              />
              <Button
                title="Discounts"
                onPress={() => this.setState({imageViewType: 2})}
              />
              {/* <Button
                title="Trending"
              /> */}
            </View>
            {(this.state.imageViewType == 0) && (
              <Image source={require('../../../assets/bottomdrawerimg.png')} style={{ height: 300, width: 350 }} />
            )}
            {(this.state.imageViewType == 1) && (
              <ScrollView>
                <Image source={require('../../../assets/filter.png')} />
              </ScrollView>
            )}
            {(this.state.imageViewType == 2) && (
              <ScrollView>
                <Image source={require('../../../assets/montypopup.png')} style={styles.montypopup} />
              </ScrollView>
              )}
          </View>
        </RBSheet>
      </>
    );
  }
}

const styles = StyleSheet.create({
  montypopup:{
    width: 400,
    height: 420,

  },
  filtermodal:{
     width: 400,
        height: 200,
        resizeMode: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});

export default (props) => {
  const navigation = useNavigation();
  return (
    <Store {...props} navigation={navigation} />
  )
}