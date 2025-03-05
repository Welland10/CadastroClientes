import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Cliente } from '../models/Cliente';

// Chave do AsyncStorage onde os clientes offline são armazenados
const STORAGE_KEY = '@clientes_offline';

/**
 * Sincroniza os clientes armazenados localmente com o Firestore quando houver internet.
 */
export const sincronizarClientes = async () => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected) {
    try {
      const clientesJSON = await AsyncStorage.getItem(STORAGE_KEY);
      if (!clientesJSON) return;

      const clientes: Cliente[] = JSON.parse(clientesJSON);

      for (const cliente of clientes) {
        await addDoc(collection(db, 'clientes'), cliente);
      }

      // Limpa os dados locais após sincronização bem-sucedida
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log('Clientes sincronizados com sucesso.');
    } catch (error) {
      console.error('Erro ao sincronizar clientes:', error);
    }
  } else {
    console.log('Sem conexão com a internet. Dados serão sincronizados depois.');
  }
};

/**
 * Salva um cliente localmente caso não haja internet.
 */
export const salvarClienteOffline = async (cliente: Cliente) => {
  try {
    const clientesJSON = await AsyncStorage.getItem(STORAGE_KEY);
    const clientes = clientesJSON ? JSON.parse(clientesJSON) : [];

    clientes.push(cliente);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));

    console.log('Cliente salvo localmente.');
  } catch (error) {
    console.error('Erro ao salvar cliente offline:', error);
  }
};
