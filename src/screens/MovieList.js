import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import EventEmitter from 'EventEmitter';
import { connect } from 'react-redux';
import { saveContent } from '../redux/actions/content';
import StaticVariables from "../common/StaticVariables";
import ScreenHandler from "../handler/ScreenHandler";
import AndroidBackHandler from "../handler/AndroidBackHandler";
import SearchBarComponent from "../components/SearchBarComponent";
import MovieBox from "../components/MovieBox";
import * as ApiData2 from "../services/PAGEAPI-PAGE2.json";
import * as ApiData3 from "../services/PAGEAPI-PAGE3.json";

class MovieList extends React.Component {

    static contentEvent = new EventEmitter();

    constructor(props) {
        super(props);
        this.state = {
            showSearchBar: false,
            scrollCount: 1,
        }
    }

    componentDidMount() {
        AndroidBackHandler.watchBackHandler(StaticVariables.PAGE_MOVIE_LIST, this.props.navigation);
        MovieList.contentEvent.addListener(
            StaticVariables.ADD_CONTENT,
            (message) => this.handleChange(message)
        );
    }

    // Handle event changes
    handleChange = (data) => {
        this.setState({
            showSearchBar: !this.state.showSearchBar
        });
    }

    // Load more content on scrolling
    handleLoadMore = () => {
        if ((this.props.content.length < Number(ApiData2.page.total_content_items)) && (ScreenHandler.searchKey == StaticVariables.EMPTY_STRING)) {
            let content = [];
            if (this.state.scrollCount == 1) {
                content = [...this.props.content, ...ApiData2.page.content_items.content];
            } else if (this.state.scrollCount == 2) {
                content = [...this.props.content, ...ApiData3.page.content_items.content];
            }

            this.setState({
                scrollCount: this.state.scrollCount + 1
            });
            this.props.saveContent(content);
        }
    }

    // Select a movie
    selectMovie = () => {
        this.props.navigation.navigate(StaticVariables.PAGE_VIDEO_PLAYBACK);
    }

    render() {
        return (
            <View style={styles.outerContainer}>
                {this.state.showSearchBar ? <View style={{ flex: 1 }}>
                    <SearchBarComponent
                    />
                </View> : null}
                <View style={{ flex: 8 }}>
                    <FlatList
                        data={this.props.content}
                        numColumns={3}
                        renderItem={({ item, index }) => (
                            <MovieBox list={item}
                                selectMovie={this.selectMovie}
                            />
                        )}
                        ref="flatList"
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={1}
                        onEndReached={this.handleLoadMore}
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        removeClippedSubviews={true}
                        getItemLayout={(item, index) => (
                            { length: 210, offset: 210 * index, index }
                        )}
                        ListFooterComponent={() => { // replaces renderFooter={() => {
                            return (
                                this.props.content < 0 &&
                                <View style={{ flex: 1, padding: 10 }}>
                                    <ActivityIndicator size="small" />
                                </View>
                            );
                        }}
                    />
                </View>

            </View>
        );
    }
}

// Connect to redux
const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);

// Style
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a'
    },
});