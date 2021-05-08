import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Confirmation() {
  const navigation = useNavigation();

  function handleNavigateToListPlants() {
    navigation.navigate('ListPlants');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.info}>
          <Text style={styles.emoji}>
            😄
          </Text>

          <Text style={styles.title}>Prontinho</Text>

          <Text style={styles.descrition}>
            Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
          </Text>
        </View>

        <Button title="Começar" onPress={handleNavigateToListPlants}/>
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
