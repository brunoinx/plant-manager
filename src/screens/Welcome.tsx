import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform 
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../styles/colors';

import wateringImg from '../assets/watering.png'

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gernencie {'\n'}
        suas plantas de forma {'\n'}
        fácil
      </Text>

      <Image source={wateringImg} style={styles.image}/>

      <Text style={styles.description}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7} >
        <Text>
          <Entypo name="chevron-right" size={26} color={colors.white}/>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'android'? 26:0,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    textAlign: 'center',
    color: colors.heading,
    fontWeight: 'bold',
    marginTop: 40,
  },
  image: {
    width: 292,
    height: 284
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    width: 62,
    height: 58,
    borderRadius: 14,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
});