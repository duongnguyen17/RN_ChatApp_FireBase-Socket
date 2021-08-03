import React, {useState, useEffect, useReducer, useContext} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
// import {signInWithEmailAndPassword} from '../../firebase';
import {defaultState, reducer} from '../../../App';
import {login} from '../../api';
import Chat from './Chat';
import {UserContext} from '../../../App';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entry, setEntry] = useState(true);
  const [disable, setDisable] = useState(true);
  const context = useContext(UserContext);

  const handleSignIn = async () => {
    // signInWithEmailAndPassword(email, password);
    try {
      const user = await login(email, password);
      context.dispatch({type: 'login', payload: user});
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (email === '' || password === '') setDisable(true);
    else {
      setDisable(false);
    }
  }, [email, password]);
  return (
    <SafeAreaView style={{alignItems: 'center', flex: 1}}>
      <Text>{context.state?.token}</Text>
      <View style={{width: '90%', marginTop: 50}}>
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
      </View>
      <Button
        disabled={disable}
        onPress={handleSignIn}
        color="#ffffff"
        style={{
          backgroundColor: 'blue',
          marginTop: 20,
        }}>
        SignIn
      </Button>
      <Text
        onPress={() => {
          navigation.navigate('Signup');
        }}
        style={{color: 'blue', position: 'absolute', bottom: 3}}>
        Have no account? Signup
      </Text>
    </SafeAreaView>
  );
};
export default Login;
