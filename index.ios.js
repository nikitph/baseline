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
    Image, TouchableOpacity
} from 'react-native';
import * as atb from 'react-native-animatable';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import * as _this from "react/lib/ReactComponent";


var styl = require('./style');
var cover = require("react-native/Libraries/Image/ImageResizeMode.js").cover;

class csstest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure({
                // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
                iosClientId: '39110702227-jd5dv3fdlnfdnt0etcprsh58rb82m621.apps.googleusercontent.com',
                webClientId: '39110702227-jd5dv3fdlnfdnt0etcprsh58rb82m621.apps.googleusercontent.com',
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            console.log(user);
            this.setState({user});
        }
        catch (err) {
            console.log("Google signin error", err.code, err.message);
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                console.log(user);
                this.setState({user: user});
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    _signOut() {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            this.setState({user: null});
        })
            .done();
    }

    render() {

        if (!this.state.user) {

            return (

                <View style={styl.container} refreshing>
                    <atb.Image animation="fadeIn" onAnimationEnd={()=> console.log(this)}
                               style={styl.backdrop}
                               resizeMode='cover'
                               source={require('./lo.png')}/>
                    <atb.View animation="fadeIn" style={styl.welcomecontainer} duration={1000}>
                        <atb.Text animation="fadeInUp" style={styl.welcome} delay={1000}>
                            Welcome to Naryna
                        </atb.Text>
                    </atb.View>
                    <atb.Text animation="fadeIn" delay={2000} style={styl.instructions}>
                        To get started, lets login with Google
                    </atb.Text>
                    <atb.View animation="fadeIn" delay={4000} style={{width: 130, height: 55}}>

                        <GoogleSigninButton
                            style={{width: 130, height: 48, "backgroundColor": "transparent"}}
                            size={GoogleSigninButton.Size.Standard}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this._signIn.bind(this)}

                        />
                    </atb.View>

                </View>
            );
        }

        if (this.state.user) {
            return (
                <atb.View style={styl.container} animation="fadeIn" delay={500}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 20
                    }}>Welcome {this.state.user.name}</Text>
                    <Text>Your email is: {this.state.user.email}</Text>

                    <TouchableOpacity onPress={() => {
                        this._signOut();
                    }}>
                        <View style={{marginTop: 50}}>
                            <Text>Log out</Text>
                        </View>
                    </TouchableOpacity>
                </atb.View>
            );
        }
    }
}

AppRegistry.registerComponent('csstest', () => csstest);
