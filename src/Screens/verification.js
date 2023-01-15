import React from 'react';
import {TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import {emitter} from '../../Cardy';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Feather from 'react-native-vector-icons/Feather';
import Otp_counter from '../Components/otp_counter';
import Stretched_button from '../Components/Stretched_button';
import {hp, wp} from '../utils/dimensions';
import {post_request} from '../utils/services';
import toast from '../utils/toast';
import {purple} from './splash';
import Text_btn from '../Components/Text_btn';

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {code: ''};
  }

  resend_otp = async () => {
    let {email} = this.props.route.params;
    return await post_request('request_otp', {email});
  };

  set_code = code =>
    this.setState({
      code: code.trim(),
      valid_code: /^[0-9]{6}$/.test(String(code)),
    });

  verify_later = () => this.setState({verify_later: true}, this.verify);

  set_do_it_later = () => this.setState({do_it_later: true}, this.verify);

  verify = async () => {
    let {navigation, route} = this.props;
    let {email} = route.params;
    let {do_it_later} = this.state;

    this.setState({loading: true});
    let {code} = this.state;

    let verified =
      do_it_later ||
      (await post_request('verify_email', {
        email,
        code,
      }));

    this.setState({loading: false});
    if (verified.user || do_it_later) {
      emitter.emit('on_verification', verified);
      navigation.pop();
    } else {
      toast('Verification  failed');
      navigation.goBack();
    }
  };

  render = () => {
    let {valid_code, code, loading, doing_later} = this.state;
    let {email} = this.props.route.params;

    return (
      <Bg_view flex>
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView showVerticalScrollIndicator={false}>
            <Bg_view
              style={{
                alignItems: 'center',
                height: hp(),
                justifyContent: 'center',
              }}>
              <Fr_text bold="900" size={wp(7)} color="#28100B">
                Verification
              </Fr_text>
              <Fr_text
                size={wp(4.2)}
                centralise
                capitalise
                line_height={wp(7)}
                opacity={0.8}
                style={{
                  marginHorizontal: wp(20),
                  marginTop: hp(1.4),
                  marginBottom: hp(2.8),
                }}>
                {`enter the 6 digit number that was sent to ${email}`}
              </Fr_text>
              <Bg_view
                style={{
                  backgroundColor: '#fff',
                  width: wp(88.8),
                  height: hp(35),
                  justifyContent: 'center',
                  borderRadius: wp(5.6),
                  padding: wp(5.6),
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
                    placeholder="_ _ _ _ _ _"
                    keyboardType="decimal-pad"
                    placeholderTextColor="#ccc"
                    onChangeText={this.set_code}
                    value={String(code)}
                    style={{
                      flex: 1,
                      fontSize: wp(5),
                      color: purple,
                      marginRight: wp(1.4),
                      textAlign: 'center',
                    }}
                  />
                  {valid_code ? <Feather name="check" /> : null}
                </Bg_view>
                <Stretched_button
                  title="verify"
                  disabled={!valid_code || doing_later}
                  loading={loading}
                  style={{marginHorizontal: 0, marginTop: hp(4)}}
                  action={this.verify}
                />

                <Bg_view style={{alignItems: 'center'}}>
                  <Text_btn
                    text="Do this later"
                    centralise
                    action={this.set_do_it_later}
                  />
                </Bg_view>
              </Bg_view>
              {doing_later ? null : (
                <Otp_counter resend_otp={this.resend_otp} />
              )}
            </Bg_view>
          </ScrollView>
        </KeyboardAvoidingView>
      </Bg_view>
    );
  };
}

export default Verification;
