# 📱 Aplicativo de Cadastro e Login

## 📌 Descrição
Este aplicativo React Native permite que usuários se cadastrem, escolham entre cliente e administrador, façam login e recuperem senha. Além disso, implementa um serviço de sincronização de clientes com o Firestore quando houver conexão com a internet.

## 🛠️ Tecnologias Utilizadas
- **React Native**: Framework para desenvolvimento mobile.
- **React Navigation**: Gerenciamento de navegação entre telas.
- **AsyncStorage**: Armazena dados localmente no dispositivo.
- **Firebase Firestore**: Banco de dados em nuvem para armazenar informações dos clientes.
- **react-native-mask-input**: Máscaras para entrada de dados (CEP, telefone, etc.).
- **@react-native-picker/picker**: Componente de seleção de opções.
- **@react-native-community/netinfo**: Verifica conexão com a internet.

## 📂 Estrutura do Projeto

### 📌 Telas Implementadas

1. **CadastroScreen.tsx**
   - Tela de cadastro de clientes.
   - Inputs para nome, endereço, telefone, empresa e área de atuação.
   - Máscaras para entrada de CEP e telefone.
   - Botão para salvar o cadastro.

2. **EscolhaScreen.tsx**
   - Tela inicial onde o usuário escolhe entre Cliente ou Administrador.
   - Botões para navegar para as telas correspondentes.

3. **LoginScreen.tsx**
   - Tela de login para administradores.
   - Verifica credenciais salvas no AsyncStorage.
   - Opção para recuperar senha ou cadastrar nova senha de administrador.

4. **RecuperarSenhaScreen.tsx**
   - Tela para redefinição de senha.
   - Usuário deve informar a palavra de segurança cadastrada.
   - Se validado, pode definir uma nova senha.

### 🔄 Serviço de Sincronização

- **SyncService.ts**
  - **sincronizarClientes**: Envia os cadastros armazenados localmente para o Firestore quando há internet.
  - **salvarClienteOffline**: Caso não haja conexão, salva os cadastros localmente no AsyncStorage para sincronização posterior.

### 🚀 Navegação
- **AppNavigator** gerencia a navegação entre as telas utilizando **React Navigation**.
- **App.tsx** configura a navegação e exibe a barra de status do dispositivo.

Este documento serve como guia para entender  o aplicativo. 

