import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EnviromentButton from '../components/EnviromentButton';
import Header from '../components/Header';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function ListPlants() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title} >Em qual ambiente </Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <FlatList
        keyExtractor={(item) => item.toString()}
        data={[1, 2, 3, 4, 5,6, 7, 8]}
        renderItem={({ item }) => (
          <EnviromentButton
          title="Sala"
          isActive
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false} // ios
        contentContainerStyle={styles.listButtons}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 26,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 20,
    lineHeight: 24,
    color: colors.heading
  },
  listButtons: {
    justifyContent: 'center',
    height: 68,
    paddingBottom: 5,
    marginVertical: 32,
    marginLeft: 30,
  }
})
