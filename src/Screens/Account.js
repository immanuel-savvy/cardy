import React from 'react';
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import {emitter, User} from '../../Cardy';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Small_btn from '../Components/small_btn';
import Text_btn from '../Components/Text_btn';
import {hp, wp} from '../utils/dimensions';
import {purple} from './splash';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disputes: 0,
    };
  }

  componentDidMount = async () => {};

  signout = () => {
    emitter.emit('signout');
  };

  render = () => {
    let {navigation} = this.props;

    return (
      <User.Consumer style={{flex: 1}}>
        {user => {
          let {username} = user;
          this.user = user;

          return (
            <Bg_view flex>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Bg_view flex style={{padding: wp(5.6), paddingTop: hp(1.4)}}>
                  <Bg_view>
                    <Fr_text capitalise bold size={wp(7.5)}>
                      account
                    </Fr_text>
                    <Fr_text caps size={wp(3.5)} opacity={0.8}>
                      profile
                    </Fr_text>
                  </Bg_view>
                </Bg_view>
                <Text_btn
                  centralise
                  style={{marginBottom: hp(2.4), alignSelf: 'center'}}
                  text="Privacy Policy"
                  action={() => navigation.navigate('privacy_policy')}
                />
                <Small_btn title="sign out" action={this.signout} />
              </ScrollView>
            </Bg_view>
          );
        }}
      </User.Consumer>
    );
  };
}

export default Account;
