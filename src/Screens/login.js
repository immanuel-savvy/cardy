import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {emitter} from '../../Cardy';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Stretched_button from '../Components/Stretched_button';
import Text_input from '../Components/Text_input';
import {hp, wp} from '../utils/dimensions';
import {validate_phone} from '../utils/functions';
import {post_request} from '../utils/services';
import toast from '../utils/toast';
import Feather from 'react-native-vector-icons/Feather';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount = async () => {};

  toggle_reveal_password = () =>
    this.setState({reveal_password: !this.state.reveal_password});

  set_email = email => this.setState({email});

  set_password = password => this.setState({password});

  is_set = () => {
    let {email, password} = this.state;
    return validate_phone(email) && password.length >= 6;
  };

  login = async () => {
    this.setState({loading: true});
    let {email, password} = this.state;

    let result = await post_request('logging_in', {email, key: password});
    this.setState({loading: false});
    result && result.user
      ? emitter.emit('logged_in', {user: result.user, wallet: result.wallet})
      : toast(result);
  };

  render = () => {
    let {route} = this.props;
    let {email, password, reveal_password, loading} = this.state;

    return (
      <Bg_view flex>
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView showVerticalScrollIndicator={false} style={{flex: 1}}>
            <Bg_view style={{alignItems: 'center'}} flex no_bg>
              <Bg_view
                style={{
                  elevation: 10,
                  shadowColor: '#000',
                  width: wp(88.8),
                  height: hp(70),
                  justifyContent: 'center',
                  borderRadius: wp(5.6),
                  padding: wp(5.6),
                  paddingBottom: wp(2.8),
                  marginVertical: hp(5),
                }}>
                <Fr_text
                  bold="900"
                  size={wp(7.5)}
                  color="#28100B"
                  centralise
                  style={{marginBottom: hp(4)}}>
                  Login
                </Fr_text>
                <Text_input
                  value={email}
                  placeholder="type your email"
                  label="email Address"
                  type="email-pad"
                  on_change_text={this.set_email}
                />

                <Text_input
                  value={password}
                  label={'password'}
                  secure={!reveal_password}
                  placeholder="type your password"
                  on_change_text={this.set_password}
                  right_icon={<Feather name="hidden" />}
                />
                <Stretched_button
                  title="login"
                  loading={loading}
                  style={{marginHorizontal: 0, marginTop: hp(2)}}
                  action={this.login}
                />
              </Bg_view>
            </Bg_view>
          </ScrollView>
        </KeyboardAvoidingView>
      </Bg_view>
    );
  };
}

export default Login;
