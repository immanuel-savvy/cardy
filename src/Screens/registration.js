import React from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Stretched_button from '../Components/Stretched_button';
import {hp, wp} from '../utils/dimensions';
import {email_regex} from '../utils/functions';
import Feather from 'react-native-vector-icons/Feather';
import {purple} from './splash';
import {post_request} from '../utils/services';
import toast from '../utils/toast';
import {emitter} from '../../Cardy';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  toggle_reveal = () =>
    this.setState({reveal_password: !this.state.reveal_password});

  set_email = email => this.setState({email});

  set_password = password => this.setState({password});

  set_firstname = firstname => this.setState({firstname});

  set_lastname = lastname => this.setState({lastname});

  is_set = () => {
    let {password, firstname, lastname, email} = this.state;

    return (
      password.length > 6 && firstname && lastname && email_regex.test(email)
    );
  };

  proceed = async () => {
    let {email, password, firstname, lastname, loading} = this.state;
    if (loading) return;

    this.setState({loading: true});

    let user = {
      email: email.trim().toLowerCase(),
      password,
      firstname,
      lastname,
    };

    let res = await post_request('register_user', user);

    console.log(res);

    this.setState({loading: false});
    if (res && res._id) {
      emitter.emit('user_registered', user);

      this.props.navigation.navigate('verification', user);
    } else toast((res && res.message) || 'Err, something went wrong.');
  };

  render = () => {
    let {loading, email, firstname, lastname, password, reveal_password} =
      this.state;

    return (
      <Bg_view flex>
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <Bg_view
              style={{
                alignItems: 'center',
                height: hp(),
                paddingBottom: hp(10),
                justifyContent: 'center',
              }}
              flex>
              <Fr_text bold="900" size={wp(7)} color="#28100B">
                Registration
              </Fr_text>
              <Fr_text
                size={wp(4.2)}
                centralise
                capitalise
                line_height={wp(7)}
                opacity={0.8}
                style={{
                  marginHorizontal: wp(20),
                  marginTop: hp(4),
                  marginBottom: hp(4),
                }}>
                enter your email to receive a verification code
              </Fr_text>
              <Bg_view
                style={{
                  backgroundColor: '#fff',
                  width: wp(88.8),
                  justifyContent: 'center',
                  borderRadius: wp(5.6),
                  padding: wp(5.6),
                  elevation: 10,
                  shadowColor: '#000',
                  paddingVertical: hp(2.8),
                }}>
                <Bg_view horizontal style={{justifyContent: 'space-between'}}>
                  <Bg_view
                    flex
                    style={{
                      height: hp(7.5),
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: wp(4),
                      marginTop: hp(4),
                      paddingHorizontal: wp(4),
                      paddingRight: wp(2.8),
                      marginRight: wp(1.4),
                    }}>
                    <TextInput
                      placeholder="Firstname"
                      placeholderTextColor="#aaa"
                      onChangeText={this.set_firstname}
                      value={firstname}
                      style={{
                        flex: 1,
                        fontSize: wp(4.5),
                        color: purple,
                        marginRight: wp(1.4),
                      }}
                    />
                  </Bg_view>
                  <Bg_view
                    flex
                    style={{
                      height: hp(7.5),
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: wp(4),
                      marginTop: hp(4),
                      paddingHorizontal: wp(4),
                      paddingRight: wp(2.8),
                      marginLeft: wp(1.4),
                    }}>
                    <TextInput
                      placeholder="Lastname"
                      placeholderTextColor="#aaa"
                      onChangeText={this.set_lastname}
                      value={lastname}
                      style={{
                        flex: 1,
                        fontSize: wp(4.5),
                        color: purple,
                        marginRight: wp(1.4),
                      }}
                    />
                  </Bg_view>
                </Bg_view>

                <Bg_view
                  style={{
                    height: hp(7.5),
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: wp(4),
                    marginTop: hp(4),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: wp(4),
                    paddingRight: wp(2.8),
                  }}>
                  <TextInput
                    placeholder="Email Address..."
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    onChangeText={this.set_email}
                    value={email}
                    style={{
                      flex: 1,
                      fontSize: wp(4.5),
                      color: purple,
                      marginRight: wp(1.4),
                    }}
                  />
                  {email_regex.test(email) ? <Feather name="check" /> : null}
                </Bg_view>

                <Bg_view
                  style={{
                    height: hp(7.5),
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: wp(4),
                    marginTop: hp(4),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: wp(4),
                    paddingRight: wp(2.8),
                  }}>
                  <TextInput
                    placeholder="Your password"
                    placeholderTextColor="#aaa"
                    onChangeText={this.set_password}
                    secureTextEntry={!reveal_password}
                    value={password}
                    style={{
                      flex: 1,
                      fontSize: wp(4.5),
                      color: purple,
                      marginRight: wp(1.4),
                    }}
                  />
                  <TouchableWithoutFeedback onPress={this.toggle_reveal}>
                    <Feather
                      name={reveal_password ? 'eye' : 'eye-off'}
                      size={wp(4.5)}
                      color={purple}
                    />
                  </TouchableWithoutFeedback>
                </Bg_view>
                <Stretched_button
                  title="Proceed"
                  loading={loading}
                  disabled={!this.is_set()}
                  style={{marginHorizontal: 0, marginTop: hp(4)}}
                  action={this.proceed}
                />
              </Bg_view>
            </Bg_view>
          </ScrollView>
        </KeyboardAvoidingView>
      </Bg_view>
    );
  };
}

export default Registration;
