import React, { ReactNode, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import profileImg from '../assets/profile.jpeg';
import colors from '../styles/colors';

interface HeaderProps {
  children: ReactNode
}

export default function Header({ children }: HeaderProps) {


  return (
    <View style={ styles.container }>
      <View>
        {children}
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
  avatar: {
    height: 62,
    width: 62,
    borderRadius: 50,
  }
});
