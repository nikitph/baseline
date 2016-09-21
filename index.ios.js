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


var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';


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
                    {<View style={[styles.tabContent, {backgroundColor: 'red'}]}>
                        <Text style={styles.tabText}>xyz</Text>
                    </View>}
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
