import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cadastrarPrimeiroAdministrador, verificarSeHaAdministrador } from '../controllers/AuthController';

const CadastroAdminScreen: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [palavraSeguranca, setPalavraSeguranca] = useState('');
  const [podeCadastrar, setPodeCadastrar] = useState(false);
  const navigation = useNavigation();

  // Verifica se já há um administrador cadastrado
  useEffect(() => {
    const verificarAdmin = async () => {
      const haAdmin = await verificarSeHaAdministrador();
      setPodeCadastrar(!haAdmin); // Se não houver admin, pode cadastrar
    };
    verificarAdmin();
  }, []);

  const handleCadastro = async () => {
    if (!podeCadastrar) {
      Alert.alert('Erro', 'Já existe um administrador. Faça login.');
      navigation.navigate('LoginScreen');
      return;
    }

    if (usuario === '' || senha.length !== 8 || palavraSeguranca === '') {
      Alert.alert('Erro', 'Preencha todos os campos corretamente. A senha deve ter 8 dígitos.');
      return;
    }

    try {
      await cadastrarPrimeiroAdministrador(usuario, senha, palavraSeguranca);
      Alert.alert('Sucesso', 'Administrador cadastrado com sucesso!');
      navigation.navigate('AdminScreen'); // Vai para o painel do administrador
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Administrador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha (8 dígitos)"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        maxLength={8}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Palavra de segurança"
        value={palavraSeguranca}
        onChangeText={setPalavraSeguranca}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Administrador</Text>
      </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroAdminScreen;
