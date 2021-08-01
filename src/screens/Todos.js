import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Button, TextInput} from 'react-native-paper';
import {ActivityIndicator, FlatList, SafeAreaView} from 'react-native';
import Todo from '../components/Todo';
const Todos = () => {
  const ref = firestore().collection('todos');
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(
        list.sort((obj1, obj2) => (obj1.complete > obj2.complete ? 1 : -1)),
      );
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const addTodo = async () => {
    try {
      await ref.add({
        title: todo,
        complete: false,
      });
      setTodo('');
    } catch (error) {
      console.log('🚀 ~ file: Todos.js ~ line 18 ~ addTodo ~ error', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* {loading ? (
        <View style={{flex: 1}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : ( */}
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={item => <Todo {...item} />}
      />
      {/* )} */}
      <TextInput label={'New Todo'} onChangeText={setTodo} value={todo} />
      <Button
        onPress={() => {
          addTodo();
        }}>
        Add TODO
      </Button>
    </SafeAreaView>
  );
};

export default Todos;
