import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Todo({navigation}) {

  const [search, setSearch] = useState('')
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setfilteredTasks] = useState([])


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
        const itemData = item.task ? item.task : ''
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
  
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.taskview}>
          <Text style={styles.items} 
          onPress={() => navigation.navigate('InProgress', {item: item.task})}>{item.task}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
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
      <StatusBar style="auto" />
    </View>
  )
}

function InProgress({navigation, route}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <Text onPress={() => navigation.navigate('Done', {item: route.params.item})}>{route.params.item}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

function Done({navigation, route}) {
  return (
    <View style={styles.container}>
      <Text>{route.params.item}</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="InProgress" component={InProgress} />
        <Stack.Screen name="Done" component={Done} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  Title: {
    fontSize: 20,
    padding: 5
  },
  textinput: {
    padding: 8,
    borderWidth: 1,
    margin: 5,
    width: 300
  },
  items: {
    padding: 5
  },
})


/*import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';

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
      const itemData = item.task ? item.task : ''
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

*/