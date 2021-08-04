import axios from 'axios';
import qs from 'qs';
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
//get list room
export const getListRooms = async (token, index) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {'x-access-token': token},
      data: {index: index},
      url: `${urlServer}/chatsocket/rooms`,
    });
    return res.data.data;
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 43 ~ getListRooms ~ error', error);
  }
};

//get list user
export const getListUsers = async token => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {'x-access-token': token},
      url: `${urlServer}/chatsocket/users`,
    });
    return res.data.data;
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 57 ~ error', error);
  }
};

//tạo phòng
export const createRoom = async (token, roomname, memberId) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {'x-access-token': token},
      data: {name: roomname, members: [...memberId]},
      url: `${urlServer}/chatsocket/room/create_room`,
    });
    // console.log(`res.data.data`, res);
    return res.data.data;
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 72 ~ createRoom ~ error', error);
  }
};
