import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { useAuth } from '../../services/authContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SideMenu from '../../components/SideMenu'; 
import ProfileModal from '../../components/ProfileModal';
import { styles } from './styles';

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isProfileVisible, setProfileVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!isMenuVisible);
  const toggleProfileModal = () => setProfileVisible(!isProfileVisible);

  const handleLogout = () => {
    if (isMenuVisible) setMenuVisible(false);
    if (isProfileVisible) setProfileVisible(false);
    logout();
  };

  const agendamentos = user?.agendamentos || [];
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
          <Text style={styles.sectionTitle}>Seus Agendamentos</Text>
          {agendamentos.length > 0 ? (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.appointmentsScroll}>
              {agendamentos.map(item => (
                <View key={item.id} style={styles.appointmentCard}>
                  <Text style={styles.appointmentService}>{item.servico}</Text>
                  <Text style={styles.appointmentTime}>{item.horario}</Text>
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