import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../services/authContext';
import { createServico } from '../../services/apiService';
import styles from './styles';

const CreateService = ({ navigation }) => {
    const { user } = useAuth();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [imagemBase64, setImagemBase64] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à galeria para selecionar imagens.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setImageUri(result.assets[0].uri);
            setImagemBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    const removeImage = () => {
        setImageUri(null);
        setImagemBase64('');
    };

    const handleCreateService = async () => {
        if (!nome.trim() || !descricao.trim() || !preco.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const precoNumerico = parseFloat(preco.replace(',', '.'));
        if (isNaN(precoNumerico) || precoNumerico <= 0) {
            Alert.alert('Erro', 'Por favor, insira um preço válido.');
            return;
        }

        setLoading(true);
        try {
            const novoServico = {
                nome: nome.trim(),
                descricao: descricao.trim(),
                preco: precoNumerico,
                imagem: imagemBase64?.trim() || null,
                usuarioId: user.id
            };

            const resultado = await createServico(novoServico);
            
            Alert.alert('Sucesso', 'Serviço criado com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (error) {
            console.error('Erro completo ao criar serviço:', error);
            console.error('Stack trace:', error.stack);
            Alert.alert('Erro', `Não foi possível criar o serviço: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titulo}>ADICIONAR SERVIÇO</Text>

                <View style={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome do Serviço *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Corte de Cabelo"
                            placeholderTextColor="#999"
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Descrição *</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Descreva o serviço..."
                            placeholderTextColor="#999"
                            value={descricao}
                            onChangeText={setDescricao}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Preço (R$) *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: 50.00"
                            placeholderTextColor="#999"
                            value={preco}
                            onChangeText={setPreco}
                            keyboardType="decimal-pad"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Imagem do Serviço (opcional)</Text>
                        
                        {imageUri ? (
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                                <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                                    <Text style={styles.removeImageText}>✕ Remover</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                                <Text style={styles.imagePickerText}>📷 Selecionar Imagem</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity 
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleCreateService}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'CRIANDO...' : 'CRIAR SERVIÇO'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => navigation.goBack()}
                        disabled={loading}
                    >
                        <Text style={styles.cancelButtonText}>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateService;
