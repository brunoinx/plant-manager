import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';

import Header from '../components/Header';
import EnviromentButton from '../components/EnviromentButton';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonRoomsProps {
  key: string;
  title: string;
}
interface PlantProps {
  id: number;
  name: string;
  photo: string;
}

export default function ListPlants() {
  const [buttonRooms, setButtonRooms] = useState<ButtonRoomsProps[]>([]);
  const [listPlants, setListPlants] = useState<PlantProps[]>([]);

  useEffect(() => {
    api.get('plants_environments').then(response => {
      setButtonRooms(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('plants').then(response => {
      setListPlants(response.data);
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title} >Em qual ambiente </Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <FlatList
        keyExtractor={(item) => item.key}
        data={buttonRooms}
        renderItem={({ item }) => (
          <EnviromentButton
          title={item.title}
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
