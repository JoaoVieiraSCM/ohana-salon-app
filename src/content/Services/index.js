import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ServiceCard from '../../components/ServiceCard';
import { styles } from './styles';
import { getServicesList } from '../../services/apiService';
import { useAuth } from '../../services/authContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ServicesContent({ navigation }) {
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    const servicesList = await getServicesList();
    setServices(servicesList);
  };

  useFocusEffect(
    useCallback(() => {
      loadServices();
    }, [])
  );

  useEffect(() => {
    loadServices();
  }, []);

  const isAdmin = user && (user.tipo === 'ADM' || user.tipo === 'gerente');

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Serviços</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceCard service={item} navigation={navigation} />
        )}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 10 }}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="scissors-cutting" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Nenhum serviço disponível</Text>
            <Text style={styles.emptyDescription}>
              {isAdmin 
                ? 'Adicione o primeiro serviço usando o botão abaixo!' 
                : 'Em breve teremos novos serviços disponíveis.'
              }
            </Text>
          </View>
        )}
        ListFooterComponent={
          isAdmin ? (
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('CreateService')}
            >
              <Icon name="plus-circle" size={24} color="#FFF" />
              <Text style={styles.addButtonText}>Adicionar Serviço</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}
