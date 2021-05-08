import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { isBefore, format } from 'date-fns';

import { Button } from '../components/Button';
import { loadPlants, PlantProps, savePlants } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterDrop from '../assets/waterdrop.png';

interface PlantDataRouteParams {
  plant: PlantProps;
}

export default function PlantSave() {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const routes = useRoute();
  const { plant } = routes.params as PlantDataRouteParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if(Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedTime(new Date());
      return Alert.alert('Escolha uma hora no futuro. ⏲️');
    }

    if (dateTime) {
      setSelectedTime(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlants({
        ...plant,
        dateNotification: selectedTime,
      });
    } catch {
      Alert.alert('Não foi possível salvar a sua planta...😢🌱');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={colors.heading} />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <SvgFromUri
          uri={plant.photo}
          width={160}
          height={160}

        />

        <Text style={styles.name}>{plant.name}</Text>

        <Text style={styles.about}>{plant.about}</Text>
      </View>

      <View style={styles.controllers}>
        <View style={styles.waterTips}>
          <Image source={waterDrop} style={styles.tipImage} />

          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <View>
          <Text style={styles.alertLabel}>Escolha o melhor horário para ser lembrado</Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedTime}
              onChange={handleChangeTime}
              mode="time"
              display="spinner"
            />
          )}

          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Button title="Cadastrar nova planta" onPress={handleSavePlant} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  header: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    position: 'absolute',
    top: 40,
  },
  name: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 23,
  },
  about: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
    color: colors.heading,
    textAlign: 'center',
    marginVertical: 6
  },
  controllers: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: getBottomSpace() || 32,
  },
  waterTips: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 12,

    backgroundColor: colors.blue_light,
    paddingVertical: 18,
    paddingRight: 44,
    paddingLeft: 16,
    marginHorizontal: 40,
  },
  tipImage: {
    width: 56,
    height: 56,
    marginRight: 20
  },
  tipText: {
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 15,
    lineHeight: 18,
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 26,
    color: colors.heading,
  },

  dateTimePickerText: {
    fontSize: 20,
    color: colors.green,
    fontFamily: fonts.heading,
    textAlign: 'center'
  }
});
