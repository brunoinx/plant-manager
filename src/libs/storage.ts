import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  },
  dateNotification: Date;
}

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
  }
}

export async function savePlants(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');

    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlants = {
      [plant.id]: {
        data: plant
      }
    }

    await AsyncStorage.setItem('@plantmanager:plants',
      JSON.stringify({ ...newPlants, ...oldPlants })
    );

  } catch (e) {
    throw new Error(e);
  }
}


export async function loadPlants(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');

    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsShorted = Object
    .keys(plants)
    .map(plant => {
      return {
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateNotification), 'HH:mm')
      }
    })
    .sort((primary, secondary) =>
      Math.floor(
        new Date(primary.dateNotification).getTime() / 1000 -
        Math.floor(new Date(secondary.dateNotification).getTime() / 1000)
      )
    );

    return plantsShorted;
  } catch (e) {
    throw new Error(`Erro ao Salvar a planta: ${e}`);
  }
}
