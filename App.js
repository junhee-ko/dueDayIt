import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoDetailScreen from './TodoDetailScreen';
import TodoListScreen from './TodoListScreen';
import TodoAddScreen from './TodoAddScreen';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
        <Stack.Screen name="TodoDetailScreen" component={TodoDetailScreen} />
        <Stack.Screen name="TodoAddScreen" component={TodoAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
