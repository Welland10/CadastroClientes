import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  // Função para verificar o login do administrador
  const handleLogin = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('@admin_usuario');
      const senhaSalva = await AsyncStorage.getItem('@admin_senha');

      if (usuario === usuarioSalvo && senha === senhaSalva) {
        navigation.navigate('AdminScreen'); // Redireciona para a área do admin
      } else {
        Alert.alert('Erro', 'Login ou senha errados!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao verificar o login.');
    }
  };

  // Função para verificar se o admin já cadastrou a senha
  const verificarCadastro = async () => {
    const senhaSalva = await AsyncStorage.getItem('@admin_senha');
    if (!senhaSalva) {
      navigation.navigate('CadastroAdminScreen'); // Se não há senha cadastrada, redireciona para cadastro
    } else {
      Alert.alert('Aviso', 'A senha já foi cadastrada.');
    }
  };

  // Função para recuperar a senha
  const handleRecuperarSenha = () => {
    navigation.navigate('RecuperarSenhaScreen'); // Redireciona para a tela de recuperação de senha
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login de Administrador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleRecuperarSenha}>
        <Text style={styles.linkText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={verificarCadastro}>
        <Text style={styles.linkText}>Cadastrar Senha</Text>
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
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default LoginScreen;
