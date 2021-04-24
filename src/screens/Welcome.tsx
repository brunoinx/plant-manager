import React from 'react';
import {
  Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Entypo } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import wateringImg from '../assets/watering.png'

export default function Welcome() {
  const navigation = useNavigation();

  function handleNavigateToSession() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gernencie {'\n'}
        suas plantas de{'\n'}
        forma fácil
      </Text>

      <Image
        source={wateringImg}
        style={styles.image}
        resizeMode='contain'
      />

      <Text style={styles.description}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleNavigateToSession}>
        <Text>
          <Entypo name="chevron-right" size={28} color={colors.white} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Platform.OS === 'android' ? 32 : 0,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 12
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
  },
  description: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.green,
    width: 58,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  }
});