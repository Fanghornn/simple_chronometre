import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Container, Button, Icon, Text } from 'native-base';

import { FACES, SCALES, COLORS } from '../';

const MaterialButtonStyles = StyleSheet.create({

});

export default function MaterialButton({
  ...extraProps,
}) {
  return (
    <Button
      rounded
    >
      <Text>Dernier message Sarra 23:17 (Chatellet)</Text>
    </Button>
  );
}
