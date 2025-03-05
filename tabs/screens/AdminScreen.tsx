import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isAdminLogado, setIsAdminLogado] = useState(false);
  const [admins, setAdmins] = useState<{ usuario: string }[]>([]);

  // Verifica se há um administrador logado e carrega a lista de admins
  useEffect(() => {
    const verificarAdminLogado = async () => {
      const adminLogado = await AsyncStorage.getItem('@admin_logado');
      if (adminLogado === 'true') {
        setIsAdminLogado(true);
        const listaAdmins = JSON.parse(await AsyncStorage.getItem('@admins_lista') || '[]');
        setAdmins(listaAdmins);
      } else {
        Alert.alert('Acesso negado', 'Você precisa fazer login como administrador.');
        navigation.navigate('LoginScreen');
      }
    };
    verificarAdminLogado();
  }, []);

  // Função para adicionar um novo administrador
  const handleAdicionarAdmin = () => {
    if (isAdminLogado) {
      navigation.navigate('CadastroAdminScreen');
    } else {
      Alert.alert('Erro', 'Você não tem permissão para adicionar administradores.');
    }
  };

  // Função para excluir um administrador
  const handleExcluirAdmin = async (usuario: string) => {
    if (!isAdminLogado) {
      Alert.alert('Erro', 'Você não tem permissão para excluir administradores.');
      return;
    }

    Alert.alert(
      'Excluir Administrador',
      `Tem certeza que deseja excluir ${usuario}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            let novaLista = admins.filter(admin => admin.usuario !== usuario);
            await AsyncStorage.setItem('@admins_lista', JSON.stringify(novaLista));
            setAdmins(novaLista);
            Alert.alert('Sucesso', 'Administrador excluído com sucesso!');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Administrador</Text>

      <TouchableOpacity style={styles.button} onPress={handleAdicionarAdmin}>
        <Text style={styles.buttonText}>Adicionar Novo Administrador</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Administradores Cadastrados:</Text>
      {admins.length === 0 ? (
        <Text style={styles.noAdmin}>Nenhum administrador cadastrado.</Text>
      ) : (
        admins.map((admin, index) => (
          <View key={index} style={styles.adminItem}>
            <Text style={styles.adminText}>{admin.usuario}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleExcluirAdmin(admin.usuario)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  noAdmin: {
    marginTop: 10,
    color: 'gray',
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
  adminItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
  },
  adminText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminScreen;
