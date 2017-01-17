/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

const defaultDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

export default class TodoList extends Component {
  render() {
    const dataSource = defaultDataSource.cloneWithRows([
      'Passer la piscine',
      'Apprendre React-Native',
      'Dominer le monde'
    ]);

    const listViewStyle = {
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    };

    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={listViewStyle}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }

  renderRow(todo, sectionID, rowID) {
    const style = {
      padding: 14,
      backgroundColor: 'white'
    };

    const textStyle = {
      fontSize: 20,
    };

    return (
      <View key={rowID} style={style}>
        <Text style={textStyle}>{todo}</Text>
      </View>
    );
  }

  renderSeparator(sectionID, rowID) {
    const style = {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    };

    return (<View key={rowID} style={style} />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TodoList', () => TodoList);
