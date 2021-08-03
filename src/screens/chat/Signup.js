import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TextInput, Avatar, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import {
  signUpWithEmailPassword,
  updateAvatar,
  uploadImage,
  updateUsername,
} from '../../firebase';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  // const [avatar, setAvatar] = useState(null);
  const [entry, setEntry] = useState(true);

  // const chooseAvatar = () => {
  //   launchImageLibrary({mediaType: 'photo', quality: 1}, result => {
  //     console.log(`result`, result);
  //     // if (result.assets) {
  //     //   setAvatar(result.assets[0]);
  //     // }
  //   });
  // };
  const handleSignup = async () => {
    await signUpWithEmailPassword(email, password);
    await updateUsername(username);
    // if (avatar) {
    //   const url = await uploadImage(avatar);
    //   await updateAvatar(url);
    // }
  };

  return (
    <SafeAreaView style={{alignItems: 'center', flex: 1}}>
      <View style={{width: '90%'}}>
        <TextInput label="Phone number" value={email} onChangeText={setEmail} />
        <TextInput
          style={{marginTop: 10}}
          secureTextEntry={entry}
          label="Password"
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              name={entry ? 'eye' : 'eye-off'}
              onPress={() => {
                setEntry(!entry);
              }}
            />
          }
        />
        <TextInput
          style={{marginTop: 10}}
          label="User name"
          value={username}
          onChangeText={setUsername}
        />
        {/* <View>
          <Avatar.Image
            size={100}
            style={{alignSelf: 'center', marginTop: 10}}
            source={
              avatar ? {uri: avatar.uri} : require('../../../assets/avatar.png')
            }
          />
          <Button onPress={chooseAvatar}>Choose avatar</Button>
        </View> */}
      </View>
      <Button
        onPress={handleSignup}
        style={{backgroundColor: 'blue', marginTop: 20}}
        color="#ffffff">
        Signup
      </Button>
      <Text
        style={{color: 'blue', position: 'absolute', bottom: 3}}
        onPress={() => {
          navigation.goBack();
        }}>
        Have account? Login
      </Text>
    </SafeAreaView>
  );
};
export default Signup;
