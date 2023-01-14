import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {User} from '../../Cardy';
import Bg_view from '../Components/Bg_view';
import Fr_text from '../Components/Fr_text';
import Listfooter from '../Components/listfooter';
import {wp} from '../utils/dimensions';
import Feather from 'react-native-vector-icons/Feather';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {new_txs: new Array()};
  }

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  render() {
    return (
      <User.Consumer>
        {user => {
          let {firstname} = user;

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
                    <Feather name="user" color="green" />
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Fr_text capitalise size={wp(4.5)}>
                        {firstname}
                      </Fr_text>
                    </View>

                    <View style={{width: wp(5)}} />
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
