import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../services/authContext';
import styles from './styles';

function BookingScreen({ navigation, route }) {
  const service = route.params?.service;

  const { user, saveAppointment } = useAuth();

  const [nome, setNome] = useState(user?.nome || '');
  const [horario, setHorario] = useState('');
  const [servico, setServico] = useState(service?.title || '');
  const [valor, setValor] = useState(service ? String(service.cost) + ',00' : '');

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      
      if (mode === 'date') {
        setShowPicker(true);
        setMode('time');
      }
    }
  };

  const showDatepicker = () => {
    setMode('date');
    setShowPicker(true);
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');

  const handleConfirmar = async () => {
    if (!nome || !servico || !valor || !date) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newAppointment = {
      servico: servico,
      valor: valor,
      horario: `${date.toLocaleDateString('pt-BR')} - ${date.toLocaleTimeString('pt-BR').slice(0, 5)}`,
      timestamp: date.getTime(),
    };

    try {
      await saveAppointment(newAppointment);

      Alert.alert(
        'Agendamento Confirmado!',
        `Seu horário para ${servico} foi marcado com sucesso.`,
        [
          {
            text: 'Ver Meus Agendamentos',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro ao Agendar', error.message);
    }
  };

   return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f7f7f7'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Agendamento</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Horário</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
            <Text style={styles.datePickerButtonText}>
              {date.toLocaleDateString('pt-BR')} - {date.toLocaleTimeString('pt-BR').slice(0, 5)}
            </Text>
            <Icon name="calendar-month-outline" size={24} color="#333" />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Text style={styles.label}>Serviço</Text>
          <TextInput
            style={[styles.input, service]}
            placeholder="Digite ou selecione um serviço"
            value={servico}
            onChangeText={setServico}
          />

          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput
            style={[styles.input, service ? styles.disabledInput : null]}
            placeholder="0,00"
            value={valor}
            onChangeText={setValor}
            editable={!service}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookingScreen;