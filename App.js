import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import Todos from './src/screens/Todos';
import SignPhone from './src/screens/SignPhone';
import Login from './src/screens/chat/Login';
import Signup from './src/screens/chat/Signup';
import Chat from './src/screens/chat/Chat';

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
const MainChatNav = ({currUser}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Chat}
        name="Chat"
        options={{headerShown: false}}
        initialParams={{currUser}}
      />
    </Stack.Navigator>
  );
};
const ChatApp = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return subcriber;
  }, []);
  if (user) {
    return <MainChatNav currUser={user} />;
  }
  return <AuthChatNav />;
};
const App = () => {
  return (
    <NavigationContainer>
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
        <Tab.Screen component={SignPhone} name="SignPhone" />
        <Tab.Screen component={Todos} name="Todos" />
        <Tab.Screen component={ChatApp} name="Chat" />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
