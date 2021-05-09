import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListPlants from '../screens/ListPlants';
import MyPlants from '../screens/MyPlants';

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Navigator>
      <Screen name="Nova Planta" component={ListPlants}/>
      <Screen name="Minhas plantas" component={MyPlants}/>
    </Navigator>
  );
}
