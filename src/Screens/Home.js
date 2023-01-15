import React from 'react';
import {
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {emitter, User} from '../../Cardy';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Listfooter from '../Components/listfooter';
import {hp, wp} from '../utils/dimensions';
import Feather from 'react-native-vector-icons/Feather';
import {green} from './splash';
import Small_btn from '../Components/small_btn';
import Loadindicator from '../Components/load_indicator';
import Pending_request from '../Components/pending_request';
import {get_request} from '../utils/services';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {pending_request: 'fetching'};
  }

  componentDidMount = async () => {
    let pending_request = await get_request(`pending_request/${this.user._id}`);
    this.setState({pending_request});

    this.rent_request = request => {
      this.setState({pending_request: request});
    };

    this.request_removed = () => this.setState({pending_request: null});

    emitter.listen('rent_request', this.rent_request);
    emitter.listen('request_removed', this.request_removed);
  };

  componentWillUnmount = () => {
    emitter.remove_listener('request_removed', this.request_removed);
    emitter.remove_listener('rent_request', this.rent_request);
  };

  apply_for_rent = () => {
    console.log('what?');
    this.props.navigation.navigate('apply_for_rent');
  };

  render() {
    let {navigation} = this.props;
    let {pending_request} = this.state;

    return (
      <User.Consumer>
        {user => {
          this.user = user;
          let {firstname, lastname} = user;

          return (
            <Bg_view flex>
              <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Bg_view flex>
                  <Bg_view
                    no_bg
                    horizontal
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: wp(2.8),
                    }}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Fr_text bold capitalise size={wp(4.5)}>
                        {`${firstname} ${lastname}`}
                      </Fr_text>
                    </View>

                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate('account')}>
                      <Feather name="user" size={wp(5)} color={green} />
                    </TouchableWithoutFeedback>

                    <View style={{width: wp(5)}} />
                  </Bg_view>

                  <Bg_view style={{justifyContent: 'center'}}>
                    {pending_request === 'fetching' ? (
                      <Loadindicator />
                    ) : pending_request ? (
                      <Pending_request request={pending_request} />
                    ) : (
                      <Bg_view style={{marginTop: hp(4)}}>
                        <Small_btn
                          title="Apply for Rent Loan"
                          action={this.apply_for_rent}
                        />
                      </Bg_view>
                    )}
                  </Bg_view>
                  <Listfooter />
                </Bg_view>
              </ScrollView>
            </Bg_view>
          );
        }}
      </User.Consumer>
    );
  }
}

export default Home;
