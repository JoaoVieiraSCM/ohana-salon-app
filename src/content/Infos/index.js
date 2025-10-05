import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { infosData } from '../../utils/staticData';

import { styles } from './styles';


export default function InfosContent({ props }) {

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      {infosData.map(item => (
        <View key={item.title} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardText}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}