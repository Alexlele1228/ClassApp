import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TextBox} from './components/TextBox';
import {ClickCounter} from './components/ClickCounter';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.</Text>
      <TextBox color="green" size="24" Text="123"/>
      <ClickCounter/>
      <ClickCounter/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
