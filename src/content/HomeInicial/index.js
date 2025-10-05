import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList, 
  Dimensions, 
  Image, 
  ScrollView 
} from 'react-native';

import { sliderImages } from '../../utils/staticData';


const { width } = Dimensions.get('window');

export default function HomeInicial({ onNavigateToServices }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % sliderImages.length;

        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image 
        source={item.image} 
        style={styles.slideImage}
        resizeMode="cover" 
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={sliderImages}
          renderItem={renderSlide}
          keyExtractor={item => item.id}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.contentCard}>
        <Text style={styles.title}>Salão Ohana</Text>
        <Text style={styles.subtitle}>Sua beleza, nossa paixão.</Text>
        
        <Text style={styles.aboutText}>
          Oferecemos um ambiente acolhedor e profissionais qualificados para cuidar de você. 
          Explore nossos serviços e agende seu momento de bem-estar.
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={onNavigateToServices}>
          <Text style={styles.buttonText}>Nossos Serviços</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


// Professor, optamos por deixar os styles aqui mesmo, pois necessitávamos do width da tela para o slider funcionar corretamente.

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40,
    backgroundColor: '#f0f0f0',
  },
  contentCard: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },

  sliderContainer: {
    height: 200, 
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },

  slide: {
    width: width,
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 25,
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});