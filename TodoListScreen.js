import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import {Button, Text} from 'react-native';
import {View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

export default ({navigation, route}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>3월10일</Text>,
      headerRight: () => (
        <Button
          title="ADD"
          onPress={() => navigation.navigate('TodoAddScreen')}
        />
      ),
    });
  });

  useEffect(() => {
    if (isFromAddScreen(route)) {
      setTodos([...todos, createNewTodo(route)]);
    }
  }, [route.params?.addTodo]);

  useEffect(() => {
    if (isFromTimerScreen(route)) {
      const newTodos = getUpdatedTodos(todos, route);
      setTodos(newTodos);
    }
  }, [route.params?.clickedTodo, route.params?.inProgressTodo]);

  useEffect(() => {
    const todo = getTodoInProgress(todos);
    if (todo != undefined) {
      startTimer(todo);
    }
  }, todos);

  const startTimer = todo => {
    BackgroundTimer.runBackgroundTimer(() => {
      setTodos(todos => {
        const newTodos = secdonsMinusOrAsItis(todos, todo);

        return newTodos;
      });
    }, 1000);
  };

  return (
    <View>
      <Text>회사활동</Text>
      <TodoList
        todos={todos.filter(todo => todo.group == 'work')}
        todoInProgress={todos.find(todo => todo.timerOn)}
        group="work"
      />
      <Text>내활동</Text>
      <TodoList
        todos={todos.filter(todo => todo.group == 'private')}
        todoInProgress={todos.find(todo => todo.timerOn)}
        group="private"
      />
    </View>
  );
};

function isFromAddScreen(route) {
  return route.params?.addTodo;
}

function isFromTimerScreen(route) {
  return route.params?.clickedTodo && route.params?.inProgressTodo;
}

function createNewTodo(route) {
  return {
    id: Math.random().toString(),
    group: route.params.addTodo.group,
    name: route.params.addTodo.name,
    secondsLeft: route.params.addTodo.secondsLeft,
    timerOn: false,
    backgroundTimer: false,
  };
}

function getUpdatedTodos(todos, route) {
  return todos.map(oldTodo => {
    console.log('타이머 화면에서 준 : ' + JSON.stringify(route.params));

    if (oldTodo.id == route.params.clickedTodo.id) {
      return {
        id: oldTodo.id,
        group: oldTodo.group,
        name: oldTodo.name,
        secondsLeft: route.params.clickedTodo.secondsLeft,
        timerOn: route.params.clickedTodo.timerOn,
        backgroundTimer: false,
      };
    } else if (oldTodo.id == route.params.inProgressTodo.id) {
      return {
        id: oldTodo.id,
        group: oldTodo.group,
        name: oldTodo.name,
        secondsLeft: route.params.inProgressTodo.secondsLeft,
        timerOn: route.params.inProgressTodo.timerOn,
        backgroundTimer: false,
      };
    } else {
      return {
        id: oldTodo.id,
        group: oldTodo.group,
        name: oldTodo.name,
        secondsLeft: oldTodo.secondsLeft,
        timerOn: oldTodo.timerOn,
        backgroundTimer: false,
      };
    }
  });
}

function getTodoInProgress(todos) {
  return todos.find(todo => todo.timerOn && todo.backgroundTimer == false);
}

function secdonsMinusOrAsItis(todos, todo) {
  return todos.map(oldTodo => {
    if (oldTodo.id == todo.id) {
      return {
        id: oldTodo.id,
        group: oldTodo.group,
        name: oldTodo.name,
        secondsLeft: oldTodo.secondsLeft - 1,
        timerOn: oldTodo.timerOn,
        backgroundTimer: true,
      };
    } else {
      return oldTodo;
    }
  });
}
