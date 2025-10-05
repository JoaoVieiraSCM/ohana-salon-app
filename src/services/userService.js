// Substitui aqui por AsyncStorage para persistência de dados prof jef (Assim como o senhor falou na aula)!!!
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const USERS_KEY = '@salao_ohana_users';

export const registerUser = async (userData) => {
  const { nome, email, senha } = userData;

  if (!nome || !email || !senha) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  try {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      throw new Error('Este e-mail já está cadastrado.');
    }
    
    const newUser = {
      id: Date.now().toString(),
      nome,
      email,
      senha,
      agendamentos: [],
    };

    const updatedUsers = [...users, newUser];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    return newUser;

  } catch (error) {
        Alert.alert('Erro', error.message);
        console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

export const loginUser = async (email, senha) => {
  try {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    if (!storedUsers) {
      throw new Error('Nenhum usuário cadastrado.');
    }

    const users = JSON.parse(storedUsers);
    const foundUser = users.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && user.senha === senha
    );

    if (!foundUser) {
      throw new Error('E-mail ou senha inválidos.');
    }

    return foundUser;

  } catch (error) {
    throw error;
  }
};

export const addAppointment = async (userId, appointmentData) => {
  try {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    if (!storedUsers) throw new Error("Nenhum usuário encontrado.");
    
    let users = JSON.parse(storedUsers);
    let userToUpdate = null;
    let userIndex = -1;

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        userToUpdate = users[i];
        userIndex = i;
        break;
      }
    }

    if (!userToUpdate) throw new Error("Usuário não encontrado para agendamento.");

    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
    };
    userToUpdate.agendamentos.push(newAppointment);

    users[userIndex] = userToUpdate;

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

    return userToUpdate;

  } catch (error) {
    throw error;
  }
};