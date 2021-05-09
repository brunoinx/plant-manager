import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={ styles.button }
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={ styles.text }>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '90%',
    backgroundColor: colors.green,
    borderRadius: 10,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 18,
    lineHeight: 23,
    color: colors.white,
  },
});
