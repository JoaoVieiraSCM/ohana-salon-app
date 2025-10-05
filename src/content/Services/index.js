import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import ServiceCard from '../../components/ServiceCard';
import { styles } from './styles';
import { servicesData } from '../../utils/staticData';

export default function ServicesContent({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.headerTitle}>Serviços</Text>

      {servicesData.map(service => (
        <ServiceCard 
          key={service.title} 
          service={service}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}
