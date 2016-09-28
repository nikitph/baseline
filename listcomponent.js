/**
 * Created by Omkareshwar on 9/21/16.
 */
import React, {Component} from 'react';
import {AppRegistry, Text, View, RecyclerViewBackedScrollView} from 'react-native';
import {ListView} from 'realm/react-native'
var styl = require('./style');
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeout from 'react-native-swipeout';

export default class ListComponent extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);

        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,

        });
        var updat = 0;


        this.state = {
            dataSource: dataSource.cloneWithRows(props.ds),
            updat: props.updat
        };
    }

    render() {
        return (
            <View style={{paddingTop: 22}}>
                <ListView
                    initialListSize={100}
                    pageSize={50}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        console.log(rowData);
                        return (
                            <Swipeout right={[ { text: 'Delete',backgroundColor:'red',color:'white', autoclose:true } ]} backgroundColor="white">
                            <View style={styl.rowcontainer}>
                                <View style={styl.colcontainer}>
                                    <Icon name="check-circle" size={20} color="green"/>
                                    <Text style={styl.vcol}>{rowData.counter}</Text>
                                    </View>
                                <View style={styl.colcontainer}>
                                    <Icon name="announcement" size={20} color="#900"/>
                                    <Text style={styl.vcol}>{rowData.desc}</Text>
                                    <Text style={styl.vcol}>{rowData.anxiety}</Text></View>
                            </View>
                                </Swipeout>

                        );
                    }}
                />
            </View>
        );
    }
}