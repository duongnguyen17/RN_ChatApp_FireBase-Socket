import React, {useState, useEffect, useContext} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {List, TextInput} from 'react-native-paper';
import Room from '../../components/Room';
import {getListRooms, getListUsers} from '../../api';
import {UserContext} from '../../../App';
const ListRooms = ({navigation}) => {
  const [rooms, setRooms] = useState([]);
  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const {state} = useContext(UserContext);
  useEffect(() => {
    fetchRooms();
    fetchUsers();
  }, []);
  const fetchRooms = async () => {
    try {
      const data = await getListRooms(state.token, index);
      setRooms([...data.rooms]);
    } catch (error) {
      console.log(
        '🚀 ~ file: ListRooms.js ~ line 19 ~ fetchRooms ~ error',
        error,
      );
    }
  };
  const fetchUsers = async () => {
    try {
      const data = await getListUsers(state.token);
      setUsers([...data]);
    } catch (error) {
      console.log(
        '🚀 ~ file: ListRooms.js ~ line 32 ~ fetchUsers ~ error',
        error,
      );
    }
  };
  const gotoRoom = user => {
    navigation.navigate('Chat', {user: user});
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={users}
        keyExtractor={item => item._id}
        renderItem={item => <Room user={item.item} gotoRoom={gotoRoom} />}
      />
      {/* <FlatList
        style={{flex: 1}}
        data={rooms}
        keyExtractor={item => item._id}
        renderItem={item => <Room {...item} />}
      /> */}
    </SafeAreaView>
  );
};

export default ListRooms;
