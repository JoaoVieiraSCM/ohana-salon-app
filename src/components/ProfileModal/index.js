import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

export default function ProfileModal({ visible, onClose, user, onLogout }) {
  if (!user) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          
          <View onStartShouldSetResponder={() => true} style={styles.container}>
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.profileIconContainer}>
              <Icon name="account-circle" size={100} color="#ccc" />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Nome</Text>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>{user.nome}</Text>
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>{user.email}</Text>
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>********</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.redefineLink}>Redefinir senha</Text>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}