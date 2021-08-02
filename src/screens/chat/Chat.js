import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Button, TextInput} from 'react-native-paper';
// import {logOut, updateUsername} from '../../firebase';
import io from 'socket.io-client';
import {urlServer} from '../../constants';
// import firestore from '@react-native-firebase/firestore';
const Chat = ({route}) => {
  const {currUser} = route.params;
  // const ref = firestore().collection('room');
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io(urlServer);
  useEffect(() => {
    socket.on('chat message', msg => {
      setMessages([...messages, msg]);
    });
  }, []);
  // useEffect(() => {
  //   ref.onSnapshot(querySnapshot => {
  //     const list = [];
  //     querySnapshot.forEach(doc => {
  //       const {_id, text, createdAt, user} = doc.data();
  //       list.push({
  //         _id,
  //         createdAt: createdAt.toDate(),
  //         text,
  //         user: {_id: user._id},
  //       });
  //     });
  //     console.log(`list`, list);
  //     setMessages(
  //       list.sort((obj1, obj2) => (obj1.createdAt < obj2.createdAt ? 1 : -1)),
  //     );
  //   });
  // }, []);

  // const handleUpdate = async () => {
  //   await updateUsername(username);
  // };
  const onSend = useCallback((messages = []) => {
    socket.emit('ping', messages[0]);
  });

  // const onSend = useCallback(async (messages = []) => {
  //   try {
  //     await ref.add(messages[0]);
  //   } catch (error) {
  //     console.log('dong51', error.message);
  //   }
  // }, []);
  // if (!currUser?._user.displayName) {
  //   return (
  //     <SafeAreaView>
  //       <TextInput
  //         value={username}
  //         onChangeText={setUsername}
  //         label="Username"
  //       />
  //       <Button onPress={handleUpdate}>Update username</Button>
  //       <Button onPress={logOut}>Logout</Button>
  //     </SafeAreaView>
  //   );
  // }
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => {
        onSend(messages);
      }}
      user={{_id: currUser.uid}}
    />
  );
};
export default Chat;
