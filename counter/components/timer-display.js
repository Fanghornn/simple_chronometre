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

import { FACES, SCALES, COLORS } from '../../ui';

const TimerStyles = StyleSheet.create({
  container: {
  },
  time: {
    textAlign: 'center',
    ...FACES.BIG_TEXT
  },
  status: {
    ...FACES.BIG_TEXT,
    textAlign: 'center',
  },
  circleView: {
    alignSelf: 'center',
    marginBottom: SCALES._2,
  }
});

export default class TimerDisplay extends React.Component {

  getTimerStatusText = () => {
    const {
      type,
      time,
      started,
      paused,
    } = this.props;

    if (started && paused) return 'Pause';

    if (started && type){
      return type === 'rest'
        ? 'Repos...'
        : 'Go!!!'
    }

    return '';
  }

  render() {
    const {
      type,
      time,
      percent,
      started,
    } = this.props;

    const timerStateLabel = type === 'rest'
      ? 'Repos...'
      : 'Go !!!'

    return (
      <View style={TimerStyles.container}>
        <View style={TimerStyles.circleView}>
          <AnimatedCircularProgress
            size={220}
            width={32}
            fill={percent}
            tintColor={COLORS.ACCENT}
            backgroundColor={COLORS.SECONDARY_DARKER}
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
            { this.getTimerStatusText() }
          </Text>
        </View>
      </View>
    );
  }
}
