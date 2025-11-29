import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ohana_salon_services';

const getApiUrl = () => {
  const debugInfo = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  
  if (debugInfo) {
    const host = debugInfo.split(':').shift();
    return `http://${host}:8080`;
  }
  
  const MANUAL_IP = '172.16.0.104';
  return `http://${MANUAL_IP}:8080`;
};

const API_BASE_URL = getApiUrl();

export const fetchUsuarios = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`);
    if (!response.ok) throw new Error('Erro ao buscar usuários');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const fetchUsuarioByEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/email?email=${encodeURIComponent(email)}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) return null; // Se der erro, assume que não existe
    return await response.json();
  } catch (error) {
    // Se der erro de network ou endpoint não existe, retorna null
    return null;
  }
};

export const createUsuario = async (userData) => {
  try {
    // Tenta verificar se email existe (se endpoint existir)
    const usuarioExistente = await fetchUsuarioByEmail(userData.email);
    if (usuarioExistente) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const userDataFormatted = {
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha,
      telefone: userData.telefone,
      tipo: 'cliente'
    };

    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataFormatted),
    });
    
    if (!response.ok) {
      let errorText = await response.text();
      
      if (response.status === 500 || 
          errorText.includes('23505') || 
          errorText.includes('duplicate') || 
          errorText.includes('duplicar') ||
          errorText.includes('usuarios_email_key') ||
          errorText.includes('unicidade')) {
        throw new Error('Este e-mail já está cadastrado.');
      }
      
      if (errorText === 'Something went wrong' || !errorText) {
        throw new Error('Erro ao criar usuário. Tente novamente.');
      }
      
      throw new Error(errorText);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginUsuario = async (email, senha) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`);
    if (!response.ok) {
      if (response.status === 401 || response.status === 404) {
        throw new Error('E-mail ou senha inválidos.');
      }
      throw new Error('Erro ao fazer login');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUsuarioById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

export const updateUsuario = async (id, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Erro ao atualizar usuário');
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
    return await response.json();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

export const fetchServicos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/servicos`);
    if (!response.ok) throw new Error('Erro ao buscar serviços');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    throw error;
  }
};

export const getServicesList = async () => {
  try {
    const apiServices = await fetchServicos();
    return Array.isArray(apiServices) ? apiServices : [];
  } catch (error) {
    console.error('Erro ao buscar lista de serviços:', error);
    return [];
  }
};

export const createServico = async (servicoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servicoData),
    });

    const responseText = await response.text();
    if (!response.ok) {
      console.error('Erro ao criar serviço - status:', response.status, 'body:', responseText);
      throw new Error(responseText || `Erro ao criar serviço (${response.status})`);
    }

    try {
      return responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      console.warn('Resposta de criação de serviço não é JSON:', responseText);
      return null;
    }
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    throw error;
  }
};

export const fetchServicoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servicos/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar serviço');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    throw error;
  }
};

export const updateServico = async (id, servicoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servicoData),
    });
    const responseText = await response.text();
    if (!response.ok) {
      console.error('Erro ao atualizar serviço - status:', response.status, 'body:', responseText);
      throw new Error(responseText || `Erro ao atualizar serviço (${response.status})`);
    }
    try {
      return responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      console.warn('Resposta de atualização de serviço não é JSON:', responseText);
      return null;
    }
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    throw error;
  }
};

export const deleteServico = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servicos/${id}`, {
      method: 'DELETE',
    });
    const responseText = await response.text();
    if (!response.ok) {
      console.error('Erro ao deletar serviço - status:', response.status, 'body:', responseText);
      throw new Error(responseText || `Erro ao deletar serviço (${response.status})`);
    }
    try {
      return responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      console.warn('Resposta de exclusão de serviço não é JSON:', responseText);
      return null;
    }
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    throw error;
  }
};

export const fetchAgendamentos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendamentos`);
    if (!response.ok) throw new Error('Erro ao buscar agendamentos');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    throw error;
  }
};

export const getServicesWithCache = async (staticFallback = []) => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    
    const apiServices = await fetchServicos();
    
    if (Array.isArray(apiServices) && apiServices.length > 0) {
      const uniqueServices = apiServices.filter((service, index, array) => {
        return array.findIndex(s => s.id === service.id) === index;
      });
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueServices));
      return uniqueServices;
    }
  } catch (error) {
  }

  return staticFallback;
};

export const createAgendamento = async (agendamentoData) => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agendamentoData),
    });
    
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('❌ Erro HTTP:', response.status, responseText);
      
      // Tratar diferentes tipos de erro
      if (response.status === 500) {
        console.error('🚨 Erro interno do servidor (500)');
        if (responseText.includes('23514') && responseText.includes('agendamentos_check')) {
          throw new Error('Funcionários não podem agendar serviços para si mesmos.');
        } else if (responseText.includes('agendamentos_check')) {
          throw new Error('Este agendamento viola uma regra de negócio do sistema.');
        } else if (responseText === 'Something went wrong') {
          throw new Error('Erro interno do servidor. Verifique se todos os dados estão corretos e se o serviço selecionado existe.');
        }
      } else if (response.status === 400) {
        console.error('🚨 Erro de dados (400)');
        throw new Error(`Dados inválidos: ${responseText}`);
      } else if (response.status === 404) {
        console.error('🚨 Endpoint não encontrado (404)');
        throw new Error('Serviço de agendamento não encontrado no servidor.');
      }
      
      throw new Error(`Erro ${response.status}: ${responseText || 'Erro desconhecido'}`);
    }
    
    try {
      const parsedResponse = responseText ? JSON.parse(responseText) : null;
      return parsedResponse;
    } catch (parseError) {
      return responseText;
    }
  } catch (error) {
    console.error('❌ Erro ao criar agendamento:', error.message);
    throw error;
  }
};

export const fetchAgendamentoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar agendamento');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    throw error;
  }
};

export const updateAgendamento = async (id, agendamentoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agendamentoData),
    });
    if (!response.ok) throw new Error('Erro ao atualizar agendamento');
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    throw error;
  }
};

export const deleteAgendamento = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar agendamento');
    return await response.json();
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    throw error;
  }
};
