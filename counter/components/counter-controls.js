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

const CounterControlsStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 16,
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
      <ScrollView>
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

      <TouchableOpacity
        style={CounterControlsStyles.button}
        onPress={resetConfig}
      >
        <Text>Reset config</Text>
      </TouchableOpacity>
    </ScrollView>
    );
  }
}
