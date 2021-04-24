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
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate('Confirmation');
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }
  function handleInputFocused() {
    setIsFocused(!isFocused)
  }
  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
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
    justifyContent: 'center',
    paddingHorizontal: 42,
  },
  emoji: {
    fontSize: 38,
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
