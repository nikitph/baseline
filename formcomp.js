/**
 * Created by Omkareshwar on 9/27/16.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image, TouchableOpacity, TabBarIOS, Switch, Slider, PickerItemIOS, PickerIOS, NavigatorIOS

} from 'react-native';
import * as atb from 'react-native-animatable';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import * as _this from "react/lib/ReactComponent";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi, Hoshi} from 'react-native-textinput-effects';
import Fumicust from './fumicust'
import ListComponent from './listcomponent'
import headerComponent from './headerComponent'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Col, Row, Grid} from "react-native-easy-grid";
import Form from 'react-native-form'
import nbtheme from './nbtheme'
import {Container, Content, List, ListItem, InputGroup, Input, Thumbnail, CheckBox, Button} from 'native-base';

export default class formcomp extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
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
                        ref={'desc'}
                        iconClass={FontAwesomeIcon}
                        iconName={'exclamation-circle'}
                        iconColor={'#f95a25'}
                        placeholder={'Enter Dysfunctional Thought here'}
                        onChangeText={(value) => this.setState({desc: value})}
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
                        ref={'ctr'}
                        iconClass={FontAwesomeIcon}
                        iconName={'check-square-o'}
                        iconColor={'green'}
                        defaultValue={this.state.counter}
                        placeholder={'Can you think of a rational response to refute this thought?'}
                        onChangeText={(value) => {this.setState({counter: value})}}
                    />
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Arial', marginLeft: 40, color: 'rgba(0,0,0,0.2)'
                    }}>Current anxiety level
                    </Text>
                    <Slider style={{marginLeft: 20, marginRight: 20}}
                            {...this.props}
                            maximumValue={100}
                            minimumValue={0}
                            step={1}
                            onValueChange={(value) => {console.log(value);this.setState({anxiety: parseInt(value)})}}/>

                    <Button block style={{
                        marginLeft: 150,
                        marginRight: 150,
                        backgroundColor: 'rgba(0,0,255,0.5)'
                    }} onPress={() => {

                        realm.write(() => {
                            realm.create('Thought', {
                                desc: this.state.desc,
                                distortion: this.state.distortion,
                                counter: this.state.counter,
                                anxiety: toString(this.state.anxiety)
                            });

                        });

                        console.log(this.state);
                        console.log(this.refs['ctr']);
                        this.refs['ctr'].setState({value:''});
                        this.refs['desc'].setState({value:''});

                        this.setState({
                            selectedTab: 'blueTab',
                            desc: '',
                            distortion: 'What is the cognitive distortion here?',
                            anxiety: 0,
                            counter: ''
                        });
                        this.setState({
                            selectedTab: 'blueTab'
                        });
                    }}> Submit </Button>


                </Content>
            </Container>

        )
    }
}