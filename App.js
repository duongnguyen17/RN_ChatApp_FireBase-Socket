import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import auth from '@react-native-firebase/auth';
// import Todos from './src/screens/Todos';
// import SignPhone from './src/screens/SignPhone';
import Login from './src/screens/chat/Login';
import Signup from './src/screens/chat/Signup';
import Chat from './src/screens/chat/Chat';
import ListRooms from './src/screens/chat/ListRooms';
export const defaultState = {
  user: null,
  token: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {...state, user: action.payload.user, token: action.payload.token};
    default:
      return {...state};
  }
};
export const UserContext = createContext();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const AuthChatNav = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Signup} name="Signup" />
    </Stack.Navigator>
  );
};
const MainChatNav = () => {
  return (
    <Stack.Navigator initialRouteName="List Rooms">
      <Stack.Screen component={ListRooms} name="List Rooms" />
      <Stack.Screen
        component={Chat}
        name="Chat"
      />
    </Stack.Navigator>
  );
};

const ChatApp = () => {
  const context = useContext(UserContext);
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const subcriber = auth().onAuthStateChanged(user => {
  //     setUser(user);
  //   });
  //   return subcriber;
  // }, []);
  // console.log(`state_ChatApp`, context.state);
  if (context.state?.user) {
    return <MainChatNav />;
  }
  return <AuthChatNav />;
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <NavigationContainer>
      <UserContext.Provider value={{state, dispatch}}>
        <Tab.Navigator
          initialRouteName="SignPhone"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              let Icon;
              switch (route.name) {
                case 'SignPhone':
                  Icon = AntDesign;
                  iconName = focused ? 'login' : 'login';
                  break;
                case 'Todos':
                  Icon = FontAwesome5;
                  iconName = focused ? 'tasks' : 'tasks';
                  break;
                case 'Chat':
                  Icon = AntDesign;
                  iconName = focused ? 'message1' : 'message1';
                  break;
                default:
                  break;
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          activeTintColor="#00bfff"
          inactiveTintColor="#333333">
          {/* <Tab.Screen component={SignPhone} name="SignPhone" /> */}
          {/* <Tab.Screen component={Todos} name="Todos" /> */}
          <Tab.Screen component={ChatApp} name="Chat" />
        </Tab.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
