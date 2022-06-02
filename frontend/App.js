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
        KeyboardAvoidingView, 
        } from 'react-native';


export default function App() {

  const [search, setSearch] = useState('')
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setfilteredTasks] = useState([])
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
    }
    setSearch(text);
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

  const handleOnpress = () => {
    setfromInProgress(fromTodo)
    setfromTodo('')
  }



  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <TextInput 
          style={styles.textinput} 
          placeholder="Filtrate tasks here..." 
          onChangeText={(text) => searchFilter(text)} 
          value={search} 
          />

    <View style={styles.innerContainers}>
      <Text style={styles.Title}>TASKS</Text>
        <FlatList 
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
    </View>

    <View style={styles.innerContainers}>
      <Text style={styles.Title}>In progress</Text>
        <View>
          <TouchableOpacity style={styles.taskview} onPress={() => handleOnpress()}>
          <Text style={styles.items} >
              {fromTodo}
          </Text>
          </TouchableOpacity>
        </View>
    </View>

    <View style={styles.innerContainers}>
      <Text style={styles.Title}>Done</Text>
        <View>
          <Text style={styles.items}>{fromInProgress}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
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