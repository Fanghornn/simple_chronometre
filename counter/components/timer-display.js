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

const TimerStyles = StyleSheet.create({
  time: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default class TimerDisplay extends React.Component {
  render() {
    const { type, time } = this.props;

    const timerStateLabel = type === 'rest'
      ? 'Repos'
      : 'Go'

    return (
      <ScrollView>
        <View>
          <Text style={TimerStyles.time}>{ time }</Text>
        </View>

        <View>
          <Text style={TimerStyles.time}>
            {type ? `${timerStateLabel} !!` : 'En attente' }
          </Text>
        </View>
      </ScrollView>
    );
  }
}
