import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
  FlatList
} from 'react-native';

export default function PontosTuristicosScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);  // Para armazenar a categoria selecionada
  const [isModalVisible, setIsModalVisible] = useState(false);  // Para controlar a visibilidade do modal
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollViewRef = useRef(null);

  const touristSpots = [
    { id: 1, name: 'Praia de Boa Viagem', description: 'Uma das praias mais famosas do Recife', category: 'Praia', image: require('./assets/boa-viagem.png') },
    { id: 2, name: 'Instituto Ricardo Brennand', description: 'Museu renomado', category: 'Museu', image: require('./assets/instituto-ricardo-brennand.png') },
    { id: 3, name: 'Paço do Frevo', description: 'Espaço cultural dedicado ao frevo', category: 'Museu', image: require('./assets/paco-do-frevo.png') },
    { id: 4, name: 'Shopping RioMar', description: 'Centro comercial com opções de lazer', category: 'Shoppings', image: require('./assets/shopping-riomar.png') },
    { id: 5, name: 'Parque da Jaqueira', description: 'Um dos maiores parques urbanos', category: 'Parques', image: require('./assets/parque-da-jaqueira.png') },
    { id: 6, name: 'Marco Zero', description: 'Coração cultural do Recife', category: 'Histórico', image: require('./assets/marco-zero.png') },
    { id: 7, name: 'Shopping Recife', description: 'Centro de compras com lojas e entretenimento', category: 'Shoppings', image: require('./assets/shopping-recife.png') },
    { id: 8, name: 'Museu Cais do Sertão', description: 'Museu sobre o sertão nordestino', category: 'Museu', image: require('./assets/cais-do-sertao.png') },
    { id: 9, name: 'Casa da Cultura', description: 'Centro cultural em uma antiga prisão', category: 'Histórico', image: require('./assets/casa-da-cultura.png') },
    { id: 10, name: 'Jardim Botânico do Recife', description: 'Área verde para educação ambiental', category: 'Natureza', image: require('./assets/jardim-botanico.png') },
    { id: 11, name: 'Parque Dona Lindu', description: 'Parque com projeto de Oscar Niemeyer', category: 'Parques', image: require('./assets/parque-dona-lindu.png') },
    { id: 12, name: 'Basílica de Nossa Senhora do Carmo', description: 'Igreja histórica com arquitetura barroca', category: 'Histórico', image: require('./assets/basilica-do-carmo.png') },
    { id: 13, name: 'Capela Dourada', description: 'Capela com impressionantes talhas em ouro', category: 'Histórico', image: require('./assets/capela-dourada.png') },
    { id: 14, name: 'Parque de Santana', description: 'Parque para esportes e lazer', category: 'Parques', image: require('./assets/parque-de-santana.png') },
    { id: 15, name: 'Mercado de São José', description: 'Mercado tradicional com artesanato', category: 'Histórico', image: require('./assets/mercado-de-sao-jose.png') },
    { id: 16, name: 'Praia do Pina', description: 'Praia tranquila e próxima ao centro', category: 'Praia', image: require('./assets/praia-do-pina.png') },
    { id: 17, name: 'Igreja Madre de Deus', description: 'Igreja barroca do século XVII', category: 'Histórico', image: require('./assets/igreja-madre-de-deus.png') },
    { id: 18, name: 'Rua do Bom Jesus', description: 'Rua histórica com sinagogas', category: 'Histórico', image: require('./assets/rua-do-bom-jesus.png') },
    { id: 19, name: 'Forte das Cinco Pontas', description: 'Fortaleza histórica com museu', category: 'Histórico', image: require('./assets/forte-cinco-pontas.png') },
    { id: 20, name: 'Praça do Arsenal', description: 'Praça no Recife Antigo', category: 'Histórico', image: require('./assets/praca-do-arsenal.png') },
    { id: 21, name: 'Torre Malakoff', description: 'Observatório astronômico', category: 'Histórico', image: require('./assets/torre-malakoff.png') },
    { id: 22, name: 'Cinema São Luiz', description: 'Cine-teatro clássico', category: 'Histórico', image: require('./assets/cinema-sao-luiz.png') },
    { id: 23, name: 'Memorial Chico Science', description: 'Homenagem ao líder do Manguebeat', category: 'Museu', image: require('./assets/memorial-chico-science.png') },
    { id: 24, name: 'Passeio de Catamarã', description: 'Passeio de barco pelos rios do Recife', category: 'Natureza', image: require('./assets/catamara.png') },
  ];

  // Filtra os pontos turísticos com base na categoria selecionada
  const filteredSpots = selectedCategory
    ? touristSpots.filter((spot) => spot.category === selectedCategory)
    : touristSpots;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detalhes', { spotId: item.id })}
      >
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('./assets/recife-bg.jpg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filtrar Locais</Text>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha uma Categoria</Text>
              {['Praia', 'Museu', 'Parques', 'Histórico', 'Shoppings'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedCategory(category);
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{category}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.modalOption, styles.modalOptionClear]}
                onPress={() => {
                  setSelectedCategory(null);
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>Limpar Filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          data={filteredSpots}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.scrollContainer}
        />

        {showScrollToTop && (
          <TouchableOpacity
            style={styles.scrollToTopButton}
            onPress={() => scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          >
            <Text style={styles.scrollToTopText}>↑ Topo</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalOptionClear: {
    borderBottomWidth: 0,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '45%',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  pageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    padding: 10,
    elevation: 4,
  },
  scrollToTopText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
