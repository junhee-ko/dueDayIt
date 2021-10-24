import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

export default ({route, navigation}) => {
  console.log('리스트 화면에서 준 데이터 : ' + JSON.stringify(route.params));

  // Clicked Todo
  const [timerOn, setTimerOn] = useState(route.params.clickedTodo.timerOn);
  const [secondsLeft, setSecondsLeft] = useState(
    route.params.clickedTodo.secondsLeft,
  );

  // InProgress Todo
  const [todoIdInProgress, setTodoIdInProgress] = useState(
    route.params.inProgressTodo.id,
  );
  const [timerOnInProgress, setTimerOnInProgress] = useState(
    route.params.inProgressTodo.timerOn,
  );
  const [secondsLeftInProgress, setSecondsLeftInProgress] = useState(
    route.params.inProgressTodo.secondsLeft,
  );

  // Back Button
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="BACK"
          onPress={() => {
            BackgroundTimer.stopBackgroundTimer();

            navigation.navigate({
              name: 'TodoListScreen',
              params: {
                clickedTodo: {
                  id: route.params.clickedTodo.id,
                  group: route.params.clickedTodo.group,
                  timerOn: timerOn,
                  secondsLeft: secondsLeft,
                },
                inProgressTodo: {
                  id: todoIdInProgress,
                  group: route.params.inProgressTodo.group,
                  timerOn: timerOnInProgress,
                  secondsLeft: secondsLeftInProgress,
                },
              },
            });
          }}
        />
      ),
    });
  });

  // Event on timerOn
  useEffect(() => {
    if (timerOn) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }

    if (
      timerOnInProgress &&
      route.params.clickedTodo.id != route.params.inProgressTodo.id
    ) {
      startTimerInProgress();
    }
  }, [timerOn, timerOnInProgress]);

  // Event on secondsLeft
  useEffect(() => {
    if (secondsLeft === 0 || secondsLeftInProgress === 0) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft, secondsLeftInProgress]);

  // Start timer
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };
  const startTimerInProgress = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeftInProgress(secs => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;

    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {clockify().displayHours} : {clockify().displayMins} :{' '}
        {clockify().displaySecs}
      </Text>
      <Button
        title="Start/Stop"
        onPress={() => {
          if (isExistsTodoInProgress(route)) {
            alert(setTimerOnInProgress, setTimerOn);
          } else {
            if (timerOn) {
              setTodoIdInProgress(''); // 켜져있는 타이머를 끄는 경우
            } else {
              setTodoIdInProgress(route.params.clickedTodo.id); // 꺼져있는 타이머를 키는 경우
            }

            setTimerOn(timerOn => !timerOn);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#000',
  },
  time: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
});

function isExistsTodoInProgress(route) {
  return (
    route.params.inProgressTodo.id != undefined &&
    route.params.inProgressTodo.id != route.params.clickedTodo.id
  );
}

function alert(setTimerOnInProgress, setTimerOn) {
  Alert.alert('이미 진행중인 TODO 가 있어요 !', '멈추고 요걸 시작할까요 ?', [
    {
      text: 'NO',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'YES',
      onPress: () => {
        BackgroundTimer.stopBackgroundTimer();
        setTimerOnInProgress(false);
        setTimerOn(true);
      },
    },
  ]);
}
