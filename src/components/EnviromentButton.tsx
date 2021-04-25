import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  isActive?: boolean;
}

export default function EnviromentButton({
  title, isActive = false, ...rest
}: EnviromentButtonProps) {
  return (
    <RectButton
      style={[
        styles.button,
        isActive && styles.buttonActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.title,
        isActive && styles.textActive
      ]}>
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 96,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: colors.shape,
  },
  buttonActive: {
    backgroundColor: colors.green_light,
  },
  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading
  },
  title: {
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
    fontFamily: fonts.text
  }
});
