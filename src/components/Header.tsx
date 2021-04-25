import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors';
import profileImg from '../assets/profile.jpeg';
import fonts from '../styles/fonts';

interface HeaderProps {
  title: string;
}

export default function Header() {
  return (
    <View style={ styles.container }>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>Bruno</Text>
      </View>

      <Image source={profileImg} style={styles.avatar}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
    fontFamily: fonts.light,
  },
  username: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 32,
    lineHeight: 36
  },
  avatar: {
    borderRadius: 50,
    height: 58,
    width: 58
  }
});
