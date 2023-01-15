import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {hp, wp} from '../utils/dimensions';
import Bg_view from './Bg_view';
import Fr_text from './Fr_text';
import Feather from 'react-native-vector-icons/Feather';

const Header = ({title, close_fn, no_transform, right_btn, navigation}) => {
  close_fn = navigation ? navigation.goBack : close_fn || (() => {});

  return (
    <Bg_view
      horizontal
      style={{alignItems: 'center', paddingVertical: hp(1.4)}}>
      <View style={{flex: 3}}>
        <TouchableWithoutFeedback onPress={close_fn}>
          <Feather
            name="arrow-left"
            size={wp(5.6)}
            style={{marginHorizontal: wp(2.8)}}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={{flex: right_btn ? 4 : 7, alignItems: 'center'}}>
        <Fr_text opacity={0.6} capitalise={!no_transform} bold size={wp(4.5)}>
          {`  ${title}`}
        </Fr_text>
      </View>
      <View style={{flex: 3, alignItems: 'flex-end'}}>{right_btn}</View>
    </Bg_view>
  );
};

export default Header;
