import React, { forwardRef } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const InputField = forwardRef(({ label, value, onChangeText, placeholder, returnKeyType, onSubmitEditing, ...rest }, ref) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}  // Permite que o componente receba um ref
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType={returnKeyType}  // Define o botão do teclado como "Next" ou "Done"
        onSubmitEditing={onSubmitEditing}  // Move para o próximo campo ao pressionar "Next"
        blurOnSubmit={false}  // Impede que o teclado feche automaticamente
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default InputField;
