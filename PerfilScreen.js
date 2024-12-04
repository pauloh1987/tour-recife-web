import React, { useState, useEffect } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ImageBackground,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadProfileImage } from './firebaseConfig'; // Certifique-se de importar a função uploadProfileImage

// Mapeamento dos locais para suas imagens locais
const placesImages = {
  'Praia de Boa Viagem': require('./assets/boa-viagem.png'),
  'Instituto Ricardo Brennand': require('./assets/instituto-ricardo-brennand.png'),
  'Paço do Frevo': require('./assets/paco-do-frevo.png'),
  'Shopping RioMar': require('./assets/shopping-riomar.png'),
  'Parque da Jaqueira': require('./assets/parque-da-jaqueira.png'),
  'Marco Zero': require('./assets/marco-zero.png'),
  'Shopping Recife': require('./assets/shopping-recife.png'),
  'Museu Cais do Sertão': require('./assets/cais-do-sertao.png'),
  'Casa da Cultura': require('./assets/casa-da-cultura.png'),
  'Jardim Botânico do Recife': require('./assets/jardim-botanico.png'),
  'Parque Dona Lindu': require('./assets/parque-dona-lindu.png'),
  'Basílica de Nossa Senhora do Carmo': require('./assets/basilica-do-carmo.png'),
  'Capela Dourada': require('./assets/capela-dourada.png'),
  'Parque de Santana': require('./assets/parque-de-santana.png'),
  'Mercado de São José': require('./assets/mercado-de-sao-jose.png'),
  'Praia do Pina': require('./assets/praia-do-pina.png'),
  'Igreja Madre de Deus': require('./assets/igreja-madre-de-deus.png'),
  'Rua do Bom Jesus': require('./assets/rua-do-bom-jesus.png'),
  'Forte das Cinco Pontas': require('./assets/forte-cinco-pontas.png'),
  'Praça do Arsenal': require('./assets/praca-do-arsenal.png'),
  'Torre Malakoff': require('./assets/torre-malakoff.png'),
  'Cinema São Luiz': require('./assets/cinema-sao-luiz.png'),
  'Memorial Chico Science': require('./assets/memorial-chico-science.png'),
  'Passeio de Catamarã': require('./assets/catamara.png'),
};

export default function PerfilScreen() {
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState([]);  // Lista de locais visitados
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);

  // Função para buscar os dados do usuário
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFullName(data.fullName || '');
            setLocation(data.location || '');
            setProfileImage(data.profileImage || null);
            setVisitedPlaces(data.visitedPlaces || []);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const pickImage = async () => {
    if (!user) {
      alert('Você precisa estar logado para fazer isso.');
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const downloadURL = await uploadProfileImage(user.uid, result.uri);
        setProfileImage(downloadURL);

        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { profileImage: downloadURL }, { merge: true });
        alert('Foto de perfil atualizada com sucesso!');
      } catch (error) {
        alert('Erro ao atualizar a foto de perfil. Tente novamente.');
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert('Você precisa estar logado para salvar as alterações.');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        { fullName, location, visitedPlaces },
        { merge: true }
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/recife-bg.jpg')}
      style={styles.imageBackground}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Perfil do Usuário</Text>

        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          {uploading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Image
              source={profileImage ? { uri: profileImage } : require('./assets/default-avatar.png')}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.infoText}>Clique na imagem para alterar a foto de perfil</Text>

        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Reside em"
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>Nome: {fullName}</Text>
            <Text style={styles.infoText}>Localização: {location}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.subtitle}>Locais Visitados:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {visitedPlaces.length > 0 ? (
            visitedPlaces.map((place, index) => (
              <View style={styles.placeItem} key={index}>
                <Image
                  source={placesImages[place]} // Aqui você associa o nome ao arquivo da imagem
                  style={styles.placeImage}
                />
                <Text style={styles.placeName}>{place}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noPlaces}>Nenhum local visitado ainda.</Text>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    opacity: 0.5,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  profileImageContainer: {
    borderRadius: 60,
    overflow: 'hidden',
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  placeItem: {
    marginRight: 15,
    width: 120,
    height: 120,  
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  placeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeName: {
    fontSize: 14,
    color: '#fff',  // Alterado para branco com sombra
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#000',  // Adicionando sombra para melhorar a visibilidade
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  noPlaces: {
    fontSize: 16,
    color: '#bbb',
  },
});
