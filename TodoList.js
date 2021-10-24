import React from 'react';
import {View, FlatList} from 'react-native';
import Todo from './Todo.js';

export default ({navigation, todos, group, todoInProgress}) => {
  const todoIdInProgress = todoInProgress?.id;
  const groupInProgress = todoInProgress?.group;
  const timerOnInProgress = todoInProgress?.timerOn;
  const secondsLeftInProgress = todoInProgress?.secondsLeft;

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <Todo
            //
            id={item.id}
            group={group}
            timerOn={item.timerOn}
            secondsLeft={item.secondsLeft}
            name={item.name}
            //
            todoIdInProgress={todoIdInProgress}
            groupInProgress={groupInProgress}
            timerOnInProgress={timerOnInProgress}
            secondsLeftInProgress={secondsLeftInProgress}
            //
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
