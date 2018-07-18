import { StyleSheet } from 'react-native';

export const COLORS = {
  PRIMARY: '#F18F01', // Tangerine
  PRIMARY_DARKER: '#D84A05', // Sinopia
  SECONDARY: '#564138', // Dark liver
  SECONDARY_DARKER: '#353531', // Jet
  ACCENT: '#F1F7ED', // Isabelline
  TEXTS: '#333333',
};

export const SCALES = {
  _1: 12,
  _2: 16,
  _3: 20,
  _4: 24,
  _5: 28,
  _6: 32,
  _7: 36,
  _8: 40,
  _12: 64,
};

export const FACES = {
  BIG_TEXT: {
    fontSize: SCALES._6,
    color: COLORS.TEXTS,
    fontWeight: 'bold',
  },

  HEADING_1: {
    color: COLORS.TEXTS,
    fontWeight: 'bold',
    fontSize: SCALES._5,
  },

  HEADING_2: {
    color: COLORS.TEXTS,
    fontWeight: 'bold',
    fontSize: SCALES._4,
  },

  HEADING_3: {
    color: COLORS.TEXTS,
    fontWeight: 'bold',
    fontSize: SCALES._3,
  },

  INPUT_LABEL: {
    color: COLORS.TEXTS,
    fontWeight: 'bold',
    fontSize: SCALES._3,
  },

  INPUT_TEXT: {
    color: COLORS.TEXTS,
    fontWeight: 'bold',
    fontSize: SCALES._3,
  },
}
