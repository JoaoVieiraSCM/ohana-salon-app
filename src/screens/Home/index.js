import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import { useAuth } from '../../services/authContext';
import ProfileModal from '../../components/ProfileModal';

import Navbar from '../../components/Navbar';
import SideMenu from '../../components/SideMenu';
import ServicesContent from '../../content/Services';
import HomeInicialContent from '../../content/HomeInicial';
import InfosContent from '../../content/Infos';
import Footer from '../../components/Footer';

export default function VitrineScreen({ navigation, route }) {
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [comodoAtual, setComodoAtual] = useState('Home');

  useEffect(() => {
    if (route.params?.initialContent) {
      setComodoAtual(route.params.initialContent);
    }
  }, [route.params?.initialContent]);

  const [footerExpanded, setFooterExpanded] = useState(false);

  const toggleMenu = () => setMenuVisivel(!menuVisivel);
  const toggleFooter = () => setFooterExpanded(!footerExpanded);

  const { user, isLoggedIn, logout } = useAuth();

  const [isProfileVisible, setProfileVisible] = useState(false);
  const toggleProfileModal = () => setProfileVisible(!isProfileVisible);

  const handleLogout = () => {
    logout();
    if (isProfileVisible) setProfileVisible(false);
    if (menuVisivel) setMenuVisivel(false);
  };

  return (
    <View style={styles.container}>
      <Navbar
        imagem={require('../../assets/images/logo.png')}
        titulo="Salão Ohana"
        onMenuPress={toggleMenu}
        navigation={navigation}
      />
      <View style={styles.content}>
        {comodoAtual === 'Home' && (
          <HomeInicialContent
            onNavigateToServices={() => setComodoAtual('Servicos')}
          />
        )}
        {comodoAtual === 'Servicos' && (
          <ServicesContent navigation={navigation}/>
        )}
        {comodoAtual === 'Infos' && (
          <InfosContent navigation={navigation} />
        )}
      </View>
      {footerExpanded && (
        <TouchableWithoutFeedback onPress={toggleFooter}>
          <View style={styles.footerOverlay} />
        </TouchableWithoutFeedback>
      )}

      <Footer
        isExpanded={footerExpanded}
        onClose={toggleFooter}
        onToggle={toggleFooter}
        navigation={navigation}
        onNavigateContent={setComodoAtual}
      />
      {menuVisivel && (
        <View style={styles.menuContainer}>
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.overlayBackground} />
          </TouchableWithoutFeedback>

          <SideMenu
            onClose={toggleMenu}
            navigation={navigation}
            onNavigateContent={setComodoAtual}
            isLoggedIn={isLoggedIn}
            userName={user?.nome}
            onLogout={handleLogout}
            onProfilePress={toggleProfileModal}
          />
        </View>
      )}

       <ProfileModal 
          visible={isProfileVisible}
          onClose={toggleProfileModal}
          user={user}
          onLogout={handleLogout}
        />
    </View>
  );
}