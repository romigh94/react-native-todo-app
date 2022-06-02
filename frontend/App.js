import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
        StyleSheet, 
        Text, 
        View, 
        FlatList, 
        TextInput, 
        TouchableOpacity, 
        SafeAreaView, 
        } from 'react-native';


export default function App() {

  const [search, setSearch] = useState('')
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setfilteredTasks] = useState([])
  //const [isSelected, setisSelected] = useState(false)
  const [fromTodo, setfromTodo] = useState(null)
  const [fromInProgress, setfromInProgress] = useState(null)

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
        return itemData.indexOf(textData) > -1
      })
      setfilteredTasks(newfilteredTasks)
      setSearch(text);
    } else {
      setfilteredTasks(tasks)
      setSearch(text)
    }
  }
  
  const renderItem = ({ item, index }) => {
    return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => setfromTodo(item.task)} style={styles.taskview}>
          <Text style={styles.items} >
            {item.task}
          </Text>
      </TouchableOpacity>
    </SafeAreaView>
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
            keyExtractor={item => item.id}
          />
        </View>

        <View style={styles.innerContainers}>
          <Text>In progress</Text>
        <View>
           <TouchableOpacity style={styles.taskview} onPress={() => setfromInProgress(fromTodo)}>
            <Text style={styles.items} >
              {fromTodo}
            </Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.innerContainers}>
          <Text>Done</Text>
          <View>
            <Text>{fromInProgress}</Text>
          </View>
        </View>

    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 20
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
    padding: 5,
    width: "80%"

  },
  innerContainers: {
    borderWidth: 1,
    width: 300,
    height: 200,
    padding: 5
  },
  button: {
    width: 10
  }
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