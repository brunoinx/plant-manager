import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import UserIdentification from '../screens/UserIdentification';
import Confirmation from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator>
      <Screen name="Welcome" component={Welcome} />
      <Screen name="UserIdentification" component={UserIdentification} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}