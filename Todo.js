import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';

export default props => {
  const navigtion = useNavigation();

  const toHhmmss = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  const hhMMss = toHhmmss(props.secondsLeft);

  return (
    <Pressable
      onPress={() => {
        BackgroundTimer.stopBackgroundTimer();

        navigtion.navigate('TodoDetailScreen', {
          clickedTodo: {
            id: props.id,
            group: props.group,
            timerOn: props.timerOn,
            secondsLeft: props.secondsLeft,
          },
          inProgressTodo: {
            id: props.todoIdInProgress,
            group: props.groupInProgress,
            timerOn: props.timerOnInProgress,
            secondsLeft: props.secondsLeftInProgress,
          },
        });
      }}>
      <View style={styles.item}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.title}>{hhMMss}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'dodgerblue',
    padding: 20,
    marginVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
  },
});
