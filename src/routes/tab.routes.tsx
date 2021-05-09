import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import ListPlants from '../screens/ListPlants';
import MyPlants from '../screens/MyPlants';
import colors from '../styles/colors';

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style:{
          height: 60,
          alignItems: 'center',
          borderTopColor: colors.shape,
          borderTopWidth: 2,
        }
      }}
    >
      <Screen
        name="Nova Planta"
        component={ListPlants}
        options={{
          tabBarIcon: (({ size, color}) => (
            <MaterialIcons name="add-circle-outline" color={color} size={size}/>
          ))
        }}
      />

      <Screen
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name="format-list-bulleted" color={color} size={size} />
          ))
        }}
      />
    </Navigator>
  );
}
