import React from 'react';
import {
  View,
  TouchableNativeFeedback,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Header from '../Components/header';
import {hp, wp} from '../utils/dimensions';
import {sentence} from '../utils/functions';
import {grey, purple} from './splash';
import Feather from 'react-native-vector-icons/Feather';
import Stretched_button from '../Components/Stretched_button';
import Cool_modal from '../Components/cool_modal';
import Line from '../Components/line';
import Listfooter from '../Components/listfooter';

class Apply_for_rent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.accomodation_statuses[0],
      payment_plan: 1,
      amount: 0,
      monthly_earning: 0,
    };

    this.monthly_plans = new Array();
    for (let i = 0; i < 12; i++) this.monthly_plans.push(i);
  }

  accomodation_statuses = new Array(
    'looking to renew my rent',
    'want to pay for a new place',
    "I'm still searching",
  );

  accomodation_status = status => {
    let is_selected_status = status === this.state.status;

    return (
      <TouchableNativeFeedback
        key={status}
        style={{borderRadius: wp(2.8)}}
        onPress={() => this.setState({status})}>
        <View style={{marginHorizontal: wp(1.4), borderRadius: wp(2.8)}}>
          <Bg_view
            no_bg
            shadowed
            style={{
              borderColor: is_selected_status ? purple : grey,
              borderWidth: 1,
              borderRadius: wp(2.4),
              paddingVertical: hp(2.4),
              alignItems: 'center',
              marginVertical: hp(1.4),
              elevation: 2,
            }}>
            <Fr_text
              sentence
              accent={is_selected_status}
              color={is_selected_status ? null : grey}>
              {sentence(status)}
            </Fr_text>
          </Bg_view>
        </View>
      </TouchableNativeFeedback>
    );
  };

  text_input = (label, value, setter) => {
    return (
      <Bg_view>
        <Fr_text size={wp(3.8)} opacity={0.8}>
          {label}
        </Fr_text>

        <Bg_view
          shadowed
          style={{
            height: hp(7.5),
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: wp(2.8),
            marginBottom: hp(2.8),
            marginTop: hp(1.4),
            paddingHorizontal: wp(4),
            paddingRight: wp(2.8),
            elevation: 2,
          }}>
          <TextInput
            placeholder="Amount"
            placeholderTextColor={grey}
            keyboardType="decimal-pad"
            onChangeText={setter}
            value={value || ''}
            style={{
              flex: 1,
              fontSize: wp(4.5),
              color: purple,
              marginRight: wp(1.4),
            }}
          />
        </Bg_view>
      </Bg_view>
    );
  };

  toggle_payment_modal = () => this.payment_plan_modal?.toggle();

  set_amount = amount => this.setState({amount});

  set_monthly_earning = monthly_earning => this.setState({monthly_earning});

  set_payment_plan = payment_plan =>
    this.setState({payment_plan}, this.toggle_payment_modal);

  next = async () => {
    let {payment_plan, loading, status, amount, monthly_earning} = this.state;

    if (loading) return;
    this.setState({loading: true});

    let request = {
      payment_plan: Number(payment_plan),
      monthly_earning: Number(monthly_earning),
      accomodation_status: status,
      amount: Number(amount),
    };

    this.props.navigation.navigate('payment_breakdown', {request});
    this.setState({loading: false});
  };

  render = () => {
    let {navigation} = this.props;
    let {amount, monthly_earning, loading, payment_plan} = this.state;

    return (
      <Bg_view flex>
        <Header title="Rent Application" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <Bg_view style={{margin: wp(5.6)}}>
              <Fr_text opacity={0.7} bold>
                My Rent
              </Fr_text>
            </Bg_view>
            <Bg_view style={{paddingHorizontal: wp(5.6)}}>
              <Bg_view style={{marginBottom: hp(4)}}>
                <Bg_view horizontal style={{justifyContent: 'space-between'}}>
                  <Fr_text color={purple} bold>
                    Payment Option
                  </Fr_text>

                  <Fr_text style={{marginRight: wp(2)}}>1 of 3</Fr_text>
                </Bg_view>
              </Bg_view>

              <Bg_view>
                <Fr_text>What is your accomodation status?</Fr_text>

                {this.accomodation_statuses.map(status =>
                  this.accomodation_status(status),
                )}

                <Bg_view style={{marginTop: hp(2.4)}} />

                {this.text_input(
                  'How much is your rent request amount?',
                  amount,
                  this.set_amount,
                )}

                {this.text_input(
                  'How much do you earn monthly?',
                  monthly_earning,
                  this.set_monthly_earning,
                )}

                <Fr_text>Choose a monthly payment plan</Fr_text>

                <TouchableNativeFeedback onPress={this.toggle_payment_modal}>
                  <View>
                    <Bg_view
                      horizontal
                      shadowed
                      style={{
                        height: hp(7.5),
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: wp(4),
                        marginBottom: hp(2.8),
                        marginTop: hp(1.4),
                        paddingHorizontal: wp(4),
                        paddingRight: wp(2.8),
                        justifyContent: 'space-between',
                      }}>
                      <Fr_text opacity={0.8}>{`${payment_plan} Month`}</Fr_text>
                      <Feather name="chevron-down" size={wp(5)} color={grey} />
                    </Bg_view>
                  </View>
                </TouchableNativeFeedback>
                <Stretched_button
                  loading={loading}
                  disabled={amount <= 0 || monthly_earning <= 0}
                  title="Next"
                  style={{marginHorizontal: 0}}
                  action={this.next}
                />
              </Bg_view>
            </Bg_view>
          </KeyboardAvoidingView>
        </ScrollView>

        <Cool_modal
          ref={payment_plan_modal =>
            (this.payment_plan_modal = payment_plan_modal)
          }>
          <Bg_view style={{maxHeight: hp(75)}}>
            <Bg_view
              style={{padding: wp(5.6), alignItems: 'center'}}
              horizontal>
              <TouchableWithoutFeedback onPress={this.toggle_payment_modal}>
                <Feather
                  name="chevron-down"
                  size={wp(4.5)}
                  color={purple}
                  style={{marginRight: wp(4)}}
                />
              </TouchableWithoutFeedback>
              <Fr_text bold>Monthly Payment Plan</Fr_text>
            </Bg_view>

            <Line />

            <ScrollView showsVerticalScrollIndicator={false}>
              {this.monthly_plans.map(index => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => this.set_payment_plan(index + 1)}>
                    <View>
                      <Bg_view
                        shadowed
                        style={{
                          padding: wp(4.5),
                          margin: wp(2.4),
                          marginHorizontal: wp(5.6),
                        }}>
                        <Fr_text>{`${index + 1} Month`}</Fr_text>
                      </Bg_view>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}

              <Listfooter />
            </ScrollView>
          </Bg_view>
        </Cool_modal>
      </Bg_view>
    );
  };
}

export default Apply_for_rent;
