import React, { useState, useRef } from 'react';
import { View, ScrollView, Alert, StyleSheet, Text, TextInput } from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import MaskInput, { Masks } from 'react-native-mask-input';

const CadastroScreen: React.FC = () => {
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [areaAtuacao, setAreaAtuacao] = useState('');

  // Criando referências para os campos
  const ruaRef = useRef<TextInput>(null);
  const numeroRef = useRef<TextInput>(null);
  const cepRef = useRef<TextInput>(null);
  const bairroRef = useRef<TextInput>(null);
  const cidadeRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const telefoneRef = useRef<TextInput>(null);
  const empresaRef = useRef<TextInput>(null);
  const areaAtuacaoRef = useRef<TextInput>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField 
        label="Nome Completo"
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        returnKeyType="next"
        onSubmitEditing={() => ruaRef.current?.focus()}
        blurOnSubmit={false}
      />

      <InputField 
        label="Rua"
        value={rua}
        onChangeText={setRua}
        placeholder="Digite a rua"
        ref={ruaRef}
        returnKeyType="next"
        onSubmitEditing={() => numeroRef.current?.focus()}
        blurOnSubmit={false}
      />

      <InputField 
        label="Número"
        value={numero}
        onChangeText={setNumero}
        placeholder="Digite o número"
        keyboardType="numeric"
        ref={numeroRef}
        returnKeyType="next"
        onSubmitEditing={() => cepRef.current?.focus()}
        blurOnSubmit={false}
      />

      <Text style={styles.label}>CEP</Text>
      <MaskInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        mask={Masks.ZIP_CODE}
        keyboardType="numeric"
        placeholder="00000-000"
        ref={cepRef}
        returnKeyType="next"
        onSubmitEditing={() => bairroRef.current?.focus()}
        blurOnSubmit={false}
      />

      <InputField 
        label="Bairro"
        value={bairro}
        onChangeText={setBairro}
        placeholder="Digite o bairro"
        ref={bairroRef}
        returnKeyType="next"
        onSubmitEditing={() => cidadeRef.current?.focus()}
        blurOnSubmit={false}
      />

      <InputField 
        label="Cidade"
        value={cidade}
        onChangeText={setCidade}
        placeholder="Digite a cidade"
        ref={cidadeRef}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        blurOnSubmit={false}
      />

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={estado} onValueChange={(value) => setEstado(value)} style={styles.picker}>
          <Picker.Item label="Selecione um estado" value="" />
          <Picker.Item label="SP" value="SP" />
          <Picker.Item label="RJ" value="RJ" />
          <Picker.Item label="MG" value="MG" />
        </Picker>
      </View>

      <InputField 
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholder="seuemail@exemplo.com"
        keyboardType="email-address"
        ref={emailRef}
        returnKeyType="next"
        onSubmitEditing={() => telefoneRef.current?.focus()}
        blurOnSubmit={false}
      />

      <InputField 
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
        ref={telefoneRef}
        returnKeyType="next"
        onSubmitEditing={() => empresaRef.current?.focus()}
        blurOnSubmit={false}
      />

      <InputField 
        label="Nome da Empresa"
        value={empresa}
        onChangeText={setEmpresa}
        placeholder="Nome da empresa"
        ref={empresaRef}
        returnKeyType="next"
        onSubmitEditing={() => areaAtuacaoRef.current?.focus()}
        blurOnSubmit={false}
      />

      <InputField 
        label="Área de Atuação"
        value={areaAtuacao}
        onChangeText={setAreaAtuacao}
        placeholder="Área de atuação"
        ref={areaAtuacaoRef}
        returnKeyType="done"
        onSubmitEditing={() => areaAtuacaoRef.current?.blur()} // Fecha o teclado no último campo
      />

      <Button title="Salvar Cadastro" onPress={() => Alert.alert('Cadastro realizado!')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingLeft: 10, marginBottom: 15, fontSize: 16 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 15 },
  picker: { height: 50, width: '100%' },
});

export default CadastroScreen;
