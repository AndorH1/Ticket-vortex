import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
