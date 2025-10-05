import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'; 
import { styles } from './styles';

function Navbar({ imagem, titulo, onMenuPress }){
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {imagem && (
          <Image 
            source={imagem} 
            style={styles.logo} 
          />
        )}
        <Text style={styles.title} numberOfLines={1}>{titulo}</Text>
      </View>
      
      <TouchableOpacity onPress={onMenuPress}>
        <Text style={styles.menuIconText}>☰</Text>
      </TouchableOpacity>

 
    </View>
  );
}

export default Navbar; 