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
  TouchableHighlight,
  View
} from 'react-native';

const defaultDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{
        text: 'Passer la piscine',
        checked: true,
      }, {
        text: 'Apprendre React-Native',
        checked: false,
      }, {
        text: 'Dominer le monde',
        checked: false,
      }],
    };
  }

  toggleTodo = (index) => {
    const newTodos = this.state.todos.slice();
    newTodos[index].checked = !newTodos[index].checked;

    this.setState({
      todos: newTodos,
    });
  }

  render() {
    const dataSource = defaultDataSource.cloneWithRows(this.state.todos);

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

  renderRow = (todo, sectionID, rowID) => {
    const style = {
      padding: 14,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
    };

    const checkmarkStyle = {
      fontSize: 22,
      marginRight: 8,
      color: '#ddd',
    };

    const checkmarkCheckedStyle = {
      color: 'blue',
    };

    const textStyle = {
      fontSize: 20,
    };

    return (
      <TouchableHighlight onPress={() => this.toggleTodo(rowID)}>
        <View key={rowID} style={style}>
          <Text style={[checkmarkStyle, todo.checked && checkmarkCheckedStyle]}>
            ✓
          </Text>
          <Text style={textStyle}>{todo.text}</Text>
        </View>
      </TouchableHighlight>
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
