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

const CounterControlsStyles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.SECONDARY,
    alignItems: 'center',
    padding: SCALES._1,
    margin: SCALES._2,
  },
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
        <TouchableOpacity
          style={CounterControlsStyles.button}
          onPress={togglePause}
        >
          <Text>{chronoActive ? 'Pause' : 'Reprendre'}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
      {
        !timerStarted
        ? (
          <TouchableOpacity
            style={CounterControlsStyles.button}
            onPress={go}
            >
            <Text>Go</Text>
            </TouchableOpacity>
        )
        : null  

      }

      { toggleButton }
      
      <TouchableOpacity
        style={CounterControlsStyles.button}
        onPress={resetChrono}
      >
        <Text>Reset Chrono</Text>
      </TouchableOpacity>
    </View>
    );
  }
}
