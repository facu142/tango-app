// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './app/_layout';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
