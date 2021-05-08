import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const emojis = {
  smile: '😄',
  hug: '🤗'
}

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

export default function Confirmation() {
  const navigation = useNavigation();

  const routes = useRoute();
  const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params;

  function handleNavigateToListPlants() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.info}>
          <Text style={styles.emoji}>{emojis[icon]}</Text>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.descrition}>{subtitle}</Text>
        </View>

        <Button title={buttonTitle} onPress={handleNavigateToListPlants}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16
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
