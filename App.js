import React from 'react';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
//import react native gesture handler
import 'react-native-gesture-handler';
//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// creates navigator to navigate between stacked screens
const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Start'
          >
            <Stack.Screen
            name='Start'
            component={Start}
            options={{
              headerShown: false
            }}
            />
            <Stack.Screen
            name='Chat'
            component={Chat}
            options={{
              headerStyle: {
                backgroundColor: '#06d6a0'
              },
              headerBackTitleVisible: false
            }}
            
            />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
