import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { saveContent } from '../redux/actions/content';
import StaticVariables from "../common/StaticVariables";
import ScreenHandler from "../handler/ScreenHandler";
import * as ApiData1 from "../services/PAGEAPI-PAGE1.json";
import * as ApiData2 from "../services/PAGEAPI-PAGE2.json";
import * as ApiData3 from "../services/PAGEAPI-PAGE3.json";

// Get device dimensions
const DeviceHeight = Dimensions.get('window').height;
const DeviceWidth = Dimensions.get('window').width;

// Searchbar component
class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSearchBar: true,
            searchKey: StaticVariables.EMPTY_STRING,
            content: StaticVariables.EMPTY_ARRAY
        }
    }

    componentDidMount() {
        this.setData();
    }

    // Set initial data
    setData() {
        let content = [];
        content = [...content, ...ApiData1.page.content_items.content];
        content = [...content, ...ApiData2.page.content_items.content];
        content = [...content, ...ApiData3.page.content_items.content];
        this.setState({
            content: content
        });
    }

    // Update search component
    updateSearch = search => {
        let tempArray = [];
        let searchArray = this.state.content;
        tempArray = searchArray.filter(function (el) {
            return el.name.toLowerCase().includes(search.toLowerCase());
        });
        ScreenHandler.searchKey = search;
        this.setState({ searchKey: search });
        this.props.saveContent(tempArray);
    };

    render() {
        return (
            <View style={styles.outerContainer}>
                <SearchBar
                    placeholder="Type Here..."
                    containerStyle={{ width: DeviceWidth }}
                    inputStyle={styles.searchInput}
                    onChangeText={this.updateSearch}
                    value={this.state.searchKey}
                />
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);

// Style
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        fontSize: DeviceWidth / 30,
        color: 'white'
    },
});