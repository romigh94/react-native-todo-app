import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from "axios";

export default function App() {

const [todo, setTodo] = useState([])

useEffect(() => {
  fetchData();
}, [])


const fetchData = () => {

  axios.get("http://localhost:5000/get")
  .then(res => setTodo(res.data))
  .catch(error => console.log(error))
}


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

        <View style={styles.todo}>
          <Text style={styles.todoText}>
            <h2>To do</h2>
          </Text>
          <FlatList 
            data={todo}
            renderItem={({ item }) => <Text>{item.task}</Text>}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.inprogress}>
          <Text>
            <h2>In progress</h2>
          </Text>

        </View>

        <View style={styles.done}>
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
