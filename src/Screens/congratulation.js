import React from 'react';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Stretched_button from '../Components/Stretched_button';
import {hp, wp} from '../utils/dimensions';

class Congratulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  done = () => {
    let {navigation, route} = this.props;
    let {user} = route.params;
  };

  render = () => {
    return (
      <Bg_view style={{alignItems: 'center', paddingTop: hp(25)}} flex>
        <Fr_text bold="900" size={wp(7)}>
          Congratulation!
        </Fr_text>

        <Bg_view
          style={{
            width: wp(86),
            marginTop: hp(12.5),
          }}>
          <Stretched_button title="done!" action={this.done} />
        </Bg_view>
      </Bg_view>
    );
  };
}

export default Congratulation;
