import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';

const Todo = ({item}) => {
  const toggleComplete = async () => {
    try {
      await firestore()
        .collection('todos')
        .doc(item.id)
        .update({complete: !item.complete});
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <List.Item
      style={{backgroundColor: item.complete ? '#fff' : '#d9d9d9'}}
      title={item.title}
      onPress={toggleComplete}
      left={props => (
        <List.Icon
          {...props}
          icon={item.complete ? 'check' : 'cancel'}
          color={item.complete ? '#00bfff' : '#ff8566'}
        />
      )}
    />
  );
};
export default React.memo(Todo);
