import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import {purple} from '../Screens/splash';
import {hp, wp} from '../utils/dimensions';
import Text_btn from './Text_btn';

class Small_btn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let {action, title, bg} = this.props;

    return (
      <TouchableNativeFeedback onPress={() => action && action()}>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: bg || purple,
            padding: wp(1.4),
            borderRadius: wp(1.4),
            marginBottom: hp(1.4),
          }}>
          <Text_btn capitalise text={title} color={bg ? purple : '#fff'} />
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default Small_btn;
