import React from 'react';
import {emitter} from '../../Cardy';
import {
  calculate_monthly_payment,
  comma_separate_figure,
} from '../Screens/Payment_breakdown';
import {grey} from '../Screens/splash';
import {hp, wp} from '../utils/dimensions';
import {post_request} from '../utils/services';
import Bg_view from './Bg_view';
import Cool_modal from './cool_modal';
import Fr_text from './Fr_text';
import Small_btn from './small_btn';
import Text_btn from './Text_btn';

class Pending_request extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle_cancel_request = () => this.cancel_request_modal?.toggle();

  cancel = async () => {
    let {request} = this.props;

    await post_request(`remove_request/${request.request._id}`);

    emitter.emit('request_removed');
  };

  render() {
    let {request} = this.props;
    let {amount, payment_plan} = request.request;

    return (
      <Bg_view style={{padding: wp(5.6)}}>
        <Fr_text>Awaiting Approval</Fr_text>

        <Bg_view
          background_color="#eae9fa"
          style={{
            borderRadius: wp(5.6),
            marginTop: hp(1.4),
            padding: wp(5.6),
          }}>
          <Bg_view no_bg horizontal style={{justifyContent: 'space-between'}}>
            <Fr_text opacity={0.8}>Pre-approved amount</Fr_text>
            <Fr_text bold>{`${'\u20A6'}${comma_separate_figure(
              amount,
            )}`}</Fr_text>
          </Bg_view>
          <Bg_view
            no_bg
            horizontal
            style={{
              justifyContent: 'space-between',
              marginVertical: hp(2.8),
            }}>
            <Fr_text opacity={0.8}>Monthly payment</Fr_text>
            <Fr_text bold>{`${'\u20A6'}${comma_separate_figure(
              calculate_monthly_payment(amount, payment_plan),
            )}`}</Fr_text>
          </Bg_view>
          <Bg_view no_bg horizontal style={{justifyContent: 'space-between'}}>
            <Fr_text opacity={0.8}>Tenor</Fr_text>
            <Fr_text bold>{`${payment_plan} Months`}</Fr_text>
          </Bg_view>

          <Bg_view style={{alignItems: 'center', marginTop: hp(1.4)}} no_bg>
            <Text_btn
              text="Cancel request"
              italic
              action={this.toggle_cancel_request}
            />
          </Bg_view>
        </Bg_view>

        <Cool_modal
          align="center"
          ref={cancel_request_modal =>
            (this.cancel_request_modal = cancel_request_modal)
          }>
          <Bg_view style={{alignItems: 'center'}}>
            <Fr_text bold italic>
              Are you sure to withdraw request?
            </Fr_text>

            <Bg_view
              horizontal
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: hp(2.8),
              }}>
              <Small_btn title="proceed" action={this.cancel} />
              <Bg_view style={{width: wp(5.6)}} />
              <Small_btn
                title="close"
                bg={grey}
                action={this.toggle_cancel_request}
              />
            </Bg_view>
          </Bg_view>
        </Cool_modal>
      </Bg_view>
    );
  }
}

export default Pending_request;
