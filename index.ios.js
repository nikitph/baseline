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
    Image, TouchableOpacity,   TabBarIOS,

} from 'react-native';
import * as atb from 'react-native-animatable';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import * as _this from "react/lib/ReactComponent";
import ListComponent from './listcomponent'
import headerComponent from './headerComponent'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, List, ListItem, InputGroup, Input, Thumbnail, Picker} from 'native-base';



var styl = require('./style');
var cover = require("react-native/Libraries/Image/ImageResizeMode.js").cover;

class csstest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            selectedTab: 'redTab',
            notifCount: 0,
            presses: 0,
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
            <TabBarIOS
                unselectedTintColor="orange"
                tintColor="rgb(196, 70, 70)"
                barTintColor="white">
                <Icon.TabBarItemIOS
                    title="List"
                    iconName="list"
                    iconColor="orange"
                    selectedIconName="list"
                    selectedIconColor="rgb(196, 70, 70)"
                    renderAsOriginal={true}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                    }}>
                    <atb.View style={styl.container} animation="fadeIn" delay={500}>
                        <ListComponent/>
                        <Thumbnail size={50} source={{uri : this.state.user.photo}} />

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
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Record"
                    iconName="fiber-smart-record"
                    iconColor="orange"
                    selectedIconName="fiber-smart-record"
                    selectedIconColor="rgb(196, 70, 70)"
                    renderAsOriginal={true}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                        });
                    }}>

                    <Container>
                        <Content>


                            <List>

                                <ListItem style={{marginTop:40}}>
                                    <Thumbnail size={40} source={{uri : this.state.user.photo}}  style={{alignItems:"center"}}/>
                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily : 'AvenirNext-UltraLight',
                                        marginBottom: 20,
                                        marginTop:20
                                    }}>
                                        Hey {this.state.user.name.split(' ')[0]}</Text>

                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input placeholder='Enter dysfunctional thought here' />
                                    </InputGroup>
                                </ListItem>

                                <ListItem>
                                    <InputGroup>
                                        <Input placeholder='PASSWORD' secureTextEntry={true}/>
                                    </InputGroup>
                                </ListItem>

                                <ListItem>
                                    <InputGroup >
                                        <Input inlineLabel label='NAME' placeholder='John Doe' />
                                    </InputGroup>
                                </ListItem>

                                <ListItem>
                                    <InputGroup >
                                        <Input stackedLabel label='Address Line 1' placeholder='Address' />
                                    </InputGroup>
                                </ListItem>

                            </List>
                        </Content>
                    </Container>

                </Icon.TabBarItemIOS>
            </TabBarIOS>


            );
        }
    }
}

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

AppRegistry.registerComponent('csstest', () => csstest);
