import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import RBSheet from "react-native-raw-bottom-sheet";
import { Assets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';


class Store extends React.Component {
  // componentDidMount() {
  //   this.RBSheet.open();
  // }
  onMarkerPressed() {
    this.RBSheet.open();
  }
  state = {
    search: '',
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
          {/* add more pin & modify icon */}

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
          {/* <SearchBar
            ref='searchBar'
            placeholder='Find cheatmeat'
            barStyle="default"
            showsCancelButtonWhileEditing={false}
          // position = absolute
          /> */}
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
                onPress={() => Alert.alert('Left button pressed')}
              />
              <Button
                title="Discounts"
                onPress={() => Alert.alert('Middle button pressed')}
              />
              <Button
                title="Trending"
                onPress={() => Alert.alert('Right button pressed')}
              />
            </View>
            <Image source={require('../../../assets/bottomdrawerimg.png')} style={{ height: 300, width: 350 }} />
          </View>
        </RBSheet>
      </>
    );
  }
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default (props) => {
  const navigation = useNavigation();
  return (
    <Store {...props} navigation={navigation} />
  )
}