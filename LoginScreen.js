import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Importando os métodos de autenticação

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função para autenticar o usuário
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Preencha todos os campos!');
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Obtendo o usuário logado
      console.log('Login realizado com sucesso!', user);

      // Após o login bem-sucedido, redireciona para a tela principal
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setErrorMessage('Credenciais inválidas. Tente novamente.');
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
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.description}>
            Acesse sua conta para explorar o melhor do Recife e aproveitar todas as funcionalidades!
          </Text>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>
              Não tem uma conta?{' '}
              <Text style={styles.registerHighlight}>Registre-se</Text>
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
    width: '90%', // Usa 90% da largura em telas menores
    maxWidth: 450, // Define um limite para telas maiores
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
  },
  logo: {
    width: 200, // Aumentado para maior visibilidade
    height: 200,
    marginBottom: 30,
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
  errorText: {
    color: '#e63946',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
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
