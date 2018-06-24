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

import Colors from '../../ui/colors';

const CounterControlsStyles = StyleSheet.create({
  container: {
    
  },
  inputLabel: {
    ...Colors.text,
    fontSize: 24,
  },
  inputText: {
    ...Colors.text,
    fontSize: 24,
  },
  inputLine: {
    margin: 12,
  },
});

export default class CounterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputStates: {
        rest: '1',
        work: '3',
        cycles: '',
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
            { 'Work time :' }
          </Text>
          <TextInput
            clearTextOnFocus={true}
            underlineColorAndroid={Colors.text.color}
            keyboardType='numeric'
            style={CounterControlsStyles.inputText}
            value={inputStates.work}
            onBlur={onTimerConfigChange.work}
            onChangeText={inputChangeEvents.work}
          />
        </View>
    
        <View style={CounterControlsStyles.inputLine}>
          <Text style={CounterControlsStyles.inputLabel}>
            { 'Rest time :' }
          </Text>
          <TextInput
            clearTextOnFocus={true}
            underlineColorAndroid={Colors.text.color}
            keyboardType='numeric'
            style={CounterControlsStyles.inputText}
            value={inputStates.rest}
            onBlur={onTimerConfigChange.rest}
            onChangeText={inputChangeEvents.rest}
          />
        </View>
    
        <View style={CounterControlsStyles.inputLine}>
          <Text style={CounterControlsStyles.inputLabel}>
            { 'Cycles :' }
          </Text>
          <TextInput
            clearTextOnFocus={true}
            underlineColorAndroid={Colors.text.color}
            keyboardType='numeric'
            style={CounterControlsStyles.inputText}
            value={inputStates.cycles}
            onBlur={onTimerConfigChange.cycles}
            onChangeText={inputChangeEvents.cycles}
          />
        </View>
      </View>
    );
  }
}
