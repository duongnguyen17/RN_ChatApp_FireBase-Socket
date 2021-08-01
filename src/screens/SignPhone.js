import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {signInWithPhoneNumber} from '../firebase';
const SignPhone = () => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');

  const signin = async () => {
    const res = await signInWithPhoneNumber(phoneNumber);
    setConfirm(res);
  };
  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TextInput
        keyboardType={'number-pad'}
        label="Phone Number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />
      <Button onPress={signin}>Send Code</Button>
      {confirm != null ? (
        <>
          <TextInput
            label="Code"
            onChangeText={setCode}
            value={code}
            keyboardType={'number-pad'}
          />
          <Button onPress={confirmCode}>Confirm</Button>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default SignPhone;
