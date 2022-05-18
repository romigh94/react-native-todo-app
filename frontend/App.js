import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, PanResponder, TextInput, Animated } from 'react-native';

export default function App() {

const [search, setSearch] = useState('')
const [tasks, setTasks] = useState([])
const [filteredTasks, setfilteredTasks] = useState([])

const pan = useRef(new Animated.ValueXY()).current;



useEffect(() => {
  fetch("http://192.168.1.232:5000/get")
  .then((response) => response.json())
  .then((responseJson) => {
    setTasks(responseJson);
    setfilteredTasks(responseJson);
  })
  .catch((error) => {
    console.error(error);
  })
}, []);



const searchFilter = (text) => {
  if (text) {
  const newfilteredTasks = tasks.filter(
    (item) => {
      const itemData = item.task
      ? item.task : ''
      const textData = text;
      return itemData.indexOf(textData) > -1;
    })
    setfilteredTasks(newfilteredTasks)
    setSearch(text);
  } else {
    setfilteredTasks(tasks)
    setSearch(text)
  }
}

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
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (evt, gestureState) => {
      console.log(gestureState.moveY)
      Animated.event([{y: pan.y}])({y: gestureState.moveY})
      //Mapping gestureState.moveY that is equal to pan.y
    },
    onPanResponderTerminationRequest: (evt, gestureState) =>
      false, 
      // False - för att den inte ska bli avbruten när man drag & drops. Om det är på true, så kan den avbrytas tidigare.
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

const reset = () => {
  
}


const renderItem = ({ item }) => {
  return (
<View style={styles.renderItemView}  {...panResponder.panHandlers}>
    <View> 
    <Text style={styles.DragandDropIcon}>@</Text> 
    </View>
    <Text style={styles.items}>{item.task}</Text>
</View>
  )
}

  return (

    <View style={styles.container}>
      <StatusBar style="auto" />

      <Animated.View style={{
          backgroundColor: 'black',
          zIndex: 2,
          height: 20,
          width: "100%",
          top: pan.getLayout().top
        }}>
          {renderItem}
        </Animated.View>
      
      <Text style={styles.headline}>
        To do app
      </Text>

        <TextInput 
          style={styles.textinput} 
          placeholder="Filtrate tasks here..." 
          onChangeText={(text) => searchFilter(text)} 
          value={search} 
          />

        <View style={styles.innerContainers}>
          <Text style={styles.Title}>
            TASKS
          </Text>
          <FlatList 
            data={filteredTasks}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.innerContainers}>
          <Text style={styles.Title}>
            IN PROGRESS
          </Text>

        </View>

        <View style={styles.innerContainers}>
          <Text style={styles.Title}>
            DONE
          </Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 30,
  },
  Title: {
    fontSize: 18
  },
  textinput: {
    padding: 8,
    borderWidth: 1,
    margin: 5,
    width: 300
  },
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainers: {
    borderWidth: 1,
    width: 300,
    height: 200,
    padding: 5
  },
  items: {
    padding: 5
  },
  renderItemView: {
    flexDirection: 'row',
  },
  DragandDropIcon: {
    padding: 5
  }
});
