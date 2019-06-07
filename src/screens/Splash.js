import React, { Component } from 'react';
import { Modal, StyleSheet, Dimensions, ImageBackground, View, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';
import { saveContent } from '../redux/actions/content';
import * as ApiData1 from "../services/PAGEAPI-PAGE1.json";
import StaticVariables from "../common/StaticVariables";
import NetworkProvider from "../services/NetworkProvider";

// Get device dimensions
const DeviceHeight = Dimensions.get('window').height;
const DeviceWidth = Dimensions.get('window').width;

// Set Background image
class BackgroundImage extends Component {

    render() {
        return (
            <ImageBackground source={require('../assets/images/splash_background.png')}
                style={styles.backgroundImage}>
                {this.props.children}
            </ImageBackground>
        )
    }
}

// Splash screen model
class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            condition: true,
        };
    }

    componentDidMount() {
        this.checkNetwork();
        this.setData();
    }

    // Check network
    checkNetwork() {
        NetInfo.isConnected.fetch().then(isConnected => {
            NetworkProvider.connected = isConnected;
            if (isConnected) {
                this.hidesplash(StaticVariables.PAGE_MOVIE_LIST, 4000, StaticVariables.PAGE_NAME_MOVIE_LIST);
            } else {
                setTimeout(() => {
                    Alert.alert(
                        'No Network ',
                        'Please connect to network',
                        [
                            { text: 'Refresh', onPress: () => this.checkNetwork(), style: 'cancel' },
                        ],
                        { cancelable: false }
                    )
                }, 30);
            }
        });
    }

    // Hide splash Screen
    hidesplash(page, time, name) {
        setTimeout(() => {
            this.props.navigation.navigate(page, { pageName: name });
        }, 1000);
        setTimeout(() => {
            NetworkProvider.subscribeNetwork();
            this.setState({ condition: false });
        }, time);
    }

    // Set initial data
    setData() {
        this.props.saveContent(ApiData1.page.content_items.content)
    }

    render() {
        return (
            <Modal
                animationType="fade"
                visible={this.state.condition}
                style={[styles.modelcontainer]}
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}
                presentationStyle="fullScreen">
                <BackgroundImage>
                    <View style={[styles.mainLogo]}>
                        {/* <Text style={[styles.label]}></Text> */}
                    </View>
                </BackgroundImage>
            </Modal>
        );
    }
}

// Connect to redux
const mapStateToProps = (state) => {
    return {
        content: state.content.contentList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveContent: (contentList) => {
            dispatch(saveContent(contentList))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);

// Styles
var styles = StyleSheet.create({
    modelcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: 'relative',
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        alignItems: 'center',
    },

    logoImage: {
        width: DeviceHeight / 2,
        height: DeviceHeight / 2,
        alignItems: 'center',
        //    alignContent: 'center'
    },
    mainLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: DeviceHeight / 4
    },
    label: {
        textAlign: 'center',
        fontSize: DeviceWidth / 8,
        fontWeight: '500',
    }
});