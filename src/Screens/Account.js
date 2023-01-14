import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {User} from '../../Cardy';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import {wp} from '../utils/dimensions';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disputes: 0,
    };
  }

  componentDidMount = async () => {};

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
                style={{flex: 1}}>
                <Bg_view flex style={{padding: wp(5.6)}}>
                  <Fr_text capitalise bold size={wp(7.5)}>
                    account
                  </Fr_text>
                  <Fr_text caps size={wp(3.5)} opacity={0.8}>
                    settings
                  </Fr_text>
                </Bg_view>
              </ScrollView>
            </Bg_view>
          );
        }}
      </User.Consumer>
    );
  };
}

export default Account;
