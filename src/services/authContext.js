import React, { createContext, useState, useContext } from 'react';
import { loginUser as loginUserService } from './userService';
import { createAgendamento, fetchAgendamentos } from './apiService';

const AuthContext = createContext(null);

//Optei por criar um componente de autenticação para gerenciar o estado do usuário e fornecer funções de login, logout e agendamento. (Não sei se é o melhor jeito, mas achei interessante)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, senha) => {
    try {
      const loggedUser = await loginUserService(email, senha);
      setUser(loggedUser);
      return loggedUser;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const saveAppointment = async (appointmentData) => {
    
    if (!user) throw new Error("Você precisa estar logado para agendar.");
    
    try {
      const novoAgendamento = await createAgendamento(appointmentData);
      return novoAgendamento;
      
    } catch (error) {
      console.error('Erro detalhado do agendamento no authContext:', error);
      console.error('Tipo do erro:', typeof error);
      console.error('Message do erro:', error.message);
      throw error;
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    saveAppointment,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};