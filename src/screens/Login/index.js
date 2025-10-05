import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import  Input from '../../components/Input';
import { useNavigationHandlers } from '../../hookers/useNavigationHandlers';
import { useAuth } from '../../services/authContext';
import { styles } from './styles';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const {
    handleRegisterPress
  } = useNavigationHandlers({ navigation });

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
      return;
    }
    
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Erro no Login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.headerText}> Salão Ohana </Text>

      <View style={styles.card}>
        <Text style={styles.title}> Bem-vindo! </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}> Email </Text>
          <Input
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <Input
            placeholder="********"
            placeholderTextColor="#999"
            secureTextEntry={true}
            autoCapitalize="none"
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerContainer} onPress={handleRegisterPress}>
          <Text style={styles.registerText}>
            Ainda não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
