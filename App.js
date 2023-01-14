/*
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import Splash from './src/Screens/splash';
import Onboarding from './src/Screens/onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

//
import Emitter from './src/utils/emitter';
import Signup from './src/Screens/Signup';
import Login from './src/Screens/Login';
import Wallet from './src/Screens/Wallet';
import Market from './src/Screens/Market';
import Account from './src/Screens/Account';
import Login_et_signup from './src/Screens/Login_et_signup';
import Registration from './src/Screens/registration';
import Verification from './src/Screens/verification';
import Congratulation from './src/Screens/congratulation';
import {hp, wp} from './src/utils/dimensions';
import Bg_view from './src/Components/Bg_view';
import Icon from './src/Components/Icon';
import {get_request, post_request, sock_domain} from './src/utils/services';
import toast from './src/utils/toast';
import Update_username from './src/Screens/update_username';
import Change_password from './src/Screens/change_password';
import Update_phone from './src/Screens/update_phone';
import Privacy_policy from './src/Screens/privacy_policy';
import Sell from './src/Screens/Sell';
import Onsale_details from './src/Screens/Onsale_details';
import Offers from './src/Screens/offers';
import Chat from './src/Screens/Chat';
import Update_email from './src/Screens/update_email';
import Submit_dispute from './src/Screens/submit_dispute';
import Dispute from './src/Screens/dispute';
import Disputes from './src/Screens/disputes';
import Generate_account_number from './src/Screens/generate_account_number';
import Buyer_offers from './src/Screens/Buyer_offers';
import Notifications from './src/Screens/notifications';
import Home from './src/Screens/Home';
import Account_verification from './src/Screens/Account_verification';
import Verification_details from './src/Screens/veirification_details';
import Verification_requests from './src/Screens/verification_requests';

const User = React.createContext();

const emitter = new Emitter();

const Auth_stack = createStackNavigator();

const App_stack = createStackNavigator();

const Bottom_tab = createBottomTabNavigator();

const Admin_id = 'users~platform_user~3000';

let sock;

const Sock_offer_status = (offer, status, user) => {
  let payload = {offer, status};

  sock && sock.emit('offer_status', {user, payload});
};

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {init_screen: 'onboarding'};
  }

  componentDidMount = () => {};

  render = () => {
    let {onboardings, init_screen} = this.props;

    return (
      <Auth_stack.Navigator
        initialRouteName={init_screen}
        screenOptions={{
          headerShown: false,
          keyboardHandlingEnabled: true,
          gestureEnabled: true,
          animationEnabled: true,
        }}>
        <Auth_stack.Screen
          name="onboarding"
          component={Onboarding}
          initialParams={{onboardings}}
        />
        <Auth_stack.Screen name="login_et_signup" component={Login_et_signup} />
        <Auth_stack.Screen name="signup" component={Signup} />
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

    this.state = {
      unseen_notifications: route.params?.user?.new_notification || 0,
    };
  }

  componentDidMount = () => {
    this.new_notification = () => {
      let {unseen_notifications} = this.state;
      unseen_notifications++;
      this.setState({unseen_notifications});
    };

    this.seen_notification = () => {
      this.setState({unseen_notifications: 0});
    };

    emitter.listen('new_notification', this.new_notification);
    emitter.listen('seen_notification', this.seen_notification);
  };

  componentWillUnmount = () => {
    emitter.remove_listener('new_notification', this.new_notification);
    emitter.remove_listener('seen_notification', this.seen_notification);
  };

  render = () => {
    let {unseen_notifications} = this.state;

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
              <Icon
                icon="home_icon.png"
                style={{height: wp(7), width: wp(7)}}
              />
            ),
          }}
        />
        <Bottom_tab.Screen
          name="wallet"
          component={Wallet}
          options={{
            tabBarLabel: 'Wallet',
            tabBarIcon: ({color, size}) => (
              <Icon
                icon="wallet_icon.png"
                style={{height: wp(7), width: wp(7)}}
              />
            ),
          }}
        />
        <Bottom_tab.Screen
          name="market"
          component={Market}
          options={{
            tabBarLabel: 'Market',
            tabBarIcon: ({color, size}) => (
              <Icon
                icon="market_icon.png"
                style={{height: wp(7), width: wp(7)}}
              />
            ),
          }}
        />
        <Bottom_tab.Screen
          name="notifications"
          component={Notifications}
          options={{
            tabBarLabel: 'Notifications',
            tabBarBadge: unseen_notifications || undefined,
            tabBarIcon: ({color, size}) => (
              <Icon
                icon="notification_icon.png"
                style={{height: wp(7), width: wp(7)}}
              />
            ),
          }}
        />
        <Bottom_tab.Screen
          name="account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (
              <Icon
                icon="account_icon.png"
                style={{height: wp(7), width: wp(7)}}
              />
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
          // gestureEnabled: true,
          animationEnabled: true,
        }}>
        <App_stack.Screen
          name="index"
          initialParams={{user}}
          component={Index}
        />
        <App_stack.Screen name="change_password" component={Change_password} />
        <App_stack.Screen name="update_phone" component={Update_phone} />
        <App_stack.Screen name="update_email" component={Update_email} />
        <App_stack.Screen name="sell" component={Sell} />
        <App_stack.Screen name="onsale_details" component={Onsale_details} />
        <App_stack.Screen name="offers" component={Offers} />
        <App_stack.Screen name="submit_dispute" component={Submit_dispute} />
        <App_stack.Screen name="dispute" component={Dispute} />
        <App_stack.Screen
          name="verification_requests"
          component={Verification_requests}
        />
        <App_stack.Screen
          name="verification_details"
          component={Verification_details}
        />
        <App_stack.Screen
          name="account_verification"
          component={Account_verification}
        />
        <App_stack.Screen name="disputes" component={Disputes} />
        <App_stack.Screen name="chat" component={Chat} />
        <App_stack.Screen name="buyer_offers" component={Buyer_offers} />
        <App_stack.Screen
          name="generate_account_number"
          component={Generate_account_number}
        />
        <App_stack.Screen name="update_username" component={Update_username} />
        <App_stack.Screen name="verification" component={Verification} />
        <App_stack.Screen name="privacy_policy" component={Privacy_policy} />
      </App_stack.Navigator>
    );
  };
}

class Udara extends React.Component {
  constructor(props) {
    super(props);

    this.state = {logged: 'fetching'};
  }

  componentDidMount = async () => {};

  render = () => {
    let {logged, user, signed_out} = this.state;

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
          <Auth
            onboardings={this.onboardings}
            init_screen={
              init_screen
                ? init_screen
                : signed_out
                ? 'login_et_signup'
                : 'onboarding'
            }
          />
        )}
      </NavigationContainer>
    );
  };
}

export default Udara;
export {emitter, User, Admin_id, Sock_offer_status, sock};
