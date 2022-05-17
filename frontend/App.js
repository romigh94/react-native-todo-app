import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, PanResponder, Animated } from 'react-native';
import axios from "axios";

export default function App() {

const [todo, setTodo] = useState([])
const [dragging, setDragging] = useState(false)

const pan = useRef(new Animated.ValueXY()).current

const panResponder = useRef(
  PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) =>
      true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      true,

    onPanResponderGrant: (evt, gestureState) => {
      setDragging(true)
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log(gestureState.moveY)
      Animated.event([{ y: pan.y}])({ y: gestureState.moveY })
    },
    onPanResponderTerminationRequest: (evt, gestureState) =>
      false,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    }
  })
).current;

useEffect(() => {
  fetchData();
}, [])


const fetchData = () => {

  axios.get("http://localhost:5000/get")
  .then(res => setTodo(res.data))
  .catch(error => console.log(error))
}

const renderItem = () => {
  ({ item }) => <Text>{item.task}</Text>
}


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Animated.View style={styles.AnimatedView}>
        {renderItem}
      </Animated.View>
      
      <Text>
        <h1>To do app</h1>
      </Text>

        <View style={styles.todo} {...panResponder.panHandlers}>
          <Text style={styles.todoText}>
            <h2>To do</h2>
          </Text>
          <FlatList 
            scrollEnabled={!dragging}
            data={todo}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.inprogress} {...panResponder.onPanResponderRelease}>
          <Text>
            <h2>In progress</h2>
          </Text>

        </View>

        <View style={styles.done} {...panResponder.panHandlers}>
          <Text>
            <h2>Done</h2>
          </Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AnimatedView: {
    backgroundColor: 'pink',
    width: 100,
    height: 100
  },
  todo: {
    backgroundColor: 'lightgreen',
    width: 200,
    height: 200
  },
  inprogress: {
    backgroundColor: 'pink',
    width: 200,
    height: 200
  },
  done: {
    backgroundColor: 'lightblue',
    width: 200,
    height: 200
  }
});
