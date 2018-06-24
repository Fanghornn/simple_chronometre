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
    return () =>  {
      const { timerConfig, inputStates } = this.state;

      const value = inputStates[type];
      const normalizedValue = Number(value)
        ? value
        : '0';
  
      this.setState({
        ...this.state,
        timerConfig: {
          ...timerConfig,
          [type]: Number(normalizedValue),
        },
        inputStates: {
          ...inputStates,
          [type]: normalizedValue,
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

  render() {
    const {
      timerState: { time, type, on, started },
      onTimerConfigChange,
    } = this.state;

    return (
      <ScrollView contentContainerStyle={CounterStyles.window}>

        <TimerDisplay
          time={time}
          type={type}
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
      </ScrollView>
    );
  }
}