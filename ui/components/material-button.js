import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Container, Button, Text } from 'native-base';

import { FACES, SCALES, COLORS } from '../';

const MaterialButtonStyles = StyleSheet.create({

});

export default function MaterialButton({
  children,
  ...extraProps,
}) {
  return (
    <Button
      {...extraProps}
    >
      { children }
    </Button>
  );
}
