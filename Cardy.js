/*
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import Splash, {purple} from './src/Screens/splash';
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
import Apply_for_rent from './src/Screens/Apply_for_rent';
import Payment_breakdown from './src/Screens/Payment_breakdown';

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
          tabBarActiveTintColor: purple,
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
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Bottom_tab.Screen
          name="account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (
              <Feather name="user" color={color} size={size} />
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
        <App_stack.Screen name="apply_for_rent" component={Apply_for_rent} />
        <App_stack.Screen
          name="payment_breakdown"
          component={Payment_breakdown}
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

      if (result && result._id) {
        this.setState({user: result});
        await AsyncStorage.setItem('user', JSON.stringify(result));
      }
    }

    this.user_registered = async user => {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      this.setState({user});
    };

    this.on_verification = async verified => {
      this.setState({logged: true});

      let user = await AsyncStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        user.verified = !!verified;
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }
    };

    this.signout = async () => {
      this.setState({logged: false, user: null});
      await AsyncStorage.removeItem('user');
    };

    this.login = async user => {
      this.setState({user, logged: true});

      await AsyncStorage.setItem('user', JSON.stringify(user));
    };

    emitter.listen('user_registered', this.user_registered);
    emitter.listen('on_verification', this.on_verification);
    emitter.listen('signout', this.signout);
    emitter.listen('login', this.login);
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
