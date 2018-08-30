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

import { SCALES } from '../ui';
import { DEFAULT_TIMER_CONFIG } from '../counter/constants';

const CounterStyles = StyleSheet.create({
  window: {
    flex: 1,
    justifyContent: 'center',
    marginTop: SCALES._12,
  },
});

export default class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timerConfig: {
        ...DEFAULT_TIMER_CONFIG,
        sound: 'default',
      },
      timerState: {
        type: '',
        time: 0,
        cyclesLeft: 0,
        started: false,
        on: false,
      },
      countDown: {
        time: 5,
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
      this.initTimerTick,
      1000,
    );
  }

  initTimerTick = () => {
    const {
      timerState: { on: timerOn },
      countDown: { on: countDownOn },
    } = this.state;

    if (timerOn) {
      this.timerTick()
    } else if (countDownOn) {
      this.countDownTick();
    }
  }

  countDownTick = () => {
    const {
      onTimerSound,
    } = this.props;
    const { countDown, timerState, timerConfig } = this.state;
    const { time, on } = countDown;

    const countDownFinished = time === 0
      ? true
      : false;

    if (countDownFinished) {
      this.setState({
        ...this.state,
        timerState: {
          ...timerState,
          started: true,
          on: true,
          type: 'work',
          cyclesLeft: timerConfig.cycles,
          time: timerConfig.work,
        },
        countDown: {
          ...countDown,
          on: false,
        },
      }, onTimerSound);
    } else {
      this.setState({
        ...this.state,
        countDown: {
          ...countDown,
          time: (time - 1),
        }
      });
    };
  }

  timerTick = () => {
    const { onTimerSound } = this.props;
    const { timerState, timerConfig } = this.state;

    if (timerState.on) {
      const nextType = timerState.type === 'work'
        ? 'rest'
        : 'work';
      const newTime = timerState.time - 1;
      const shouldReset = newTime === -1
        ? true
        : false;
      const newCycles = shouldReset && nextType === 'rest'
        ? timerState.cyclesLeft - 1
        : timerState.cyclesLeft;
      const shouldStop = newCycles === 0;

      this.setState({
        ...this.state,
        timerState: {
          ...timerState,
          type: shouldReset ? nextType : timerState.type,
          time: shouldReset ? timerConfig[nextType] : newTime,
          cyclesLeft: newCycles,
          on: shouldStop ? false : true,
          started: shouldStop ? false : true,
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

  launchCountDown = () => {
    const { countDown } = this.state;

    this.setState({
      ...this.state,
      countDown: {
        ...countDown,
        on: true,
      },
    });
  }

  resetChrono = () => {
    const { timerState, timerConfig } = this.state;

    this.setState({
      ...this.state,
      timerState: {
        ...timerState,
        started: false,
        on: false,
        time: 0,
        type: '',
      },
      countDown: {
        on: false,
        time: 5,
      }
    })
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
    const { timerState, timerConfig, countDown } = this.state;
    const type = timerState.type;

    if (timerState.started) {
      return Math.round(
        100 * timerState.time / Number(timerConfig[type]),
      );
    }

    if (countDown.on) {
      return Math.round(
        100 * countDown.time / 5,
      );
    }

    return 100;
  }

  getTimeToDisplay = () => {
    const {
      timerState: { time: timerTime, on: timerOn },
      countDown: { time: countDownTime, on: countDownOn },
    } = this.state;

    if (!timerOn && !countDownOn) return '--';

    if (timerOn) return timerTime;

    if (countDownOn) return countDownTime;
  }

  render() {
    const {
      timerState: { time, type, on, started },
      onTimerConfigChange,
    } = this.state;

    const timeToDisplay = this.getTimeToDisplay();

    return (
      <View style={CounterStyles.window}>
        <TimerDisplay
          time={timeToDisplay}
          type={type}
          paused={!on}
          started={started}
          percent={this.getPercentageLeft()}
        />

        <CounterForm
          onTimerConfigChange={onTimerConfigChange}
        />

        <CounterControls
          timerStarted={started}
          chronoActive={on}
          togglePause={this.togglePause}
          go={this.launchCountDown}
          resetChrono={this.resetChrono}
        />
      </View>
    );
  }
}