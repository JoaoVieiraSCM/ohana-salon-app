import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigationHandlers } from '../../hookers/useNavigationHandlers';
import { useAuth } from '../../services/authContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

import { styles } from './styles'; 

function SideMenu({ onClose, navigation, onNavigateContent, isLoggedIn, userName, onProfilePress }) { 
  const { logout } = useAuth();

  const {
    handleHomePress,
    handleLoginPress,
    handleServicesPress,
    handleInfosPress,
    handleDashboardPress,
    handleBookingPress,
  } = useNavigationHandlers({ navigation, onNavigateContent, onClose });

  return (
    <View style={styles.container}> 
      <View>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />

          {isLoggedIn ? (
            <TouchableOpacity style={styles.profileContainer} onPress={onProfilePress}>
              <Text style={styles.profileName} numberOfLines={1}>{userName}</Text>
              <Icon name="account-circle" size={35} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleLoginPress()}>
              <Text style={styles.loginText}>Entrar</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>Menu</Text>
        <View style={styles.divider} />

        <View style={styles.menuItemsContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleHomePress()}>
            <Icon name="home-variant-outline" style={styles.menuIcon} />
            <Text style={styles.menuText}> Home </Text> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleServicesPress()}>
            <Icon name="store-outline" style={styles.menuIcon} />
            <Text style={styles.menuText}> Serviços </Text> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => handleInfosPress()}>
            <Icon name="lightbulb-on-outline" style={styles.menuIcon} />
            <Text style={styles.menuText}> Missão </Text>
          </TouchableOpacity>
          
          {isLoggedIn && (
            <>
              <View style={[styles.divider, { marginTop: -5 }]} />
              <TouchableOpacity style={styles.menuItem} onPress={() => handleDashboardPress()}>
                <Icon name="view-dashboard-outline" style={styles.menuIcon} />
                <Text style={styles.menuText}>Meus Agendamentos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleBookingPress()}>
                <Icon name="calendar-plus" style={styles.menuIcon} />
                <Text style={styles.menuText}>Agendar Horário</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {isLoggedIn && (
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" style={styles.menuIcon} />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      ) }
    </View>
  );
}
export default SideMenu;