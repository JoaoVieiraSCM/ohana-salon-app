import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { registerUser } from '../../services/userService';
import { useAuth } from '../../services/authContext';
import { useNavigationHandlers } from '../../hookers/useNavigationHandlers';
import { styles } from './styles';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login } = useAuth();

  const {
    handleLoginPress,
    handleHomePress
  } = useNavigationHandlers({ navigation });

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const newUser = await registerUser({ nome: name, email, senha: password });
      await login(email, password);

      Alert.alert(
        'Cadastro Realizado!',
        `Bem-vindo(a), ${newUser.nome}!`,
        [
          { 
            text: 'Continuar', 
            onPress: () => handleHomePress()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro no Cadastro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Salão Ohana </Text>

      <View style={styles.card}>
        <Text style={styles.title}> Cadastre-se </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}> Nome </Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}> Email </Text>
          <TextInput
            style={styles.input}
            placeholder="email@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerContainer}
          onPress={handleLoginPress}>
          <Text style={styles.registerText}>Já possui conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterScreen;
