import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }
  function handleInputFocused() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding': 'height'}
      >
        <View style={styles.content}>

          <View style={styles.form}>
            <Text style={styles.emoji}>
              {isFilled ? '😃' : '😴'}
              </Text>

            <Text style={styles.title}>
              Como Podemos{'\n'} chamar você?
            </Text>

            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && {borderBottomColor: colors.green}
              ]}
              onFocus={handleInputFocused}
              onBlur={handleInputBlur}
              onChangeText={handleInputChange}
              placeholder="Digite seu primeiro nome"
            />

            <Button title="Começar"/>
          </View>

        </View>
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
    paddingHorizontal: 48,
  },
  emoji: {
    fontSize: 38,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 20,
    lineHeight: 32,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 16,
    marginTop: 60,
    padding: 10,
    textAlign: 'center'
  },
});
