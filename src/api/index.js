import axios from 'axios';
import {urlServer} from '../constants';

//Đăng nhập
export const login = async (phoneNumber, password) => {
  try {
    const user = await axios.post(`${urlServer}/chatsocket/login`, {
      phoneNumber: phoneNumber,
      password: password,
    });
    console.log(`user.data_login`, user.data.data);
    return user.data.data;
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 13 ~ login ~ error', error);
  }
};

//Đăng kí
export const signup = async (phoneNumber, password, username) => {
  try {
    const user = await axios.post(`${urlServer}/chatsocket/login`, {
      phoneNumber: phoneNumber,
      password: password,
      username: username,
    });
    return user.data.data;
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 27 ~ signup ~ error', error);
  }
};
