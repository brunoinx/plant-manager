import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';

import Header from '../components/Header';
import EnviromentButton from '../components/EnviromentButton';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import PlantCardPrimary from '../components/PlantCardPrimary';

interface ButtonRoomsProps {
  key: string;
  title: string;
}

interface PlantListProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export default function ListPlants() {
  const [buttonRooms, setButtonRooms] = useState<ButtonRoomsProps[]>([]);
  const [plantList, setPlantList] = useState<PlantListProps[]>([]);
  const [filteredPlantsList, setFilteredPlantList] = useState<PlantListProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');

  function handleSelectEnviroment(enviroment: string) {
    setEnviromentSelected(enviroment);

    if (enviroment === 'all') {
      return setFilteredPlantList(plantList)
    }

    const filtered = plantList.filter(plant =>
      plant.environments.includes(enviroment)
    )

    setFilteredPlantList(filtered);
  }


  useEffect(() => {
    api.get('plants_environments', {
      params: {
        _sort: 'title',
        _order: 'asc'
      }
    }).then(({ data }) => {
      setButtonRooms([{ key: 'all', title: 'Todos' }, ... data]);
    })
  }, []);

  useEffect(() => {
    api.get('plants', {
      params: {
        _sort: 'name',
        _order: 'asc'
      }
    }).then(({ data }) => {
      setPlantList(data);
    })
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title} >Em qual ambiente </Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          keyExtractor={(item) => item.key}
          data={buttonRooms}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              isActive={item.key === enviromentSelected}
              onPress={() => handleSelectEnviroment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false} // ios
          contentContainerStyle={styles.listButtons}
        />
      </View>

      <View style={styles.listPlants}>
        <FlatList
          data={filteredPlantsList}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 22,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 22,
    color: colors.heading
  },
  listButtons: {
    justifyContent: 'center',
    height: 68,
    paddingBottom: 8,
    marginTop: 32,
    marginBottom: 20,
    marginRight: 60,
    marginLeft: 30,
  },
  listPlants: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  listContainer: {
  }
})
