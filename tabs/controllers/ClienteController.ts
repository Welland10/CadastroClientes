import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cliente } from '../models/Cliente';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Chave para armazenar os clientes no AsyncStorage
const STORAGE_KEY = '@clientes';

/**
 * Salva um novo cliente no armazenamento local.
 */
export const salvarCliente = async (cliente: Cliente): Promise<void> => {
  try {
    const clientes = await obterClientes();
    clientes.push(cliente);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
  } catch (error) {
    throw new Error('Erro ao salvar cliente');
  }
};

/**
 * Obtém a lista de clientes armazenados localmente.
 */
export const obterClientes = async (): Promise<Cliente[]> => {
  try {
    const clientesJSON = await AsyncStorage.getItem(STORAGE_KEY);
    return clientesJSON ? JSON.parse(clientesJSON) : [];
  } catch (error) {
    throw new Error('Erro ao obter clientes');
  }
};

/**
 * Exclui todos os clientes cadastrados.
 */
export const excluirTodosClientes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    throw new Error('Erro ao excluir clientes');
  }
};

/**
 * Exporta a lista de clientes para um arquivo CSV e permite compartilhá-lo.
 */
export const exportarClientesCSV = async (clientes: Cliente[]): Promise<void> => {
  if (clientes.length === 0) {
    throw new Error('Não há clientes para exportar');
  }

  // Criar conteúdo CSV
  const csvData = [
    'Nome,Email,Telefone,Empresa,Área de Atuação,Data de Cadastro',
    ...clientes.map(c => 
      `"${c.nome}","${c.email}","${c.telefone}","${c.empresa}","${c.areaAtuacao}","${new Date(c.dataCadastro).toLocaleDateString()}"`
    ),
  ].join('\n');

  // Caminho do arquivo
  const filePath = `${FileSystem.documentDirectory}clientes.csv`;

  try {
    await FileSystem.writeAsStringAsync(filePath, csvData, { encoding: FileSystem.EncodingType.UTF8 });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath);
    } else {
      throw new Error('Compartilhamento não suportado');
    }
  } catch (error) {
    throw new Error('Erro ao exportar CSV');
  }
};
