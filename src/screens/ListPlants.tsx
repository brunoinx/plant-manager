import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import api from '../services/api';

import Load from '../components/Load';
import Header from '../components/Header';
import PlantCardPrimary from '../components/PlantCardPrimary';
import EnviromentButton from '../components/EnviromentButton';

import { PlantProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonRoomsProps {
  key: string;
  title: string;
}

export default function ListPlants() {
  const navigation = useNavigation();

  const [buttonRooms, setButtonRooms] = useState<ButtonRoomsProps[]>([]);
  const [plantList, setPlantList] = useState<PlantProps[]>([]);
  const [filteredPlantsList, setFilteredPlantList] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);

  const [username, setUsername] = useState<string>();

  async function fetchPlants() {
    const { data } = await api.get('plants', {
      params: {
        _sort: 'name', _order: 'asc', _page: page, _limit: 8
      }
    })
    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlantList(oldValue => [...oldValue, ...data])
      setFilteredPlantList(oldValue => [...oldValue, ...data])
    } else {
      setPlantList(data);
      setFilteredPlantList(data);
    }

    setLoadingMore(false);
    setLoading(false);
  }

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

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return
    }

    setLoadingMore(true)
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handleNavigateToPlanteSave(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant });
  }

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');

      setUsername(user || '');
    }

    loadStorageUserName();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    api.get('plants_environments', {
      params: {
        _sort: 'title',
        _order: 'asc'
      }
    }).then(({ data }) => {
      setButtonRooms([{ key: 'all', title: 'Todos' }, ...data]);
    })
  }, []);

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header>
          <Text style={styles.headerGreting}>Olá,</Text>
          <Text style={styles.headerUsername}>{username}</Text>
        </Header>

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
            <PlantCardPrimary
              data={item}
              onPress={() => handleNavigateToPlanteSave(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1} // qual a distância até o final da página
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore
            ? <ActivityIndicator color={colors.green} size={30}/>
            : <></>
          }
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
  headerGreting: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
    fontFamily: fonts.light,
  },
  headerUsername: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 32,
    lineHeight: 36
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
  }
})
