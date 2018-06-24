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
  inputLabel: {
    fontSize: 16,
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
      <ScrollView>
        <View style={CounterControlsStyles.inputLine}>
          <Text style={CounterControlsStyles.inputLabel}>
            { 'Work time :' }
          </Text>
          <TextInput
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
            value={inputStates.cycles}
            onBlur={onTimerConfigChange.cycles}
            onChangeText={inputChangeEvents.cycles}
          />
        </View>
      </ScrollView>
    );
  }
}
