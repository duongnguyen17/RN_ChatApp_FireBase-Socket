import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Room = ({user, gotoRoom}) => {
  return (
    <TouchableOpacity
      style={{height: 50, justifyContent: 'center'}}
      onPress={() => {
        gotoRoom(user);
      }}>
      <Text style={{marginLeft: 50}}>{user.username}</Text>
    </TouchableOpacity>
  );
};
export default Room;
