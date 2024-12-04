import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { auth, db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserName(userData.fullName || 'Usuário');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <ImageBackground
      source={require('./assets/recife-bg.jpg')} // Substitua pelo caminho da imagem
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>
            Bem-vindo ao Tour Recife, {userName}!
          </Text>
        </View>

        {/* Botões com imagens ajustadas */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PontosTuristicos')}
          >
            <Image source={require('./assets/marco-zero.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Pontos Turísticos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Agenda')}
          >
            <Image source={require('./assets/calendario-estilizado.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Agenda Semanal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Image source={require('./assets/default-avatar.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Meu Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Roteiros')}
          >
            <Image source={require('./assets/mapa-de-trilha.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Roteiros Sugeridos</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay escuro para contraste
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 50, // Mais espaço no topo
    marginBottom: 20,
  },
  logo: {
    width: 250, // Logo maior
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 36, // Texto maior
    fontWeight: 'bold',
    color: '#fff', // Texto branco para contraste
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20, // Espaçamento entre o cabeçalho e os botões
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20, // Mais espaço entre os botões
    width: 220, // Botões maiores
    height: 280,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 6,
  },
  buttonImage: {
    width: '100%',
    height: '65%', // Imagem ocupa mais espaço no botão
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  buttonText: {
    color: '#333',
    fontSize: 20, // Texto maior nos botões
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15, // Espaçamento entre a imagem e o texto
  },
});
