import React from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import Home from './src/Screens/Home';
import Details from './src/Screens/Details';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Navigation/MainNavigator';
import { createStackNavigator } from 'react-navigation-stack';
import { FavoritesProvider } from './src/FavoritesContext';
function App(): JSX.Element {


  return (
    <FavoritesProvider>
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
