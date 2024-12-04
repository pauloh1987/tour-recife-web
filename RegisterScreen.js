import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!fullName || !birthDate) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
      alert('Por favor, insira a data de nascimento no formato DD/MM/AAAA.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        birthDate,
        email,
      });

      navigation.replace('Home');
    } catch (error) {
      alert('Erro ao registrar: ' + error.message);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/letreiro-recife-2.png')} // Substitua pelo caminho da imagem
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.form}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.description}>
            Registre-se para acessar todos os recursos e explorar o melhor de Recife!
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#aaa"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor="#aaa"
            value={birthDate}
            onChangeText={(text) => {
              const rawText = text.replace(/[^0-9]/g, '');
              let formattedText = rawText;
              if (rawText.length > 2 && rawText.length <= 4) {
                formattedText = `${rawText.slice(0, 2)}/${rawText.slice(2)}`;
              } else if (rawText.length > 4) {
                formattedText = `${rawText.slice(0, 2)}/${rawText.slice(2, 4)}/${rawText.slice(4, 8)}`;
              }
              setBirthDate(formattedText);
            }}
            keyboardType="numeric"
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirme a Senha"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerText}>
              Já tem uma conta? <Text style={styles.registerHighlight}>Faça login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  form: {
    width: '90%',
    maxWidth: 450,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#495057',
    marginBottom: 15,
    backgroundColor: '#f1f3f5',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerButton: {
    marginTop: 10,
  },
  registerText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
  },
  registerHighlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
