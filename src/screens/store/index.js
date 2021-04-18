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

class Store extends React.Component {
  componentDidMount() {
    this.RBSheet.open();
  }
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
            coordinate={{ latitude: 34.04857723789541, longitude: -118.24967692396997 }}
            title='far ass whole foods'
            description='This is where to get beyond meat!'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/spicon.png')} style={{ height: 35, width: 35 }} />
          </Marker >
          <Marker
            coordinate={{ latitude: 34.0292215152339, longitude: -118.2797176929372 }}
            title="nearby trader joe's"
            description='good vegan choices here!'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/bkicon.png')} style={{ height: 35, width: 35 }} />
          </Marker >
          <Marker
            coordinate={{ latitude: 34.02288873697428, longitude: -118.29083217294722 }}
            title="taco bell"
            description='some vegan choices here!'
            onPress={() => this.onMarkerPressed()}
          >
            <Image source={require('../../../assets/dogicon.png')} style={{ height: 35, width: 35 }} />
          </Marker >
        </MapView>

        {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> */}
        {/* <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} /> */}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          animationType={"slide"}
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
          <View
          // style={{alignItems: 'center'}}
          >
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
            <Image source={require('../../../assets/scrollimg.png')} style={{ height: 400, width: 390 }} />
            {/* <Image source={require('../../../assets/scrollimg.png')} 
              styles={{
                width: '50%',
                height: undefined,
                aspectRatio: 1,
              }} */}
            {/* /> */}
          </View>
          {/* <View
            style={{
              // flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 0,
              // height: StatusBar.currentHeight,
            }}>
            <SearchBar
              round
              platform={'default'}
              placeholder="Search"
              containerStyle={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
            />
          </View> */}


        </RBSheet>
        {/* </View> */}
      </>
    );
  }
}
export default (props) => {
  const navigation = useNavigation();
  return (
    <Store {...props} navigation={navigation} />
  )
}