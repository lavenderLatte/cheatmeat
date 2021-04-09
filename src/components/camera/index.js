import React, { Component } from "react";
import { TouchableOpacity, View, Image, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'
import { RNCamera } from "react-native-camera"
import RNFS from 'react-native-fs';


export const Constants = {
  ...RNCamera.Constants
}

export default class Camera extends Component {
  /**
   * Holds reference to RNCamera obj
   */
  camera = null;

  state = {
    // saving recog text here
    recognizedText: null
  }

  /**
   * Lifecycle function
   */
  // is camera showing to user?
  componentDidMount() {
    this.setState({recognizedText: null});
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { 
        quality: this.props.quality, 
        base64: true, 
        width: this.props.imageWidth, 
        doNotSave: true,
        fixOrientation: true,
        pauseAfterCapture: true
      };
      const data = await this.camera.takePictureAsync(options);
      console.log("data.uri: " + data.uri);

      // // saving as picture.png to user's device
      // let path = RNFS.DocumentDirectoryPath + '/picture.png';
      // console.log("image path= " + path);
      
      this.props.onCapture && this.props.onCapture(data.base64, this.state.recognizedText); 
    }
  };

  onTextRecognized(data) {
    if(this.props.enabledOCR) {
      console.log('onTextRecognized: ', data);
      if(data && data.textBlocks && data.textBlocks.length > 0) {
        this.setState({recognizedText: data})
      }
    }
  }

  render() {
    return(
      <View style={[styles.camera.container, this.props.style]}>
        <RNCamera
          ref={ref => {
              this.camera = ref;
          }}
          style={styles.camera.preview}
          type={Constants.Type.back}
          flashMode={Constants.FlashMode.auto}
          ratio={this.props.ratio}
          captureAudio={false}
          autoFocus={this.props.autoFocus}
          whiteBalance={this.props.WhiteBalance}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
          onTextRecognized={this.props.enabledOCR ? (data) => this.onTextRecognized(data) : undefined}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.camera.capture}>
          <Image source={require("../../../assets/cameraButton.png")} style={{width: 50, height: 50}} resizeMode={'contain'} />
        </TouchableOpacity>
        </View>

      </View>
    );
  }


}

Camera.propTypes = {
    cameraType: PropTypes.any,
    flashMode: PropTypes.any,
    autoFocus: PropTypes.any,
    whiteBalance: PropTypes.any,
    ratio: PropTypes.string,
    quality: PropTypes.number,
    imageWidth: PropTypes.number,
    style: PropTypes.object,
    onCapture: PropTypes.func,
    enabledOCR: PropTypes.bool
  };

Camera.defaultProps = {
    cameraType: Constants.Type.back,
    flashMode: Constants.FlashMode.off,
    autoFocus: Constants.AutoFocus.on,
    whiteBalance: Constants.WhiteBalance.auto,
    ratio: '4:3',
    quality: 0.5,
    imageWidth: 768,
    style: null,
    onCapture: null,
    enabledOCR: true
};

const styles = {
    camera: {
      container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'black'
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      capture: {
        flex: 0,
        //backgroundColor: '#f00',
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
      }
    },
    closeButton: {
      position: 'absolute',
      backgroundColor: '#aaaaaab0', 
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      top: Platform.OS === "ios" ? 45 : 10,
      left: 10
    },
    closeButtonIcon: {
      fontSize: Platform.OS === "ios" ? 40 : 40, 
      fontWeight: 'bold', 
      alignSelf: 'center', 
      lineHeight: Platform.OS === "ios" ? 58 : 40
    }
  };