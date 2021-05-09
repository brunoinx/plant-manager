import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import UserIdentification from '../screens/UserIdentification';
import Confirmation from '../screens/Confirmation';
import PlantSave from '../screens/PlantSave';
import Welcome from '../screens/Welcome';
import TabRoutes from './tab.routes';
const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        }
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="UserIdentification" component={UserIdentification} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="ListPlants" component={TabRoutes} />
      <Screen name="MyPlants" component={TabRoutes} />
      <Screen name="PlantSave" component={PlantSave} />
    </Navigator>
  );
}
