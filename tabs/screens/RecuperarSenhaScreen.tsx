import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

const RecuperarSenhaScreen: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [palavraSeguranca, setPalavraSeguranca] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const navigation = useNavigation();

  const handleRecuperarSenha = async () => {
    try {
      // Consulta no Firebase para encontrar o administrador
      const q = query(collection(db, 'administradores'), where('usuario', '==', usuario));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      // Obtém os dados do administrador
      const adminDoc = snapshot.docs[0];
      const adminData = adminDoc.data();

      // Verifica se a palavra de segurança está correta
      if (adminData.palavraSeguranca !== palavraSeguranca) {
        Alert.alert('Erro', 'Palavra de segurança incorreta.');
        return;
      }

      // Atualiza a senha no Firebase
      const adminRef = doc(db, 'administradores', adminDoc.id);
      await updateDoc(adminRef, { senha: novaSenha });

      Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao recuperar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Palavra de Segurança"
        value={palavraSeguranca}
        onChangeText={setPalavraSeguranca}
      />

      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRecuperarSenha}>
        <Text style={styles.buttonText}>Redefinir Senha</Text>
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

export default RecuperarSenhaScreen;
