import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'native-base';

import { SCALES, FACES, COLORS } from '../../ui';

import { MaterialButton } from '../../ui/components';

const counterStyles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    right: '0%',
    bottom: '0%',
    padding: SCALES._2,
  },
  buttonsContainer: {
    flex: 1,
    height: 175,
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: COLORS.SECONDARY_DARKER,
    width: 75,
    height: 75,
  },
  icons: {
    fontSize: SCALES._7,
  } ,
});

export default class CounterControls extends React.Component {
  constructor(props) {
    super(props); 
  };

  render() {
    const {
      timerStarted,
      go,
      resetChrono,
      resetConfig,
      togglePause,
      chronoActive
    } = this.props;

    let toggleButton = null;

    if (timerStarted) {
      toggleButton = (
        <MaterialButton
          onPress={togglePause}
          style={counterStyles.buttons}
          full
          rounded
        >
          <Icon name={chronoActive ? 'pause' : 'play'} style={counterStyles.icons}/>
        </MaterialButton>
      );
    }

    return (
      <View style={counterStyles.rootContainer}>
        <View style={counterStyles.buttonsContainer}>
        {
          !timerStarted
          ? (
            <MaterialButton
              onPress={go}
              style={counterStyles.buttons}
              rounded
              block
              >
              <Icon name="play" style={counterStyles.icons}/>
            </MaterialButton>
          )
          : null  
        }

        { toggleButton }
        
        <MaterialButton
          onPress={resetChrono}
          style={counterStyles.buttons}
          rounded
          block
        >
          <Icon name="power" style={counterStyles.icons}/>
        </MaterialButton>
      </View>
    </View>
    );
  }
}
