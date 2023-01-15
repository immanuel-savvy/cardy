import React from 'react';
import {ScrollView} from 'react-native';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Header from '../Components/header';
import {hp, wp} from '../utils/dimensions';
import {grey, purple} from './splash';
import Feather from 'react-native-vector-icons/Feather';
import Stretched_button from '../Components/Stretched_button';
import {post_request} from '../utils/services';
import {emitter, User} from '../../Cardy';
import Line from '../Components/line';

const calculate_monthly_payment = (amount, payment_plan) => {
  let interest = amount * (2 / 100);
  let principal = amount + interest;

  return (principal / payment_plan).toFixed(2);
};

const comma_separate_figure = figure => {
  return figure;
};

class Payment_breakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  accept = async () => {
    let {navigation, route} = this.props;
    let {request} = route.params;

    if (this.state.loading) return;

    this.setState({loading: true});

    request.user = this.user._id;

    let res = await post_request('new_rent_request', request);
    request._id = res._id;
    request.created = res.created;

    emitter.emit('rent_request', {
      request,
      user: request.user,
      _id: res.user_request_id,
    });
    navigation.pop();
    navigation.navigate('home');
    this.setState({loading: false});
  };

  render() {
    let {route, navigation} = this.props;
    let {request} = route.params || {};
    let {amount, payment_plan} = request || {};

    return (
      <User.Consumer>
        {user => {
          this.user = user;

          return (
            <Bg_view flex>
              <Header title="Rent Application" navigation={navigation} />
              <ScrollView showVerticalScrollIndicator={false}>
                <Bg_view style={{paddingHorizontal: wp(5.6)}}>
                  <Fr_text
                    style={{marginBottom: hp(4)}}
                    color={purple}
                    size={wp(5.6)}
                    bold>
                    Payment Breakdown
                  </Fr_text>

                  <Fr_text opacity={0.8}>Rent request amount</Fr_text>
                </Bg_view>
                <Bg_view
                  shadowed
                  style={{
                    margin: wp(5.6),
                    paddingHorizontal: wp(5.6),
                    paddingVertical: hp(1.4),
                    borderRadius: wp(2.8),
                  }}>
                  <Fr_text size={wp(3)}>Amount</Fr_text>
                  <Bg_view horizontal style={{marginTop: hp(0.7)}}>
                    <Fr_text bold>{'\u20A6'}</Fr_text>
                    <Fr_text bold>{amount}</Fr_text>
                  </Bg_view>
                </Bg_view>

                <Fr_text style={{marginLeft: wp(5.6)}}>
                  Monthly Payment Plan
                </Fr_text>

                <Bg_view
                  shadowed
                  style={{
                    margin: wp(5.6),
                    paddingHorizontal: wp(5.6),
                    paddingVertical: hp(2.8),
                    borderRadius: wp(2.8),
                  }}>
                  <Bg_view horizontal style={{justifyContent: 'space-between'}}>
                    <Fr_text opacity={0.8}>{`${payment_plan} Month`}</Fr_text>

                    <Feather name="chevron-down" size={wp(5)} color={grey} />
                  </Bg_view>
                </Bg_view>

                <Bg_view style={{margin: wp(5.6)}}>
                  <Fr_text>Payment Option</Fr_text>

                  <Bg_view
                    background_color="#eae9fa"
                    style={{
                      borderRadius: wp(5.6),
                      marginTop: hp(1.4),
                      padding: wp(5.6),
                    }}>
                    <Bg_view
                      no_bg
                      horizontal
                      style={{
                        justifyContent: 'space-between',
                        marginBottom: hp(1.4),
                      }}>
                      <Fr_text opacity={0.8}>Pre-approved amount</Fr_text>
                      <Fr_text bold>{`${'\u20A6'}${comma_separate_figure(
                        amount,
                      )}`}</Fr_text>
                    </Bg_view>

                    <Line color={grey} />
                    <Bg_view
                      no_bg
                      horizontal
                      style={{
                        justifyContent: 'space-between',
                        marginVertical: hp(1.4),
                      }}>
                      <Fr_text opacity={0.8}>Monthly payment</Fr_text>
                      <Fr_text bold>{`${'\u20A6'}${comma_separate_figure(
                        calculate_monthly_payment(amount, payment_plan),
                      )}`}</Fr_text>
                    </Bg_view>

                    <Line color={grey} />

                    <Bg_view
                      no_bg
                      horizontal
                      style={{
                        justifyContent: 'space-between',
                        marginTop: hp(1.4),
                      }}>
                      <Fr_text opacity={0.8}>Tenor</Fr_text>
                      <Fr_text bold>{`${payment_plan} Months`}</Fr_text>
                    </Bg_view>
                  </Bg_view>
                  <Bg_view>
                    <Stretched_button
                      style={{marginHorizontal: 0}}
                      bg={purple}
                      title="Accept"
                      action={this.accept}
                    />
                  </Bg_view>
                </Bg_view>
              </ScrollView>
            </Bg_view>
          );
        }}
      </User.Consumer>
    );
  }
}

export default Payment_breakdown;
export {comma_separate_figure, calculate_monthly_payment};
