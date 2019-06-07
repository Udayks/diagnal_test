/**
 * Sample React Native App © Udayan K S
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import StaticVariables from "./src/common/StaticVariables";
import AndroidBackHandler from "./src/handler/AndroidBackHandler";
import Splash from './src/screens/Splash';
import MovieList from './src/screens/MovieList';
import VideoPlayback from './src/screens/VideoPlayback';


// Root Navigation
const RootStack = createStackNavigator({
  Splash: { screen: Splash, navigationOptions: { header: null } },
  MovieList: { screen: MovieList },
  VideoPlayback: { screen: VideoPlayback, navigationOptions: { header: null } },
}, {
    initialRouteName: StaticVariables.PAGE_SPLASH,
    defaultNavigationOptions: ({ navigation, state }) => {
      return {
        headerStyle: {
          backgroundColor: '#000000',
          color: 'white',
        },
        headerTintColor: '#fff',
        headerTitle: navigation.getParam('pageName', 'NO-ID'),
        headerBackTitle: null,
        gesturesEnabled: false,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          width: '90%',
        },
        headerLeft: <TouchableOpacity onPress={() => AndroidBackHandler.exitApp()}>
          <Image
            source={require('./src/assets/images/Back.png')}
            style={{ width: 18, height: 18, marginRight: 0, marginLeft: 15 }}
          />
        </TouchableOpacity>,
        headerRight: <TouchableOpacity onPress={() => logOutConfirmation()}>
          <Image
            source={require('./src/assets/images/search.png')}
            style={{ width: 25, height: 25, marginRight: 15, marginLeft: 0 }}
          />
        </TouchableOpacity>
      }
    }
  });

const RootContainer = createAppContainer(RootStack);

// Logout confirmation
function logOutConfirmation() {
  MovieList.contentEvent.emit(StaticVariables.ADD_CONTENT, { message: StaticVariables.INITIAL_CONTENT });
}

export default class App extends Component {
  render() {
    return (
      <RootContainer />
    );
  }
}

