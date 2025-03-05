import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const EscolhaScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você é Cliente ou Administrador?</Text>
      
      {/* Contêiner dos botões para melhor espaçamento */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Sou Cliente" 
          onPress={() => navigation.navigate('CadastroScreen')} 
          color="#007BFF" 
        />
        
        <Button 
          title="Sou Administrador" 
          onPress={() => navigation.navigate('LoginScreen')} 
          color="#28A745" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30, 
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1, // Ocupa espaço disponível verticalmente
    justifyContent: 'space-evenly', // Distribui os botões uniformemente
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10, // Ajusta espaçamento entre os botões
  },
});

export default EscolhaScreen;
