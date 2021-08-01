import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

import {Platform} from 'react-native';
export const ref = firestore().collection('room')
//đăng nhập với số điện thoại
export const signInWithPhoneNumber = async phoneNumber => {
  try {
    const res = await auth().signInWithPhoneNumber(phoneNumber);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

//đăng kí với email và password
export const signUpWithEmailPassword = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('sign up with email and password success!');
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        console.log('That email address is already in use!');
        break;
      case 'auth/invalid-email':
        console.log('That email address is invalid!');
        break;
      default:
        console.log(error.message);
    }
  }
};

//cập nhật user name
export const updateUsername = async username => {
  try {
    const user = auth().currentUser;
    await user.updateProfile({displayName: username});
    console.log('update username: ' + username + ' thanh cong :))))');
  } catch (error) {
    console.log(error.message);
  }
};

//upload ảnh
export const uploadImage = async uri => {
  try {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    await storage().ref(filename).putFile(uploadUri);
    const url = await storage().ref(filename).getDownloadURL();
    return url;
  } catch (error) {
    console.log(error.message);
  }
};
//cập nhật avatar
export const updateAvatar = async url => {
  let curUser = auth().currentUser;
  if (curUser) {
    await curUser.updateProfile({photoURL: url});
    console.log('update thanh cong');
  } else {
    console.log('phai dang nhap');
  }
};

//đăng nhập với email và password
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error.message);
  }
};
//đăng xuất
export const logOut = async () => {
  try {
    await auth().signOut();
    console.log('log out successfully!');
  } catch (error) {
    console.log(error.message);
  }
};

//gửi tin nhắn
export const sendMessage = async message => {
  try {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firestore.Timestamp,
        user: item.user,
      };
     
    });
    
  } catch (error) {
    console.log(error.message);
  }
};
