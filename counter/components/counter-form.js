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

import { FACES, SCALES, COLORS } from '../../ui';
import { DEFAULT_TIMER_CONFIG } from '../constants';

const CounterControlsStyles = StyleSheet.create({
  container: {},
  inputLabel: {
    ...FACES.INPUT_LABEL,
  },
  inputText: {
    ...FACES.INPUT_TEXT,
  },
  inputLine: {
    margin: SCALES._1,
  },
});

export default class CounterForm extends React.Component {
  constructor(props) {
    super(props);

    const configAsString = {
      work: DEFAULT_TIMER_CONFIG.work.toString(),
      rest: DEFAULT_TIMER_CONFIG.rest.toString(),
      cycles: DEFAULT_TIMER_CONFIG.cycles.toString(),
    }

    this.state = {
      inputStates: {
        ...configAsString,
      },
      inputChangeEvents: {
        work: this.createTimerChange('work'),
        rest: this.createTimerChange('rest'),
        cycles: this.createTimerChange('cycles'),
      }
    };
  }

  createTimerChange(type) {
    return (value) => {
      const { inputStates } = this.state;

      this.setState({
        ...this.state,
        inputStates: {
          ...inputStates,
          [type]: value,
        },
      });
    }
  }

  render() {
    const { onTimerConfigChange } = this.props;
    const { inputStates, inputChangeEvents } = this.state;

    return (
      <View style={CounterControlsStyles.container}>
        <View style={CounterControlsStyles.inputLine}>
          <Text style={CounterControlsStyles.inputLabel}>
            { 'Temps exercice:' }
          </Text>
          <TextInput
            clearTextOnFocus={true}
            underlineColorAndroid={COLORS.TEXTS}
            keyboardType='numeric'
            style={CounterControlsStyles.inputText}
            value={inputStates.work}
            onBlur={() => {
              onTimerConfigChange.work(inputStates.work);
            }}
            onChangeText={inputChangeEvents.work}
          />
        </View>
    
        <View style={CounterControlsStyles.inputLine}>
          <Text style={CounterControlsStyles.inputLabel}>
            { 'Temps repos :' }
          </Text>
          <TextInput
            clearTextOnFocus={true}
            underlineColorAndroid={COLORS.TEXTS}
            keyboardType='numeric'
            style={CounterControlsStyles.inputText}
            value={inputStates.rest}
            onBlur={() => {
              onTimerConfigChange.rest(inputStates.rest);
            }}
            onChangeText={inputChangeEvents.rest}
          />
        </View>
    
        <View style={CounterControlsStyles.inputLine}>
          <Text style={CounterControlsStyles.inputLabel}>
            { 'Nombre de cycles :' }
          </Text>
          <TextInput
            clearTextOnFocus={true}
            underlineColorAndroid={COLORS.TEXTS}
            keyboardType='numeric'
            style={CounterControlsStyles.inputText}
            value={inputStates.cycles}
            onBlur={() => {
              onTimerConfigChange.cycles(inputStates.cycles);
            }}
            onChangeText={inputChangeEvents.cycles}
          />
        </View>
      </View>
    );
  }
}
