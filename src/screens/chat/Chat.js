import React, {useState, useEffect, useCallback, useContext} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Button, TextInput} from 'react-native-paper';
import {create} from 'react-test-renderer';
// import {logOut, updateUsername} from '../../firebase';
import {createRoom} from '../../api';
import io from 'socket.io-client';
import {UserContext} from '../../../App';
import {urlServer, SOCKET} from '../../constants';
// import firestore from '@react-native-firebase/firestore';
const Chat = ({route}) => {
  const {user} = route.params;
  // const ref = firestore().collection('room');
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const socket = io(urlServer);
  const context = useContext(UserContext);

  useEffect(async () => {
    await m_createRoom();
  }, []);
  useEffect(() => {
    socket.emit(SOCKET.JOIN, {roomId: room?._id});
    socket.on(SOCKET.RECEIVE_MESSAGE, message => {
      console.log(SOCKET.RECEIVE_MESSAGE, message.message);
      setMessages([...messages, message.message]);
    });
  }, []);
  const m_createRoom = async () => {
    const roomTemp = await createRoom(
      context.state.token,
      context.state.user.username + user.username,
      [user._id],
    );
    setRoom(roomTemp);
  };
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
    // console.log(`messages[0]`, messages[0]);
    socket.emit(SOCKET.SEND_MESSAGE, {
      message: {...messages[0]},
      roomId: room?._id,
    });
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
      user={{_id: context.state.user._id}}
    />
  );
};
export default Chat;
