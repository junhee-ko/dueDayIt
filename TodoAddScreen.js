import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="저장"
          onPress={() => {
            navigation.navigate({
              name: 'TodoListScreen',
              params: {
                addTodo: {
                  name: todoName,
                  group: group,
                  secondsLeft: hours * 60 * 60 + minutes * 60,
                },
              },
            });
          }}
        />
      ),
    });
  });

  const [todoName, setTodoName] = useState('');

  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const [group, setGroup] = useState('work');

  const onChange = (event, selectedTime) => {
    setShow(Platform.OS === 'ios');

    const time = new Date(selectedTime);
    setHours(time.getHours());
    setMinutes(time.getMinutes());
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.root}>
      <View style={styles.name}>
        <TextInput
          onChangeText={setTodoName}
          placeholder="활동 이름을 입력하세요"
          keyboardType="default"
        />
      </View>
      <View style={styles.time}>
        <Text>목표시간</Text>

        <Text
          onPress={showTimepicker}
          style={{
            textAlign: 'center',
          }}
          // placeholder={hours == 0 ? "목표시간을 설정해주세요" : "test"}
        >
          {hours == 0 && minutes == 0
            ? '목표시간을 설정해주세요'
            : hours + '시간' + minutes + '분'}
        </Text>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(1598051730000)}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.day}>
        <View>
          <Text>요일</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => setMonday(!monday)}
            style={styles.roundButton}>
            <Text>월</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTuesday(!tuesday)}
            style={styles.roundButton}>
            <Text>화</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setWednesday(!wednesday)}
            style={styles.roundButton}>
            <Text>수</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setThursday(!thursday)}
            style={styles.roundButton}>
            <Text>목</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFriday(!friday)}
            style={styles.roundButton}>
            <Text>금</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSaturday(!saturday)}
            style={styles.roundButton}>
            <Text>토</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSunday(!sunday)}
            style={styles.roundButton}>
            <Text>일</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.group}>
        <Text>그룹</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => setGroup('work')}>
            <Text>회사활동</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setGroup('private')}>
            <Text>내활동</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  name: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  time: {
    flex: 1,
    backgroundColor: 'yellow',
    marginHorizontal: 20,
  },
  day: {
    flex: 1,
    backgroundColor: 'green',
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  group: {
    flex: 1,
    backgroundColor: 'grey',
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
});
