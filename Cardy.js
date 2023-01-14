/*
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import Splash from './src/Screens/splash';
//
import Emitter from 'semitter';
import Login from './src/Screens/login';
import Account from './src/Screens/Account';
import Login_et_signup from './src/Screens/login_et_signup';
import Registration from './src/Screens/registration';
import Verification from './src/Screens/verification';
import Congratulation from './src/Screens/congratulation';
import {hp, wp} from './src/utils/dimensions';
import Bg_view from './src/Components/Bg_view';
import Privacy_policy from './src/Screens/privacy_policy';
import Home from './src/Screens/Home';
import Feather from 'react-native-vector-icons/Feather';
import {get_request} from './src/utils/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = React.createContext();

const emitter = new Emitter();

const Auth_stack = createStackNavigator();

const App_stack = createStackNavigator();

const Bottom_tab = createBottomTabNavigator();

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {init_screen: 'login_et_signup'};
  }

  componentDidMount = () => {};

  render = () => {
    let {init_screen} = this.props;

    return (
      <Auth_stack.Navigator
        initialRouteName={init_screen}
        screenOptions={{
          headerShown: false,
          keyboardHandlingEnabled: true,
          gestureEnabled: true,
          animationEnabled: true,
        }}>
        <Auth_stack.Screen name="login_et_signup" component={Login_et_signup} />
        <Auth_stack.Screen name="registration" component={Registration} />
        <Auth_stack.Screen name="verification" component={Verification} />
        <Auth_stack.Screen name="congratulation" component={Congratulation} />
        <Auth_stack.Screen name="login" component={Login} />
      </Auth_stack.Navigator>
    );
  };
}

class Index extends React.Component {
  constructor(props) {
    super(props);

    let {route} = this.props;

    this.state = {};
  }

  render = () => {
    return (
      <Bottom_tab.Navigator
        initialRouteName="home"
        backBehavior="initialRoute"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF6905',
          tabBarInactiveTintColor: '#858597',
          tabBarStyle: {
            height: hp(9),
            justifyContent: 'center',
            paddingBottom: hp(1),
          },
        }}>
        <Bottom_tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Feather name="home" style={{height: wp(7), width: wp(7)}} />
            ),
          }}
        />
        <Bottom_tab.Screen
          name="account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (
              <Feather name="user" style={{height: wp(7), width: wp(7)}} />
            ),
          }}
        />
      </Bottom_tab.Navigator>
    );
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    let {user} = this.props;

    return (
      <App_stack.Navigator
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          keyboardHandlingEnabled: true,
          gestureEnabled: true,
          animationEnabled: true,
        }}>
        <App_stack.Screen
          name="index"
          initialParams={{user}}
          component={Index}
        />
        <App_stack.Screen name="privacy_policy" component={Privacy_policy} />
      </App_stack.Navigator>
    );
  };
}

class Cardy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {logged: 'fetching'};
  }

  componentDidMount = async () => {
    let user = await AsyncStorage.getItem('user');

    if (!user) {
      this.setState({logged: false});
    } else {
      user = JSON.parse(user);
      this.setState({logged: true, user});
      let result = await get_request(`user_refresh/${user._id}`);
      if (result) {
        this.setState({user: result.user});
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
      }
    }

    this.user_registered = async user => {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      this.setState({user});
    };

    emitter.listen('user_registered', this.user_registered);
  };

  render = () => {
    let {logged, user} = this.state;

    return (
      <NavigationContainer>
        {logged === 'fetching' ? (
          <Splash />
        ) : logged === true ? (
          <Bg_view flex>
            <StatusBar backgroundColor="#eee" barStyle="dark-content" />
            <User.Provider value={user}>
              <App user={user} />
            </User.Provider>
          </Bg_view>
        ) : (
          <Auth />
        )}
      </NavigationContainer>
    );
  };
}

export default Cardy;
export {emitter, User};
