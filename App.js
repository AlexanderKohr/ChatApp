import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, Button, ScrollView } from 'react-native';

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  alertMyText (input = []) {
    Alert.alert(input.text);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextInput 
          style={{height: 40, borderColor: 'gray', borderWidth: 2}}
          onChangeText={(text) => 
          this.setState({text})}
          value={this.state.text}
          placeholder='Type here...'
        />
        <Text>You wrote: {this.state.text}</Text>
        <Button onPress={() => {
          this.alertMyText({text: this.state.text});
        }}
        title='Press Me'
        />
        <ScrollView>
          <Text style={{fontSize: 110}}>This text is so bog! And so long! You have to scroll!</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  box1: {
    flex: 10,
    backgroundColor: 'red'
  },
  box2: {
    flex: 120,
    backgroundColor: 'blue'
  },
  box3: {
    flex: 50,
    backgroundColor: 'green'
  }
})
