import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Dimensions 
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import wateringImg from '../assets/watering.png'

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gernencie {'\n'}
        suas plantas de forma {'\n'}
        fácil
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

      <TouchableOpacity style={styles.button} activeOpacity={0.7} >
        <Text>
          <Entypo name="chevron-right" size={28} color={colors.white}/>
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
    paddingTop: Platform.OS === 'android'? 28:0,
    marginHorizontal: 14,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
  },
  description: {
    fontFamily: fonts.text,
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});