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

import { SCALES, FACES, COLORS } from '../../ui';

import { MaterialButton } from '../../ui/components';

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
        >
          <Text>{chronoActive ? 'Pause' : 'Reprendre'}</Text>
        </MaterialButton>
      );
    }

    return (
      <View>
      {
        !timerStarted
        ? (
          <MaterialButton
            onPress={go}
            text={"Go}
            >
          </MaterialButton>
        )
        : null  
      }

      { toggleButton }
      
      <MaterialButton
        onPress={resetChrono}
        text={"Reset Chrono"}
      >
      </MaterialButton>
    </View>
    );
  }
}
