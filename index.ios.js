/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  View,
  TextInput,
  Button,
} from 'react-native';

const defaultDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
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

  addTodo = () => {
    const newTodos = this.state.todos.slice();
    newTodos.push({
      text: this.state.inputText,
      checked: false,
    });

    this.setState({
      inputText: '',
      todos: newTodos,
    });
  }

  deleteTodoConfirm = (index) => {
    Alert.alert(
      `Supprimer la todo "${this.state.todos[index].text}" ?`,
      null,
      [
        { text: 'Oui !', onPress: () => this.deleteTodo(index), style: 'destructive' },
        { text: 'J\'ai changé d\'avis', style: 'cancel' },
      ]
    );
  }

  deleteTodo = (index) => {
    const newTodos = this.state.todos.slice();
    newTodos.splice(index, 1);

    this.setState({
      todos: newTodos,
    });
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

    const wrapperStyle = {
      flexDirection: 'row',
      padding: 14,
    };

    const inputStyle = {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
      fontSize: 18,
      height: 44,
      lineHeight: 22,
      marginRight: 14,
      backgroundColor: 'white',
      padding: 10,
    };

    const listViewStyle = {
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    };

    return (
      <View style={styles.container}>
        <View style={wrapperStyle}>
          <TextInput
            style={inputStyle}
            onChangeText={(text) => this.setState({ inputText: text })}
            value={this.state.inputText}
          />
          <Button title="Ajouter" onPress={this.addTodo} />
        </View>

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
      flex: 1,
      fontSize: 20,
    };

    const deleteStyle = {
      padding: 6,
      borderRadius: 4,
    };

    const deleteTextStyle = {
      fontSize: 12,
      color: 'red',
    };

    return (
      <TouchableHighlight onPress={() => this.toggleTodo(rowID)}>
        <View key={rowID} style={style}>
          <Text style={[checkmarkStyle, todo.checked && checkmarkCheckedStyle]}>
            ✓
          </Text>
          <Text style={textStyle}>{todo.text}</Text>

          <TouchableOpacity onPress={() => this.deleteTodoConfirm(rowID)} style={deleteStyle}>
            <Text style={deleteTextStyle}>SUPPRIMER</Text>
          </TouchableOpacity>
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
