import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { cadastrarAdmin, verificarSeHaAdmin } from '../controllers/AuthController';

const CadastroAdminScreen: React.FC = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [palavraSeguranca, setPalavraSeguranca] = useState('');
  const [haAdmin, setHaAdmin] = useState(false);
  const [verificado, setVerificado] = useState(false); // Garante que verificamos antes de bloquear cadastro

  useEffect(() => {
    const verificarAdmin = async () => {
      const existeAdmin = await verificarSeHaAdmin();
      setHaAdmin(existeAdmin);
      setVerificado(true); // Marca que a verificação foi concluída
    };
    verificarAdmin();
  }, []);

  const handleCadastro = async () => {
    if (!verificado) {
      Alert.alert('Aguarde', 'Verificando informações...');
      return;
    }

    if (haAdmin) {
      Alert.alert('Erro', 'Já existe um administrador cadastrado. Faça login.');
      navigation.navigate('LoginScreen');
      return;
    }

    const resultado = await cadastrarAdmin(usuario, senha, palavraSeguranca);
    if (resultado.sucesso) {
      Alert.alert('Sucesso', 'Administrador cadastrado com sucesso!');
      navigation.navigate('AdminScreen');
    } else {
      Alert.alert('Erro', resultado.erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Administrador</Text>

      <TextInput style={styles.input} placeholder="Usuário" value={usuario} onChangeText={setUsuario} />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput
        style={styles.input}
        placeholder="Palavra de Segurança"
        value={palavraSeguranca}
        onChangeText={setPalavraSeguranca}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {haAdmin && (
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  button: { width: '100%', height: 50, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 15, color: '#007bff', fontSize: 16 },
});

export default CadastroAdminScreen;
