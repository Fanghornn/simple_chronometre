import React from 'react';
import { StyleSheet, Text, View, Animated, ScrollView } from 'react-native';
import Sound from 'react-native-sound';

import Counter from './counter';
import { COLORS } from './ui';

const styles = {
  flex: 1,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Enable playback in silence mode
    Sound.setCategory('Playback', true);

    this.state = {
      backgroundAnim: new Animated.Value(0),
      animLoop: null,
    };
  }

  componentDidMount() {
    let value = 0;

    this.state.animLoop = setInterval(() => {
      const newValue = value === 0
        ? 1
        : 0;
      value = newValue;

      Animated.timing(this.state.backgroundAnim, {
        toValue: value,
        duration: 1000,
        // useNativeDriver: true, // <-- Add this
      }).start();        
    },1500)
  }

  playSound = () => {
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    const bell = new Sound('bell.m4a', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // Play the sound with an onEnd callback
      bell.play((success) => {
        if (!success) {
          console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          bell.reset();
        }

        bell.release();
      });
    });
  }

  render() {
    const { backgroundAnim } = this.state;
    const backgroundStyle = backgroundAnim.interpolate({
      inputRange: [0, 1],
      // outputRange: ['#11ff11', '#000000']  // 0 : 150, 0.5 : 75, 1 : 0
      outputRange: [COLORS.PRIMARY, COLORS.PRIMARY_DARKER],
    });

    const style = Object.assign(styles, { backgroundColor: backgroundStyle }, {});

    return (
      <Animated.View style={style}>
        <ScrollView>
          <Counter onTimerSound={this.playSound} />
        </ScrollView>
      </Animated.View>
    );
  }
}
