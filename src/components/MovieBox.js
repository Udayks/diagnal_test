import React from 'react';
import { Text, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';

// Get device dimensions
const DeviceHeight = Dimensions.get('window').height;
const DeviceWidth = Dimensions.get('window').width;

// Movie Box component
class MovieBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    // Poster Display
    imageSelection = () => {
        switch (this.props.list.poster_image) {
            case "poster1.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster1.jpg")} resizeMode="contain" />;
            case "poster2.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster2.jpg")} resizeMode="contain" />;
            case "poster3.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster3.jpg")} resizeMode="contain" />;
            case "poster4.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster4.jpg")} resizeMode="contain" />;
            case "poster5.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster5.jpg")} resizeMode="contain" />;
            case "poster6.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster6.jpg")} resizeMode="contain" />;
            case "poster7.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster7.jpg")} resizeMode="contain" />;
            case "poster8.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster8.jpg")} resizeMode="contain" />;
            case "poster9.jpg":
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/poster9.jpg")} resizeMode="contain" />;
            default:
                return <Image
                    style={styles.imageWindow}
                    source={require("../assets/images/placeholder_for_missing_posters.png")} resizeMode="contain" />;
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.outerContainer} onPress={() => this.props.selectMovie()}>
                {this.imageSelection()}
                <Text style={styles.infoText} numberOfLines={1}>{this.props.list.name}</Text>
            </TouchableOpacity>
        );
    }
}

export default MovieBox;

// Style
const styles = StyleSheet.create({
    outerContainer: {
        width: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a'
    },
    imageWindow: {
        width: DeviceWidth / 3.3,
        height: DeviceHeight / 3.3
    },
    infoText: {
        fontSize: DeviceWidth / 25,
        color: 'white'
    },
});