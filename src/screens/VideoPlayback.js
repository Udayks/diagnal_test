import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import StaticVariables from "../common/StaticVariables";
import AndroidBackHandler from "../handler/AndroidBackHandler";

// Get device dimensions
const DeviceHeight = Dimensions.get('window').height;
const DeviceWidth = Dimensions.get('window').width;

class VideoPlayback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        AndroidBackHandler.watchBackHandler(StaticVariables.PAGE_VIDEO_PLAYBACK, this.props.navigation);
    }

    // If playback error occurs
    videoError = () => {
        this.props.navigation.goBack();
    }

    componentWillUnmount() {
        AndroidBackHandler.watchBackHandler(StaticVariables.PAGE_MOVIE_LIST, this.props.navigation);
    }

    render() {
        return (
            <View style={styles.outerContainer}>
                <Video source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}     // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}
                    fullscreenOrientation='landscape'
                    fullscreenAutorotate={true}
                    controls={true}                                   // Store reference
                    onError={this.videoError}
                    style={styles.backgroundVideo} />

            </View>
        );
    }
}

export default VideoPlayback;

//Style
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});