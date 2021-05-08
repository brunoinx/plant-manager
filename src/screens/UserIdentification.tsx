import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  async function handleSubmit() {
    if (!name) {
      return Alert.alert('Me diz o seu nome antes de acessar o app. 🧐📝');
    }

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation');
    } catch (e) {
      console.warn(e);
    }
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }
  function handleInputFocused() {
    setIsFocused(!isFocused)
  }
  function handleInputChange(value: string) {
    const formatName = value.trim();

    setIsFilled(!!formatName)
    setName(formatName)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={{ width: '100%' }}>
                <Text style={styles.emoji}>
                  {isFilled ? '😃' : '😴'}
                </Text>

                <Text style={styles.title}>
                  Como podemos{'\n'} chamar você?
              </Text>

                <TextInput
                  style={[
                    styles.input,
                    (isFocused || isFilled) && { borderBottomColor: colors.green }
                  ]}
                  onFocus={handleInputFocused}
                  onBlur={handleInputBlur}
                  onChangeText={handleInputChange}
                  placeholder="Digite seu primeiro nome"
                />
              </View>

              <Button title="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 26,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 42,
  },
  emoji: {
    fontSize: 38,
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 26,
    lineHeight: 32,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 16,
    marginTop: 40,
    padding: 10,
    textAlign: 'center'
  },
});
