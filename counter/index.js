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

const CounterStyles = StyleSheet.create({
  window: {
    flex: 1,
    justifyContent: 'center',
  },

  time: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },

  inputLabel: {
    fontSize: 16,
  },

  inputLine: {
    margin: 12,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 16,
  },
});

export default class Counter extends React.Component {
  constructor(props) {
    super(props);

    const inputStates = {
      rest: '',
      work: '',
      cycles: '',
    };

    this.state = {
      timerConfig: {
        rest: 1,
        work: 1,
        cycles: 0,
        sound: 'default',
      },
      timerState: {
        type: '',
        time: 0,
        started: false,
        on: false,
      },
      timerEvents: {
        change: {
          work: this.createTimerChange('work'),
          rest: this.createTimerChange('rest'),
          cycles: this.createTimerChange('cycles'),
        },
        blur: {
          work: this.createTimerBlur('work'),
          rest: this.createTimerBlur('rest'),
          cycles: this.createTimerBlur('cycles'),
        },
      },
      inputStates,
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

  createTimerBlur(type) {
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

  onWorkBlur = () => {
    const { timerConfig, inputStates } = this.state;

    const value = inputStates.work;
    const normalizedValue = Number(value)
      ? value
      : '0';

    this.setState({
      ...this.state,
      timerConfig: {
        ...timerConfig,
        work: Number(normalizedValue),
      },
      inputStates: {
        ...inputStates,
        work: normalizedValue,
      },
    });
  }

  onWorkChange = (value) => {
    const { inputStates } = this.state;

    this.setState({
      ...this.state,
      inputStates: {
        ...inputStates,
        work: value,
      },
    });
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
      timerState: { time, type },
      inputStates,
      timerState,
      timerEvents: {
       change,
       blur,
      }
    } = this.state;

    const timerStateLabel = type === 'rest'
      ? 'Repos'
      : 'Go'

    let toggleButton = null;

    if (timerState.started) {
      toggleButton = (
        <TouchableOpacity
          style={CounterStyles.button}
          onPress={this.togglePause}
        >
          <Text>{timerState.on ? 'Pause' : 'Reprendre'}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <ScrollView contentContainerStyle={CounterStyles.window}>
        <View>
          <Text style={CounterStyles.time}>{ time }</Text>
        </View>
        <View>

        <View>
          <Text style={CounterStyles.time}>
            {type ? `${timerStateLabel} !!` : 'En attente' }
          </Text>
        </View>

          <View style={CounterStyles.inputLine}>
            <Text style={CounterStyles.inputLabel}>
              { 'Work time :' }
            </Text>
            <TextInput
              value={inputStates.work}
              onBlur={blur.work}
              onChangeText={change.work}
            />
          </View>

          <View style={CounterStyles.inputLine}>
            <Text style={CounterStyles.inputLabel}>
              { 'Rest time :' }
            </Text>
            <TextInput
              value={inputStates.rest}
              onBlur={blur.rest}
              onChangeText={change.rest}
            />
          </View>

          <View style={CounterStyles.inputLine}>
            <Text style={CounterStyles.inputLabel}>
              { 'Cycles :' }
            </Text>
            <TextInput
              value={inputStates.cycles}
              onBlur={blur.cycles}
              onChangeText={change.cycles}
            />
          </View>
        </View>
        <View>
          {
            !timerState.started
            ? (
              <TouchableOpacity
                style={CounterStyles.button}
                onPress={this.go}
                >
                <Text>Go</Text>
                </TouchableOpacity>
            )
            : null  

          }

          { toggleButton }
          
          <TouchableOpacity
            style={CounterStyles.button}
            onPress={this.resetChrono}
          >
            <Text>Reset Chrono</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={CounterStyles.button}
            onPress={this.resetConfig}
          >
            <Text>Reset config</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}