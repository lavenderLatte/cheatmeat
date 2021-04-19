import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Button,
    Image
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Camera, {Constants} from '../../components/camera';
import commonStyles from '../../../commonStyles';

class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = { wordList: null, viewType: 0};
        console.log('scan screen started... ');
    }
    componentDidMount() {
        this.setState({viewType: 0});
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
            viewType: 1,
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




    render() {
        return (
            <>
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
                {(this.state.viewType == 1) && (
                    <SafeAreaView style={commonStyles.content}>
                        <ScrollView contentInsetAdjustmentBehavior="automatic">
                            <View style={styles.wordList}>{this.populateWords()}</View>

                            <Button
                                title="Retake"
                                onPress={() => {
                                    this.setState({ viewType: 0 });
                                }}
                            />
                            <Button
                                title="Submit"
                                onPress={() => {
                                    this.setState({ viewType: 2});
                                    // this.setState({ showCamera: true, showWordList: false });
                                    <Image source={require('../../../assets/point.png')} style={{ height: 300, width: 350 }} />
                                }}
                            />
                        </ScrollView>
                    </SafeAreaView>
                )}
                {(this.state.viewType == 2) && (
                    <SafeAreaView style={commonStyles.content}>
                        <ScrollView contentInsetAdjustmentBehavior="automatic">
                            <View> 
                                <Image source={require('../../../assets/point.png')} style={{ height: 500, width: 400,}} />
                            </View>                            
                        </ScrollView>
                    </SafeAreaView>
                )}


            </>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
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
});


export default function (props) {
    const isFocused = useIsFocused();
    return (
        <Scan {...props} isFocused={isFocused} /> // isFocused --> isSelected
    )
}

