import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {green} from '../Screens/splash';
import {hp, wp} from '../utils/dimensions';
import Bg_view from './Bg_view';
import Fr_text from './Fr_text';
import Loadindicator from './load_indicator';

class Stretched_button extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    let {
      action,
      title,
      style,
      border_radius,
      inverted,
      caps,
      loading,
      disabled,
      bg,
      no_margin,
    } = this.props;

    if (loading) disabled = loading;

    return (
      <View style={{margin: no_margin ? null : wp(5.6), ...style}}>
        <TouchableWithoutFeedback
          onPress={disabled ? null : action}
          disabled={disabled}>
          <View>
            <Bg_view
              accent={!inverted && !disabled}
              background_color={disabled ? '#ccc' : bg || null}
              horizontal
              style={{
                height: hp(7.5),
                borderRadius: border_radius || wp(2.8),
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 10,
                shadowColor: '#000',
                borderWidth: inverted ? 1.5 : null,
                borderColor: inverted ? (disabled ? '#DBD8DA' : green) : null,
              }}>
              <Fr_text
                bold
                size={wp(4)}
                caps={caps}
                capitalise
                color={inverted ? green : '#fff'}>
                {title}
              </Fr_text>
              {loading ? (
                <Loadindicator color={inverted ? null : '#fff'} />
              ) : null}
            </Bg_view>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
}

export default Stretched_button;
