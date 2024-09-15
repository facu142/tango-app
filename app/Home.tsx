import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  PublicarEnvio: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tango App</Text>
      <Button
        title="Publicar Pedido de Envío"
        onPress={() => navigation.navigate('PublicarEnvio')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CAF0F8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#03045E',
  },
});
