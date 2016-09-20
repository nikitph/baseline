/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import * as atb from 'react-native-animatable';


var styl = require('./style');
var cover = require("react-native/Libraries/Image/ImageResizeMode.js").cover;

class csstest extends Component {
  render() {
    return (
        <Image style={styl.backdrop}
               resizeMode='cover'
               blurRadius={5}
               source={{uri: 'https://wallpaperscraft.com/image/app_storm_apple_mac_blue_symbol_8281_1080x1920.jpg'}}>
          <View style={styl.container}>
            <atb.View animation="fadeIn" style={styl.welcomecontainer}>
              <atb.Text animation="zoomInUp" style={styl.welcome}>
                Welcome to React Native!
              </atb.Text>
            </atb.View>
            <Text style={styl.instructions}>
              To get started, edit index.ios.js
            </Text>
            <Text style={styl.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
            </Text>
          </View>
        </Image>
    );
  }
}

AppRegistry.registerComponent('csstest', () => csstest);
