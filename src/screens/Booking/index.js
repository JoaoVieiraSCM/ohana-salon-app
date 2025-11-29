import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Alert, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../services/authContext';
import { fetchServicos } from '../../services/apiService';
import styles from './styles';

function BookingScreen({ navigation, route }) {
  const service = route.params?.service;

  const { user, saveAppointment } = useAuth();

  const [nome, setNome] = useState(user?.nome || '');
  const [horario, setHorario] = useState('');
  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [valor, setValor] = useState('');

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

  useEffect(() => {
    loadServicos();
  }, []);

  useEffect(() => {
    if (service) {
      const servicoEncontrado = servicos.find(s => s.id === service.id || s.title === service.title);
      if (servicoEncontrado) {
        setServicoSelecionado(servicoEncontrado);
        setValor(String(servicoEncontrado.preco || servicoEncontrado.cost) + ',00');
      }
    }
  }, [service, servicos]);

  const loadServicos = async () => {
    try {
      const servicosData = await fetchServicos();
      setServicos(servicosData);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      Alert.alert('Aviso', 'Não foi possível carregar os serviços.');
    }
  };

  const handleServicoChange = (servicoId) => {
    const servico = servicos.find(s => s.id === servicoId);
    if (servico) {
      setServicoSelecionado(servico);
      setValor(String(servico.preco || servico.cost) + ',00');
    }
  };

  const handleConfirmar = async () => {
    if (!nome || !servicoSelecionado || !valor || !date) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Verificar se funcionário está tentando agendar para si mesmo
    if (user && (user.tipo === 'funcionario' || user.tipo === 'gerente' || user.tipo === 'ADM')) {
      Alert.alert(
        'Agendamento Não Permitido',
        'Funcionários não podem agendar serviços para si mesmos. Esta funcionalidade é destinada apenas aos clientes.',
        [{ text: 'Entendi', style: 'default' }]
      );
      return;
    }

    // Validações adicionais
    if (!user || !user.id) {
      Alert.alert('Erro', 'Usuário não identificado. Faça login novamente.');
      return;
    }

    if (!servicoSelecionado || !servicoSelecionado.id) {
      Alert.alert('Erro', 'Serviço selecionado inválido. Selecione um serviço válido.');
      return;
    }

    if (!servicoSelecionado.usuarioId) {
      Alert.alert('Erro', 'Este serviço não possui um funcionário responsável definido. Entre em contato com o salão.');
      return;
    }

    const dataFormatada = date.toISOString().slice(0, 19);

    const newAppointment = {
      clienteId: parseInt(user.id),
      usuarioId: parseInt(servicoSelecionado.usuarioId || servicoSelecionado.id),
      servicoId: parseInt(servicoSelecionado.id),
      dataHora: dataFormatada,
      status: 'pendente'
    };

    try {
      const resultado = await saveAppointment(newAppointment);

      Alert.alert(
        'Agendamento Confirmado!',
        `Seu horário para ${servicoSelecionado.nome || servicoSelecionado.title} foi marcado com sucesso.`,
        [
          {
            text: 'Ver Meus Agendamentos',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    } catch (error) {
      console.error('❌ Erro no agendamento:', error);
      
      if (error.message && error.message.includes('Funcionários não podem agendar')) {
        Alert.alert(
          'Agendamento Não Permitido',
          'Funcionários não podem agendar serviços para si mesmos. Esta funcionalidade é destinada apenas aos clientes.'
        );
      } else if (error.message && error.message.includes('Erro interno do servidor')) {
        Alert.alert(
          'Erro no Servidor',
          'Ocorreu um problema interno no servidor. Verifique se:\n\n• O serviço selecionado existe\n• Sua conexão está estável\n• Tente novamente em alguns instantes'
        );
      } else if (error.message && error.message.includes('Dados inválidos')) {
        Alert.alert(
          'Dados Inválidos',
          'Os dados do agendamento estão incorretos. Verifique se todos os campos estão preenchidos corretamente.'
        );
      } else if (error.message && error.message.includes('não encontrado')) {
        Alert.alert(
          'Serviço Indisponível',
          'O serviço de agendamento não está disponível no momento. Tente novamente mais tarde.'
        );
      } else if (error.message && error.message.includes('Erro 500')) {
        Alert.alert(
          'Problema no Servidor',
          'O servidor está com problemas internos. Possíveis causas:\n\n• Serviço inexistente\n• Dados de usuário inválidos\n• Problema na base de dados\n\nTente novamente em alguns minutos.'
        );
      } else {
        Alert.alert(
          'Erro ao Agendar',
          `Ocorreu um erro inesperado:\n\n${error.message}\n\nTente novamente ou entre em contato com o suporte.`
        );
      }
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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={servicoSelecionado?.id}
              onValueChange={handleServicoChange}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um serviço" value={null} />
              {servicos.map((servico) => (
                <Picker.Item 
                  key={servico.id} 
                  label={servico.nome || servico.title} 
                  value={servico.id} 
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="0,00"
            value={valor}
            editable={false}
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