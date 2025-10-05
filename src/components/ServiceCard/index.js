import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigationHandlers } from '../../hookers/useNavigationHandlers';
import { useAuth } from '../../services/authContext';
import { styles } from './styles';

export default function ServiceCard({ service, navigation }) {
  const { title, items, image, cost } = service;
  const { isLoggedIn } = useAuth();

  const { 
    handleLoginPress, 
    handleBookingPress
  } = useNavigationHandlers({ navigation, onClose: null });

  const handleSchedulePress = () => {
    if (isLoggedIn) {
      handleBookingPress(service);
    } else {
      handleLoginPress();
    }
  };

  return (
    <View style={styles.card}>
    <Image source={image} style={styles.serviceImage} />
      <Text style={styles.title}>{title}</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.itemText}>
          {item}
        </Text>
      ))}
      <Text style={styles.budgetText}>Faça um orçamento</Text>
      <TouchableOpacity style={styles.button} onPress={handleSchedulePress}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}