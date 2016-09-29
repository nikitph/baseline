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
    TextInput,
    View,
    Image, TouchableOpacity, TabBarIOS, Switch, Slider, PickerItemIOS, PickerIOS

} from 'react-native';
import * as atb from 'react-native-animatable';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Fumicust from './fumicust'
import ListComponent from './listcomponent'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Content, List, ListItem, Thumbnail, Button} from 'native-base';


var styl = require('./style');
var cover = require("react-native/Libraries/Image/ImageResizeMode.js").cover;
var Realm = require('realm');
const thoughtSchema = {
    name: 'Thought',
    properties: {
        desc: 'string',
        distortion: 'string',
        anxiety: {type: 'int', default: 0},
        counter: 'string',
        ddate: 'date'
    }
};

let realm = new Realm({schema: [thoughtSchema]});


var distortions = ['What is the cognitive distortion here?', 'All or nothing - thinking', 'Overgeneralization', 'Mental filter', 'Discounting the positive',
    'Jumping to conclusions',
    'Magnification', 'Emotional reasoning', 'Should statements', 'Labeling', 'Personalization and blame'];

class csstest extends Component {
    constructor(props) {
        super(props);
        this.clearText = this.clearText.bind(this);
        this.state = {
            user: null,
            selectedTab: 'redTab',
            notifCount: 0,
            desc: '',
            distortion: 'What is the cognitive distortion here?',
            anxiety: 1,
            counter: ''
        };
    }

    componentDidMount() {
        this._setupGoogleSignin();
    }

    clearText() {
        this.refs['ctr'].setNativeProps({value: ''});
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
            this.setState({user});
        }
        catch (err) {
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
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

                <View style={styl.containersignin} refreshing>
                    <atb.Image animation="fadeIn" onAnimationEnd={()=> console.log(this)}
                               style={styl.backdrop}
                               resizeMode='cover'
                               source={require('./lo.png')}/>
                    <atb.View animation="fadeIn" style={styl.welcomecontainer} duration={500}>
                        <atb.Text animation="fadeInUp" style={styl.welcome} delay={500}>
                            Welcome to Naryna
                        </atb.Text>
                    </atb.View>
                    <atb.Text animation="fadeIn" delay={1500} style={styl.instructions}>
                        To get started, lets login with Google
                    </atb.Text>
                    <atb.View animation="fadeIn" delay={2200} style={{width: 130, height: 55, marginTop: 10}}>

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
                    unselectedTintColor="grey"
                    tintColor="#ffa54c"
                    barTintColor="white">
                    <Icon.TabBarItemIOS
                        title="List"
                        iconName="list"
                        iconColor="grey"
                        selectedIconName="list"
                        selectedIconColor="#ffa54c"
                        renderAsOriginal={true}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}>
                        <atb.View style={styl.containerlist} animation="fadeIn" delay={500}>
                            <ListComponent ds={realm} ref='ls' schem={thoughtSchema}/>
                        </atb.View>
                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        title="Record"
                        iconName="fiber-smart-record"
                        iconColor="grey"
                        selectedIconName="fiber-smart-record"
                        selectedIconColor="#ffa54c"
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

                                    <ListItem style={{marginTop: 10}}>
                                        <Thumbnail size={40} source={{uri: this.state.user.photo}}
                                                   style={{alignItems: "center"}}/>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: 'AvenirNext-UltraLight',
                                            marginBottom: 20,
                                            marginTop: 20
                                        }}>
                                            Hey {this.state.user.name.split(' ')[0]}</Text>

                                    </ListItem>
                                </List>
                                <Fumicust
                                    ref="desc"
                                    iconClass={FontAwesomeIcon}
                                    iconName={'exclamation-circle'}
                                    iconColor={'#f95a25'}
                                    placeholder={'Enter Dysfunctional Thought here'}
                                    onChangeText={(val) => this.setState({desc: val})}
                                />

                                <PickerIOS itemStyle={{fontSize: 15, color: 'rgba(0,0,0,0.4)', textAlign: 'center'}}
                                           style={{marginLeft: 20, marginRight: 20, height: 150}}
                                           selectedValue={this.state.distortion}
                                           onValueChange={(dist) => this.setState({distortion: dist})}>

                                    {Object.values(distortions).map((distortion) => (
                                        <PickerItemIOS
                                            key={distortion}
                                            value={distortion}
                                            label={distortion}
                                        />
                                    ))}
                                </PickerIOS>

                                <Fumicust
                                    ref="ctr"
                                    iconClass={FontAwesomeIcon}
                                    iconName={'check-square-o'}
                                    iconColor={'#f95a25'}
                                    placeholder={'Can you think of a rational response to refute this thought?'}
                                    onChangeText={(val) => this.setState({counter: val})}

                                />
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: 'Arial', marginLeft: 40, color: 'rgba(0,0,0,0.2)'
                                }}>Current anxiety level
                                </Text>
                                <Slider style={{marginLeft: 20, marginRight: 20}}
                                        maximumValue={100}
                                        minimumValue={0}
                                        step={1}
                                        onValueChange={(value) => this.setState({anxiety: value})}/>


                                <Button block style={{
                                    marginLeft: 100,
                                    marginRight: 100,
                                    backgroundColor: 'rgba(0,0,255,0.5)'
                                }} onPress={() => {

                                    realm.write(() => {
                                        realm.create('Thought', {
                                            desc: this.state.desc,
                                            distortion: this.state.distortion,
                                            counter: this.state.counter,
                                            anxiety: this.state.anxiety,
                                            ddate: new Date()
                                        });

                                    });
                                    {/*console.log(realm.objects('Thought'));*/
                                    }

                                    {/*console.log(this.state);*/
                                    }
                                    {/*console.log(this.refs['ctr']);*/
                                    }
                                    this.refs['ctr'].setState({value: ''});
                                    this.refs['desc'].setState({value: ''});
                                    if (this.refs['ls'])
                                        this.refs['ls'].setState({datasource: realm.objects('Thought').sorted('ddate')});

                                    this.setState({
                                        selectedTab: 'blueTab',
                                        desc: '',
                                        distortion: 'What is the cognitive distortion here?',
                                        anxiety: 0,
                                        counter: ''
                                    });

                                }}> Submit </Button>
                            </Content>
                        </Container>

                    </Icon.TabBarItemIOS>

                    <Icon.TabBarItemIOS
                        title="Logout"
                        iconName="keyboard-arrow-right"
                        iconColor="grey"
                        selectedIconName="list"
                        selectedIconColor="#ffa54c"
                        renderAsOriginal={true}
                        onPress={() => {
                            this._signOut();
                        }}>
                    </Icon.TabBarItemIOS>
                </TabBarIOS>


            );
        }
    }
}
AppRegistry.registerComponent('csstest', () => csstest);
