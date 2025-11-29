// Substitui aqui por AsyncStorage para persistência de dados prof jef (Assim como o senhor falou na aula)!!!
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { 
  createUsuario as createUsuarioAPI, 
  fetchUsuarios as fetchUsuariosAPI,
  updateUsuario as updateUsuarioAPI,
  loginUsuario as loginUsuarioAPI 
} from './apiService';

const USERS_KEY = '@salao_ohana_users';

export const registerUser = async (userData) => {
  const { nome, email, senha, telefone } = userData;

  if (!nome || !email || !senha) {
    throw new Error('Todos os campos são obrigatórios.');
  }

  try {
    const apiUser = await createUsuarioAPI({
      nome,
      email,
      senha,
      telefone: telefone || '11999999999',
      tipo: 'cliente',
    });

    return apiUser;

  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, senha) => {
  try {
    const user = await loginUsuarioAPI(email, senha);
    return user;
  } catch (error) {
    throw error;
  }
};

export const addAppointment = async (userId, appointmentData) => {
  throw new Error("Use createAgendamento da apiService para criar agendamentos");
};