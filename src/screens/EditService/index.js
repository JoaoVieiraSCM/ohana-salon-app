import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../services/authContext';
import { fetchServicoById, updateServico, deleteServico } from '../../services/apiService';
import { servicesData } from '../../utils/staticData';
import styles from './styles';

const EditService = ({ route, navigation }) => {
    const { serviceId } = route.params;
    const { user } = useAuth();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [imagemBase64, setImagemBase64] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        loadServiceData();
    }, []);

    const loadServiceData = async () => {
        try {
            let servico = null;

            try {
                servico = await fetchServicoById(serviceId);
            } catch (apiError) {
            }

            if (!servico) {
                servico = servicesData.find(s => s.id == serviceId);
            }

            if (servico) {
                setNome(servico.nome || servico.title || '');
                setDescricao(servico.descricao || (Array.isArray(servico.items) ? servico.items.join('\n') : '') || '');
                setPreco(String(servico.preco || servico.cost || ''));
                
                const imagem = servico.imagem || servico.imagemBase64 || servico.imagem_base64 || servico.image;
                if (imagem) {
                    if (typeof imagem === 'string') {
                        setImagemBase64(imagem);
                        setImageUri(imagem);
                    } else if (imagem.uri) {
                        setImageUri(imagem.uri);
                    }
                }
            } else {
                throw new Error('Serviço não encontrado');
            }
        } catch (error) {
            console.error('Erro ao carregar serviço:', error);
            Alert.alert('Erro', 'Não foi possível carregar o serviço.');
            navigation.goBack();
        } finally {
            setLoadingData(false);
        }
    };

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

    const handleUpdateService = async () => {
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
            const servicoAtualizado = {
                nome: nome.trim(),
                descricao: descricao.trim(),
                preco: precoNumerico,
                imagem: imagemBase64?.trim() || null,
                usuarioId: user.id
            };

            await updateServico(serviceId, servicoAtualizado);
            Alert.alert('Sucesso', 'Serviço atualizado com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o serviço. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteService = () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await deleteServico(serviceId);
                            Alert.alert('Sucesso', 'Serviço excluído com sucesso!', [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.goBack()
                                }
                            ]);
                        } catch (error) {
                            console.error('Erro ao excluir serviço:', error);
                            Alert.alert('Erro', 'Não foi possível excluir o serviço. Tente novamente.');
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    if (loadingData) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#FFBF00" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titulo}>EDITAR SERVIÇO</Text>

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
                        onPress={handleUpdateService}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={handleDeleteService}
                        disabled={loading}
                    >
                        <Text style={styles.deleteButtonText}>EXCLUIR SERVIÇO</Text>
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

export default EditService;
