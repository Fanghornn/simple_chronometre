import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Sound from 'react-native-sound';

import Counter from './counter';
import { COLORS } from './ui';

const styles = {
  flex: 1,
  backgroundColor: COLORS.PRIMARY,
};

export default class App extends React.Component {
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
    return (
      <ScrollView style={styles}>
        <Counter onTimerSound={this.playSound} />
      </ScrollView>
    );
  }
}
