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
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Colors from '../../ui/colors';

const TimerStyles = StyleSheet.create({
  container: {
  },
  time: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    ...Colors.text,
  },
  status: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    ...Colors.text,
  },
  circleView: {
    alignSelf: 'center',
    marginBottom: 16,
  }
});

export default class TimerDisplay extends React.Component {
  render() {
    const { type, time, percent } = this.props;

    const timerStateLabel = type === 'rest'
      ? 'Repos'
      : 'Go'

    return (
      <View style={TimerStyles.container}>
        <View style={TimerStyles.circleView}>
          <AnimatedCircularProgress
            size={220}
            width={32}
            fill={percent}
            tintColor={Colors.accent.backgroundColor}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor={Colors.divider.borderColor}
          >
            {
              () => (
                <Text style={TimerStyles.time}>{ time }</Text>
              )
            }
          </AnimatedCircularProgress>
        </View>

        <View>
          <Text style={TimerStyles.status}>
            {type ? `${timerStateLabel} !!` : 'En attente' }
          </Text>
        </View>
      </View>
    );
  }
}
