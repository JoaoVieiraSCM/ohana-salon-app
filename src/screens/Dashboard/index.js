import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

import { useAuth } from '../../services/authContext';
import { fetchAgendamentos } from '../../services/apiService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SideMenu from '../../components/SideMenu'; 
import ProfileModal from '../../components/ProfileModal';
import { styles } from './styles';

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [apiAgendamentos, setApiAgendamentos] = useState([]);
  
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgendamentos();
  }, [user]);

  const loadAgendamentos = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const allAgendamentos = await fetchAgendamentos();
      
      // Filtrar agendamentos baseado no tipo do usuário
      const userAgendamentos = allAgendamentos.filter(ag => {
        if (user.tipo === 'cliente') {
          // Clientes veem apenas seus próprios agendamentos
          return ag.clienteId === user.id;
        } else {
          // Funcionários/gerentes/ADM veem agendamentos onde são responsáveis pelo serviço
          return ag.usuarioId === user.id;
        }
      });
      
      const mappedAgendamentos = userAgendamentos.map(ag => ({
        ...ag,
        servico: ag.servico || `Serviço ID: ${ag.servicoId}`,
        horario: ag.horario || (ag.dataHora ? new Date(ag.dataHora).toLocaleString('pt-BR') : 'Data não definida'),
        status: ag.status || 'pendente',
        // Adicionar informação sobre tipo de agendamento
        tipoVisualizacao: user.tipo === 'cliente' ? 'meuAgendamento' : 'servicoPrestado'
      }));
      
      setApiAgendamentos(mappedAgendamentos);
    } catch (error) {
      console.warn('Erro ao buscar agendamentos da API:', error);
      setApiAgendamentos([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => setMenuVisible(!isMenuVisible);
  const toggleProfileModal = () => setProfileVisible(!isProfileVisible);

  const handleLogout = () => {
    if (isMenuVisible) setMenuVisible(false);
    if (isProfileVisible) setProfileVisible(false);
    logout();
  };

  // Combina agendamentos do AsyncStorage com os da API
  const localAgendamentos = user?.agendamentos || [];
  const allAgendamentos = [...localAgendamentos];
  
  // Adiciona agendamentos da API que não estão no local
  apiAgendamentos.forEach(apiAg => {
    const exists = localAgendamentos.some(localAg => 
      localAg.id === apiAg.id || 
      (localAg.servico === apiAg.servico && localAg.horario === apiAg.horario)
    );
    if (!exists) {
      allAgendamentos.push(apiAg);
    }
  });

  // Ordena por timestamp se disponível
  const agendamentos = allAgendamentos.sort((a, b) => {
    const timeA = a.timestamp || 0;
    const timeB = b.timestamp || 0;
    return timeB - timeA;
  });

  const proximoAgendamento = agendamentos.length > 0 ? agendamentos[0] : null;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText} numberOfLines={1}>
              Olá, {user?.nome}!
            </Text>
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.menuIconText}>☰</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>
            {user?.tipo === 'cliente' ? 'Seus Agendamentos' : 'Agendamentos dos Seus Serviços'}
          </Text>
          {loading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color="#D4A574" />
              <Text style={styles.emptyText}>Carregando agendamentos...</Text>
            </View>
          ) : agendamentos.length > 0 ? (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.appointmentsScroll}>
              {agendamentos.map((item, index) => (
                <View key={item.id || `agendamento-${index}`} style={styles.appointmentCard}>
                  <Text style={styles.appointmentService}>{item.servico}</Text>
                  <Text style={styles.appointmentTime}>{item.horario || (item.dataHora ? new Date(item.dataHora).toLocaleString('pt-BR') : 'Data não definida')}</Text>
                  <View style={[styles.statusBadge, item.status === 'pendente' ? styles.statusPendente : item.status === 'confirmado' ? styles.statusConfirmado : styles.statusCancelado]}>
                    <Text style={styles.statusText}>{item.status || 'pendente'}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Você ainda não possui agendamentos.</Text>
            </View>
          )}
        </View>

        <View style={styles.newAppointmentCard}>
          <Text style={styles.nextAppointmentTitle}>Próximo Horário</Text>
          <View style={styles.datePickerPlaceholder}>
            {proximoAgendamento ? (
              <Text style={styles.datePickerText}>
                {proximoAgendamento.servico} - {proximoAgendamento.horario}
              </Text>
            ) : (
              <View style={styles.placeholderContent}>
                <Icon name="calendar-blank-outline" size={25} color="#555" />
                <Text style={styles.placeholderText}>--/--/----</Text>
                <Text style={styles.placeholderText}>--:--</Text>
              </View>
            )}
          </View>
          <TouchableOpacity 
            style={styles.yellowButton}
            onPress={() => navigation.navigate('Booking')}
          >
            <Text style={styles.yellowButtonText}>Fazer Novo Agendamento</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isMenuVisible && (
        <>
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.menuOverlay} />
          </TouchableWithoutFeedback>
          <SideMenu
            onClose={toggleMenu}
            navigation={navigation}
            isLoggedIn={!!user}
            userName={user?.nome}
            onLogout={handleLogout}
            onProfilePress={toggleProfileModal}
          />
        </>
      )}

      {isProfileVisible && (
        <ProfileModal 
          visible={isProfileVisible}
          onClose={toggleProfileModal}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </View>
  );
}