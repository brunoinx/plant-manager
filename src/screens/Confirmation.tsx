import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😄
        </Text>

        <View style={styles.info}>
          <Text style={styles.title}>Prontinho</Text>

          <Text style={styles.descrition}>
            Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
          </Text>

          <Button title="Começar" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emoji: {
    fontSize: 56,
  },
  info: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 54,
    paddingHorizontal: 33
  },
  title: {
    color: colors.heading,
    fontSize: 28,
    fontFamily: fonts.heading,
    marginBottom: 13
  },
  descrition: {
    color: colors.heading,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: fonts.text
  }
});