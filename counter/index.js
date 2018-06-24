import * as React from 'react';
import timer from 'react-native-timer';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import CounterControls from './components/counter-controls';
import CounterForm from './components/counter-form';
import TimerDisplay from './components/timer-display';

const CounterStyles = StyleSheet.create({
  window: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 64,
  },
});

export default class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timerConfig: {
        rest: 1,
        work: 3,
        cycles: 0,
        sound: 'default',
      },
      timerState: {
        type: '',
        time: 0,
        started: false,
        on: false,
      },
      onTimerConfigChange: {
        work: this.createTimerChange('work'),
        rest: this.createTimerChange('rest'),
        cycles: this.createTimerChange('cycles'),
      },
    };
  }

  componentWillUnmount() {
    timer.clearInterval('chrono');
  }

  componentDidMount() {
    timer.setInterval(
      'chrono',
      this.timerTick,
      1000,
    );
  }

  timerTick = () => {
    const { onTimerSound } = this.props;
    const { timerState, timerConfig } = this.state;

    if (timerState.on) {
      const newTime = timerState.time - 1;
      const shouldReset = newTime === -1
        ? true
        : false;
      const nextType = timerState.type === 'work'
        ? 'rest'
        : 'work';

      this.setState({
        ...this.state,
        timerState: {
          ...timerState,
          type: shouldReset ? nextType : timerState.type,
          time: shouldReset ? timerConfig[nextType] : newTime,
        }
      }, () => {
        if (shouldReset) {
          onTimerSound();
        }
      })
    }
  }

  createTimerChange(type) {
    return (value) =>  {
      const { timerConfig } = this.state;
      const normalizedValue = Number(value)
        ? Number(value)
        : 0;
  
      this.setState({
        ...this.state,
        timerConfig: {
          ...timerConfig,
          [type]: Number(normalizedValue),
        },
      });
    }
  }

  go = () => {
    const { timerState, timerConfig } = this.state;
    this.setState({
      ...this.state,
      timerState: {
        ...timerState,
        started: true,
        on: true,
        type: 'rest',
        time: timerConfig.rest,
      }
    })
  }

  resetChrono = () => {
    const { timerState, timerConfig } = this.state;

    this.setState({
      ...this.state,
      timerState: {
        ...timerState,
        started: false,
        on: false,
        time: timerConfig.rest,
        type: '',
      },
    })
  }

  resetConfig = () => {
    const { timerConfig } = this.state;

    this.setState({
      ...this.state,
      timerConfig: {
        rest: 0,
        work: 0,
        cycles: 0,
        sound: 'default',
      },
      inputState: {
        rest: '',
        work: '',
        cycles: '',
      },
    });
  }

  togglePause = () => {
    const { timerState } = this.state;

    this.setState({
      ...this.state,
      timerState: {
        ...timerState,
        on: !timerState.on,
      }
    });
  }

  getPercentageLeft() {
    const { timerState, timerConfig } = this.state;
    const type = timerState.type;

    if (timerState.on) {
      return Math.round(
        100 * timerState.time / Number(timerConfig[type])
      );
    }

    return 0;
  }

  render() {
    const {
      timerState: { time, type, on, started },
      onTimerConfigChange,
    } = this.state;

    return (
      <View style={CounterStyles.window}>

        <TimerDisplay
          time={time}
          type={type}
          percent={this.getPercentageLeft()}
        />

        <CounterForm
          onTimerConfigChange={onTimerConfigChange}
        />

        <CounterControls
          timerStarted={started}
          chronoActive={on}
          togglePause={this.togglePause}
          go={this.go}
          resetChrono={this.resetChrono}
          resetConfig={this.resetConfig}
        />
      </View>
    );
  }
}