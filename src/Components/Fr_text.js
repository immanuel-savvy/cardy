import React from 'react';
import {Text} from 'react-native';
import {purple} from '../Screens/splash';
import {wp} from '../utils/dimensions';

class Fr_text extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    let {
      children,
      style,
      capitalise,
      accent,
      caps,
      size,
      color,
      centralise,
      bold,
      line_height,
      opacity,
      italic,
    } = this.props;

    if (!style) style = new Object();
    if (capitalise || caps)
      style.textTransform = caps ? 'uppercase' : 'capitalize';
    if (color) style.color = color;
    if (accent) style.color = purple;
    if (bold) {
      style.fontFamily = bold === '900' ? 'poppins_900' : 'poppins_600';
      style.fontWeight = bold === '900' ? '900' : 'bold';
    }
    if (size) style.fontSize = size;
    if (centralise) style.textAlign = 'center';
    if (line_height) style.lineHeight = line_height;
    if (opacity) style.opacity = opacity;
    if (italic) style.fontStyle = 'italic';

    return (
      <Text
        {...this.props}
        style={{
          fontSize: wp(4),
          color: '#000',
          fontFamily: 'poppins_regular',
          ...style,
        }}>
        {children}
      </Text>
    );
  };
}

export default Fr_text;
