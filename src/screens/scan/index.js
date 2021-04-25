import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Button,
    Image,
    Modal,
    TouchableOpacity,
    Pressable
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Camera, { Constants } from '../../components/camera';
import commonStyles from '../../../commonStyles';

class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = { wordList: null, viewType: 0,  isModalVisible: false};
        console.log('scan screen started... ');
    }
    componentDidMount() {
        this.setState({ viewType: 0 });
    }

    createWordList(wordBlock) {
        let wordList = [];
        // Break down all the words detected by the camera
        if (
            wordBlock &&
            wordBlock.textBlocks &&
            wordBlock.textBlocks.length > 0
        ) {
            for (let idx = 0; idx < wordBlock.textBlocks.length; idx++) {
                let text = wordBlock.textBlocks[idx].value;
                console.log('idx = ' + idx);
                console.log('text = ' + text);
                if (text && text.trim().length > 0) {
                    let words = text.split(/[\s,.?]+/);
                    if (words && words.length > 0) {
                        for (let idx2 = 0; idx2 < words.length; idx2++) {
                            if (words[idx2].length > 0) wordList.push(words[idx2]);
                        }
                    }
                }
            }
            this.setState({ wordList: wordList });
        }
    }

    onOCRCapture(recogonizedText) {
        console.log('onCapture', recogonizedText);
        this.setState({
            viewType: 1
        });
        this.createWordList(recogonizedText);
    }

    populateWords() {
        const wordViews = [];

        if (this.state.wordList === null || this.state.wordList.length === 0) {
            console.log('word list is either null or empty');
            wordViews.push(<Text style={styles.word}> Word list is empty.</Text>);
            return wordViews;
        }
        for (let idx = 0; idx < this.state.wordList.length; idx++) {
            wordViews.push(
                <Text style={styles.word}> {this.state.wordList[idx]} </Text>,
            );
        }
        return wordViews;
    }

    openModal = () => {
        this.setState({
            isModalVisible: true
        })
    }
    closeModal = () => {
        this.setState({
            isModalVisible: false,
            viewType: 1
        })
    }

    render() {
        const { isModalVisible } = this.state;
        console.log("isModalVisible = " + isModalVisible);
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    backdropOpacity={0.40}
                    visible={isModalVisible}
                    onBackdropPress={() => this.closeModal()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image source={require('../../../assets/point.png')} />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.closeModal()}
                            >
                                <Text style={styles.textStyle}>Go Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* viewType == 0: enable camera  */}
                {(this.state.viewType == 0) && (
                    <View style={styles.container}>
                        <Camera
                            cameraType={Constants.Type.back}
                            flashMode={Constants.FlashMode.auto}
                            autoFocus={Constants.AutoFocus.on}
                            whiteBalance={Constants.WhiteBalance.auto}
                            ratio={'4:3'}
                            quality={0.5}
                            imageWidth={800}
                            enabledOCR={true}
                            onCapture={(_, recogonizedText) =>
                                this.onOCRCapture(recogonizedText)
                            }
                        />
                    </View>
                )}
                {/* viewType == 1: show summary of receipt & button for retake or view reward pt */}
                {(this.state.viewType == 1) && (
                    
                    <SafeAreaView style={commonStyles.content}>
                        <View style={styles.wordList}>{this.populateWords()}</View>
                        <View>
                            <Image source={require('../../../assets/receiptsummary.png')} style={styles.receiptSummary} />
                        </View>

                        <View style={styles.fixToText}>
                            <Button
                                title="    Retake"
                                onPress={() => {
                                    this.setState({ viewType: 0 });
                                }}
                            />
                            <Button
                                title="View My Reward    "
                                onPress={() => {
                                    this.setState({ viewType: 1, isModalVisible: true });
                                }}
                            >
                            </Button>
                        </View>
                    </SafeAreaView>
                    
                )}
            </>
        );
    }
}


const styles = StyleSheet.create({
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
    popup: {
        flex:0
    },
    barcodeImage: {
        width: 350,
        height: 200,
        resizeMode: 'contain',
        justifyContent: 'center',
    
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // button: {
    //     alignItems: 'center',
    //     backgroundColor: '#DDDDDD',
    //     padding: 10,
    //     marginBottom: 10,
    // },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
    
    closeButtonIcon: {
        fontSize: Platform.OS === 'ios' ? 40 : 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        lineHeight: Platform.OS === 'ios' ? 58 : 40,
    },
    wordList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
    },
    receiptSummary: {
        height: 400,
        width: 350,
        alignSelf: 'center',
        marginTop: 260,
        // justifyContent: 'space-evenly',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

});


export default function (props) {
    const isFocused = useIsFocused();
    return (
        <Scan {...props} isFocused={isFocused} /> // isFocused --> isSelected
    )
}

