import React from 'react';
import {TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Stretched_button from '../Components/Stretched_button';
import {hp, wp} from '../utils/dimensions';
import {email_regex} from '../utils/functions';
import Feather from 'react-native-vector-icons/Feather';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
  }

  render = () => {
    let {loading, email} = this.state;

    return (
      <Bg_view flex>
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            <Bg_view
              style={{
                alignItems: 'center',
                height: hp(),
                paddingBottom: hp(10),
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
                  height: hp(30),
                  justifyContent: 'center',
                  borderRadius: wp(5.6),
                  padding: wp(5.6),
                  marginBottom: hp(10),
                  elevation: 10,
                  shadowColor: '#000',
                }}>
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
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    onChangeText={this.set_phone}
                    value={email}
                    style={{
                      flex: 1,
                      fontSize: wp(4.5),
                      color: '#28100B',
                      marginRight: wp(1.4),
                      fontWeight: 'bold',
                    }}
                  />
                  {email_regex.test(email) ? <Feather name="check" /> : null}
                </Bg_view>
                <Stretched_button
                  title="get code"
                  loading={loading}
                  style={{marginHorizontal: 0, marginTop: hp(4)}}
                  action={this.get_code}
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
export {set_phone_et_country_code};
