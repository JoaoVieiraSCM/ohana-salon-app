import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigationHandlers } from '../../hookers/useNavigationHandlers';
import { useAuth } from '../../services/authContext';
import { styles } from './styles';
import { servicesData } from '../../utils/staticData';

export default function ServiceCard({ service, navigation }) {
  const displayTitle = service.nome || service.title || 'Serviço';
  const descriptionItems = Array.isArray(service.items)
    ? service.items
    : service.descricao
      ? service.descricao.split('\n').filter(Boolean)
      : [];
  const displayCost = service.preco ?? service.cost;
  const serviceId = service.id;

  let displayImage = null;
  if (service.imagem) {
    displayImage = { uri: service.imagem };
  } else if (service.imagemBase64) {
    const imagemStr = service.imagemBase64.startsWith('data:')
      ? service.imagemBase64
      : `data:image/jpeg;base64,${service.imagemBase64}`;
    displayImage = { uri: imagemStr };
  } else if (service.imagem_base64) {
    const imagemStr = service.imagem_base64.startsWith('data:')
      ? service.imagem_base64
      : `data:image/jpeg;base64,${service.imagem_base64}`;
    displayImage = { uri: imagemStr };
  } else if (service.image) {
    displayImage = service.image;
  } else {
    // Busca imagem do serviço correspondente no utils (invertendo a ordem)
    const serviceIndex = ((parseInt(serviceId) || 1) - 1) % servicesData.length;
    const reversedIndex = (servicesData.length - 1) - serviceIndex;
    const fallbackService = servicesData[reversedIndex];
    displayImage = fallbackService ? fallbackService.image : require('../../assets/images/cabelo.jpg');
  }

  const serviceForNavigation = {
    ...service,
    nome: service.nome || service.title,
    preco: service.preco ?? service.cost,
    descricao: service.descricao || (Array.isArray(service.items) ? service.items.join('\n') : ''),
    imagem: service.imagem || null,
    usuarioId: service.usuarioId ?? null,
  };

  const { isLoggedIn, user } = useAuth();

  const { 
    handleLoginPress, 
    handleBookingPress
  } = useNavigationHandlers({ navigation, onClose: null });

  const isAdmin = user && (user.tipo === 'ADM' || user.tipo === 'gerente');

  const handleSchedulePress = () => {
    if (isLoggedIn) {
      handleBookingPress(serviceForNavigation);
    } else {
      handleLoginPress();
    }
  };

  const handleEditPress = () => {
    if (!serviceId) {
      return;
    }
    navigation.navigate('EditService', { serviceId });
  };

  return (
    <View style={styles.card}>
      {isAdmin && (
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Icon name="edit" size={20} color="#FFD700" />
        </TouchableOpacity>
      )}
      {displayImage && <Image source={displayImage} style={styles.serviceImage} />}
      <Text style={styles.title}>{displayTitle}</Text>
      {descriptionItems.map((item, index) => (
        <Text key={`${serviceId}-${index}`} style={styles.itemText}>
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