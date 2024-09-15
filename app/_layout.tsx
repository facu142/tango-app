// _layout.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicarEnvioScreen from './PublicarEnvio';
import HomeScreen from './Home';

const Stack = createNativeStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen 
        name="PublicarEnvio" 
        component={PublicarEnvioScreen} 
        options={{ title: 'Publicar Envío' }} 
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
