import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
//import axios from "axios";

export default function App() {

const [search, setSearch] = useState('')
const [todo, setTodo] = useState([])
const [filteredTodo, setfilteredTodo] = useState([])



useEffect(() => {
  fetch("http://192.168.1.232:5000/get")
  .then((response) => response.json())
  .then((responseJson) => {
    setTodo(responseJson);
    setfilteredTodo(responseJson);
  })
  .catch((error) => {
    console.error(error);
  })
}, []);




const searchFilter = (text) => {
  
  if (text) {
  const newfilteredData = todo.filter(
    function(item) {
      const itemData = item.task
      ? item.task.toUpperCase() : ''.toUpperCase()
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })
    setfilteredTodo(newfilteredData)
    setSearch(text);
  } else {
    setfilteredTodo(todo)
    setSearch(text)
  }
}


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={styles.headline}>
        To do app
      </Text>

        <TextInput 
          style={styles.textinput} 
          placeholder="Search for tasks here..." 
          onChangeText={(text) => searchFilter(text)} 
          value={search} 
          />

        <View style={styles.todo}>
          <Text style={styles.Title}>
            To do
          </Text>
          <FlatList 
            data={filteredTodo}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => <Text>{item.id} {'.'} {item.task.toUpperCase()}</Text>}
          />
        </View>

        <View style={styles.inprogress}>
          <Text style={styles.Title}>
            In progress
          </Text>

        </View>

        <View style={styles.done}>
          <Text style={styles.Title}>
            Done
          </Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 30
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
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    backgroundColor: 'lightgreen',
    width: 300,
    height: 200
  },
  inprogress: {
    backgroundColor: 'pink',
    width: 300,
    height: 200
  },
  done: {
    backgroundColor: 'lightblue',
    width: 300,
    height: 200
  }
});
