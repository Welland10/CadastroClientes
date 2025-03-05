import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

// Verifica no Firebase se já existe um administrador cadastrado
export const verificarSeHaAdministrador = async (): Promise<boolean> => {
  try {
    const snapshot = await getDocs(collection(db, 'administradores'));
    const haAdmin = !snapshot.empty;

    // Atualiza localmente para acesso offline
    await AsyncStorage.setItem('@ha_admin', haAdmin ? 'true' : 'false');
    
    return haAdmin;
  } catch (error) {
    console.error('Erro ao verificar administradores:', error);
    return false;
  }
};

// Cadastra o primeiro administrador (caso não exista)
export const cadastrarPrimeiroAdministrador = async (usuario: string, senha: string, palavraSeguranca: string) => {
  const haAdmin = await verificarSeHaAdministrador();

  if (haAdmin) {
    throw new Error('Já existe um administrador cadastrado. Faça login.');
  }

  // Salva no Firebase
  const novoAdmin = {
    usuario,
    senha,
    palavraSeguranca,
    dataCadastro: new Date().toISOString(),
  };
  
  await addDoc(collection(db, 'administradores'), novoAdmin);

  // Salva localmente para acesso offline
  await AsyncStorage.setItem('@admins_lista', JSON.stringify([novoAdmin]));
  await AsyncStorage.setItem('@admin_logado', 'true');
  await AsyncStorage.setItem('@ha_admin', 'true');

  return true;
};

// Realiza login do administrador
export const loginAdministrador = async (usuario: string, senha: string): Promise<boolean> => {
  try {
    const q = query(collection(db, 'administradores'), where('usuario', '==', usuario));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      throw new Error('Login ou senha incorretos!');
    }

    const admin = snapshot.docs[0].data();
    
    if (admin.senha !== senha) {
      throw new Error('Login ou senha incorretos!');
    }

    await AsyncStorage.setItem('@admin_logado', 'true');
    return true;
  } catch (error) {
    console.error('Erro no login:', error);
    throw new Error('Erro ao tentar logar.');
  }
};

// Cadastrar um novo administrador (somente se já houver um logado)
export const cadastrarNovoAdministrador = async (usuario: string, senha: string, palavraSeguranca: string) => {
  const estaLogado = await AsyncStorage.getItem('@admin_logado');

  if (!estaLogado) {
    throw new Error('Você precisa estar logado para cadastrar um novo administrador.');
  }

  const novoAdmin = {
    usuario,
    senha,
    palavraSeguranca,
    dataCadastro: new Date().toISOString(),
  };

  // Salva no Firebase
  await addDoc(collection(db, 'administradores'), novoAdmin);

  // Atualiza localmente para acesso offline
  const admins = JSON.parse(await AsyncStorage.getItem('@admins_lista') || '[]');
  admins.push(novoAdmin);
  await AsyncStorage.setItem('@admins_lista', JSON.stringify(admins));

  return true;
};

// Verifica se um administrador está logado
export const verificarAdminLogado = async (): Promise<boolean> => {
  const logado = await AsyncStorage.getItem('@admin_logado');
  return logado === 'true';
};

// Logout do administrador
export const logoutAdministrador = async () => {
  await AsyncStorage.removeItem('@admin_logado');
};
