import React from 'react';
import {StatusBar} from 'react-native';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import {wp} from '../utils/dimensions';

let green = '#11cc80',
  purple = '#22255c',
  grey = '#DBD8DA';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <Bg_view
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar hidden />
        <Fr_text size={wp(10)} bold color={purple}>
          CARDY
        </Fr_text>
      </Bg_view>
    );
  };
}

export default Splash;
export {green, purple, grey};
