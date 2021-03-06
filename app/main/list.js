/**
 * Created by Administrator on 2016/8/19 0019.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    ListView,
    TouchableNativeFeedback,
    TouchableHighlight,
} from 'react-native';

var News = require('../detail/news');
var ScreenWidth = Dimensions.get("window").width;
var ScreenHeight = Dimensions.get("window").height;
var NEWS_LINK = 'http://news.at.zhihu.com/api/4/news/';

var _navigator;
class MainList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
        this._renderRow = this._renderRow.bind(this);
        _navigator = this.props.navigator;
    }

    componentDidMount() {
        this.setState({
            stories:this.state.stories.cloneWithRows(this.props.listdata),
        });
    }

    render() {
        return (
            <ListView style={styles.list}
                      ref = 'storylist'
                      dataSource = {this.state.stories}
                      renderRow = {this._renderRow}
                      showsVerticalScrollIndicator={false}
            />
        );
    };

    _renderRow(story){
        return(
            <TouchableHighlight
                //按下后背景透明度变化
                activeOpacity={0.7}
                //按下后背景颜色
                underlayColor={'gray'}
                onPress={() => this._onPressItem(story.id)}>

                <View style={styles.item}>
                    <Text style={styles.itemtext}>{story.title}</Text>
                    <Image style={styles.listimg}
                           source={{uri: story.images[0]}}
                    />

                </View>

            </TouchableHighlight>
        );
    }

  /*  _renderRow(story){
        return(
            <TouchableNativeFeedback onPress={() => this._onPressItem(story.id)}>
                <View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>{story.title}</Text>
                        <Image style={styles.listimg}
                               source={{uri: story.images[0]}}
                        />

                    </View>
                       <View style={styles.separator} />
                </View>
            </TouchableNativeFeedback>
        );
    }*/

    _onPressItem(id){
        //fetch(NEWS_LINK+id).then((response) => response.json())
        //    .then((responseData) => {
                _navigator.push({
                    name: 'News',
                    component: News,
                    params: {
                        //response: responseData,
                        id: id,
                    }
                });
            //}).done();
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        //backgroundColor:'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    item: {
        margin: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor:'white',
    },
    itemtext: {
        flex:3,
        margin: 2,
        textAlign:'left',
        textAlignVertical:'center',
    },
    listimg: {

        alignSelf: 'flex-end',
        flex:1,
        width: 70,
        height: 70,
        margin:1,

    },

});

module.exports = MainList;