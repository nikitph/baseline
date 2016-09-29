/**
 * Created by Omkareshwar on 9/21/16.
 */
import React, {Component} from 'react';
import {AppRegistry, Text, View, RecyclerViewBackedScrollView} from 'react-native';
import {ListView} from 'realm/react-native'
var styl = require('./style');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeout from 'react-native-swipeout';
var Realm = require('realm');
import {Container, Content, List, ListItem, InputGroup, Input, Thumbnail, CheckBox, Button} from 'native-base';



export default class ListComponent extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,

        });

        this.realm = new Realm({schema:[props.schem]});
        this.realm.addListener('change', () => {
            this.state.dataSource = dataSource.cloneWithRows(this.realm.objects('Thought'));
        });


        this.state = {
            dataSource: dataSource.cloneWithRows(props.ds.objects('Thought')),
        };
    }

    render() {
        return (
            <View style={{paddingTop: 22}}>
                <ListView
                    initialListSize={100}
                    pageSize={50}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{bottom:49}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        console.log(rowData);
                        return (
                            <View style={styl.rowcontainer}>
                                <View style={styl.colcontainer}>
                                    <Icon name="check-circle" size={20} color="green"/>
                                    <Text style={styl.vcol}>{rowData.counter}</Text>
                                    <Text style={{fontSize:14,font:'avenirNext',color:'orange'}}>Anxiety</Text>

                                </View>
                                <View style={styl.colcontainer}>
                                    <Icon name="announcement" size={20} color="#900"/>
                                    <Text style={styl.vcol}>{rowData.desc}</Text>
                                    <Text style={{fontSize:24,font:'avenir',color:'orange'}}>{rowData.anxiety}</Text>
                                </View>
                            </View>

                        );
                    }}
                />
            </View>
        );
    }
}