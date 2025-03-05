// tabs/navigation/AppNavigator.tsx
import React, { useEffect } from 'react'; // Apenas uma vez
import { createStackNavigator } from '@react-navigation/stack';
import EscolhaScreen from '../screens/EscolhaScreen';
import CadastroScreen from '../screens/CadastroScreen';
import LoginScreen from '../screens/LoginScreen';
import AdminScreen from '../screens/AdminScreen';
import { sincronizarClientes } from '../services/SyncService';
import CadastroAdminScreen from '../screens/CadastroAdminScreen';
import RecuperarSenhaScreen from '../screens/RecuperarSenhaScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  useEffect(() => {
    // Tenta sincronizar os clientes armazenados localmente sempre que o app inicia
    sincronizarClientes();
  }, []);

  return (
    <Stack.Navigator initialRouteName="EscolhaScreen">
      <Stack.Screen name="EscolhaScreen" component={EscolhaScreen} options={{ title: 'Bem-vindo' }} />
      <Stack.Screen name="CadastroScreen" component={CadastroScreen} options={{ title: 'Cadastro de Cliente' }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login de Administrador' }} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'Área Administrativa' }} />
      <Stack.Screen name="CadastroAdminScreen" component={CadastroAdminScreen} options={{ title: 'Cadastro do Administrador' }} />
      <Stack.Screen name="RecuperarSenhaScreen" component={RecuperarSenhaScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
