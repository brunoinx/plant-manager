import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from '../components/Header';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function MyPlants() {
  return (
    <View style={ styles.container }>
      <Header>
        <Text style={styles.headerTitle}>Minhas</Text>
        <Text style={styles.headerTitleBold}>Plantinhas</Text>
      </Header>

      <View style={styles.spotlight}>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 28,
    backgroundColor: colors.background
  },
  headerTitle: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
    fontFamily: fonts.light,
  },
  headerTitleBold: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 32,
    lineHeight: 36
  },
  spotlight: {

  }
});
