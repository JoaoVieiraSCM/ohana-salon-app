import React, { useRef, useEffect } from 'react';
import { useNavigationHandlers } from '../../hookers/useNavigationHandlers';

import { View, Text, Image, TouchableOpacity, Animated, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

const COLLAPSED_HEIGHT = 100;
const EXPANDED_HEIGHT = 270;

export default function Footer({ isExpanded, onToggle, onClose, navigation, onNavigateContent }) {
  const animatedHeight = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;

  useEffect(() => {
    const targetHeight = isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT;

    Animated.timing(animatedHeight, {
      toValue: targetHeight,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const handleLinkPress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${url}`);
    }
  };

  const {
    handleHomePress,
    handleServicesPress,
    handleInfosPress,
  } = useNavigationHandlers({ navigation, onNavigateContent, onClose });

  return (
    <Animated.View style={[styles.container, { height: animatedHeight }]}>
      
      <TouchableOpacity onPress={onToggle} style={styles.handleContainer}>
        <View style={styles.handle} />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo}
            />
          </View>

          <View style={styles.linksContainer}>
            <Text style={styles.pagesTitle}>Páginas</Text>
            <View style={styles.divider} />
            <TouchableOpacity onPress={handleHomePress}>
              <Text style={styles.linkText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInfosPress}>
              <Text style={styles.linkText}>Nossa História</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInfosPress}>
              <Text style={styles.linkText}>Missão</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleServicesPress}>
              <Text style={styles.linkText}>Serviços</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialContainer}>
            <Icon name="instagram" onPress={() => handleLinkPress('https://www.instagram.com/salao.ohana/')} size={35} style={styles.socialIcon} />
            <Icon name="facebook-square" onPress={() => handleLinkPress('https://www.facebook.com/salao.ohana/')} size={35} style={styles.socialIcon} />
          </View>

        </View>
      )}
    </Animated.View>
  );
}