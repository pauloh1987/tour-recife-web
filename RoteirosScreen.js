import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Picker, 
  ScrollView, 
  Image, 
  Button 
} from 'react-native';

// Dados dos pontos turísticos organizados por proximidade com o texto detalhado do dia
const roteirosPorDias = {
  1: [
    {
      name: "1° Dia – Recife Antigo e Catamarã",
      description: "Explore o Recife Antigo com seus centros culturais e finalize o dia com um passeio de Catamarã.",
      image: require('./assets/recife-bg.jpg'),
      locations: [
        {
          name: "Marco Zero",
          description: "Ponto inicial e coração cultural do Recife. Conheça as famosas esculturas e aprecie a vista do porto.",
          image: require('./assets/marco-zero.png'),
        },
        {
          name: "Passeio de Catamarã",
          description: "Passeio de barco pelos rios de Recife ao pôr do sol.",
          image: require('./assets/catamara.png'),
        }
      ]
    }
  ],
  2: [
    {
      name: "2° Dia – Recife Antigo e Museu Cais do Sertão",
      description: "Explore o Recife Antigo e se encante com o Museu Cais do Sertão.",
      image: require('./assets/recife-bg.jpg'),
      locations: [
        {
          name: "Marco Zero",
          description: "Ponto inicial e coração cultural do Recife. Conheça as famosas esculturas e aprecie a vista do porto.",
          image: require('./assets/marco-zero.png'),
        },
        {
          name: "Museu Cais do Sertão",
          description: "Museu moderno sobre o sertão nordestino. Um passeio cultural e interativo pelo universo sertanejo.",
          image: require('./assets/cais-do-sertao.png'),
        }
      ]
    },
    {
      name: "2° Dia – Paço do Frevo e Praia de Boa Viagem",
      description: "Descubra o Paço do Frevo, um centro cultural dedicado ao frevo, e termine o dia na famosa Praia de Boa Viagem.",
      image: require('./assets/paco-do-frevo.png'),
      locations: [
        {
          name: "Paço do Frevo",
          description: "Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade. Um mergulho na história do frevo com oficinas interativas.",
          image: require('./assets/paco-do-frevo.png'),
        },
        {
          name: "Praia de Boa Viagem",
          description: "Uma das praias mais famosas de Recife, com águas mornas e recifes naturais. Perfeita para relaxar, praticar esportes e aproveitar o calçadão.",
          image: require('./assets/boa-viagem.png'),
        }
      ]
    }
  ],
  3: [
    {
      name: "3° Dia – Marco Zero, Rua do Bom Jesus e Shopping Recife",
      description: "Comece o dia explorando a história no Marco Zero e na Rua do Bom Jesus, seguida de um passeio relaxante no Shopping Recife.",
      image: require('./assets/recife-bg.jpg'),
      locations: [
        {
          name: "Marco Zero",
          description: "Ponto inicial e coração cultural do Recife. Conheça as famosas esculturas e aprecie a vista do porto.",
          image: require('./assets/marco-zero.png'),
        },
        {
          name: "Rua do Bom Jesus",
          description: "Rua histórica com igrejas, lojas e um dos principais pontos turísticos de Recife Antigo. Lar da primeira sinagoga das Américas.",
          image: require('./assets/rua-do-bom-jesus.png'),
        },
        {
          name: "Shopping Recife",
          description: "Grande shopping center com lojas e entretenimento. Oferece eventos culturais e espaço kids.",
          image: require('./assets/shopping-recife.png'),
        }
      ]
    }
  ],
  4: [
    {
      name: "4° Dia – Marco Zero, Shopping RioMar e Paço do Frevo",
      description: "Combine história, compras e cultura com uma visita ao Marco Zero, ao shopping RioMar e ao Paço do Frevo.",
      image: require('./assets/recife-bg.jpg'),
      locations: [
        {
          name: "Marco Zero",
          description: "Ponto inicial e coração cultural do Recife. Conheça as famosas esculturas e aprecie a vista do porto.",
          image: require('./assets/marco-zero.png'),
        },
        {
          name: "Shopping RioMar",
          description: "Centro comercial com diversas opções de lojas, restaurantes e cinemas.",
          image: require('./assets/shopping-riomar.png'),
        },
        {
          name: "Paço do Frevo",
          description: "Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.",
          image: require('./assets/paco-do-frevo.png'),
        }
      ]
    }
  ],
  5: [
    {
      name: "5° Dia – Paço do Frevo, Igreja Madre de Deus, Mercado de São José",
      description: "Aprofunde-se na cultura local com o Paço do Frevo e visite a Igreja Madre de Deus e o Mercado de São José.",
      image: require('./assets/mercado-de-sao-jose.png'),
      locations: [
        {
          name: "Paço do Frevo",
          description: "Espaço cultural dedicado ao frevo, patrimônio imaterial da humanidade.",
          image: require('./assets/paco-do-frevo.png'),
        },
        {
          name: "Igreja Madre de Deus",
          description: "Igreja barroca do século XVII. Atração histórica e religiosa imperdível.",
          image: require('./assets/igreja-madre-de-deus.png'),
        },
        {
          name: "Mercado de São José",
          description: "Mercado tradicional com artesanato e comidas típicas.",
          image: require('./assets/mercado-de-sao-jose.png'),
        }
      ]
    }
  ],
  6: [
    {
      name: "6° Dia – Forte das Cinco Pontas, Museu Cais do Sertão e Parque Dona Lindu",
      description: "Explore a história do Recife no Forte das Cinco Pontas e no Museu Cais do Sertão, e depois relaxe no Parque Dona Lindu.",
      image: require('./assets/forte-cinco-pontas.png'),
      locations: [
        {
          name: "Forte das Cinco Pontas",
          description: "Fortaleza histórica com museu sobre o Recife.",
          image: require('./assets/forte-cinco-pontas.png'),
        },
        {
          name: "Museu Cais do Sertão",
          description: "Museu moderno sobre o sertão nordestino.",
          image: require('./assets/cais-do-sertao.png'),
        },
        {
          name: "Parque Dona Lindu",
          description: "Parque com projeto de Oscar Niemeyer, ideal para lazer e caminhadas.",
          image: require('./assets/parque-dona-lindu.png'),
        }
      ]
    }
  ],
  7: [
    {
      name: "7° Dia – Praça do Arsenal, Igreja Madre de Deus, Museu do Frevo e Mercado de São José",
      description: "Combine cultura e lazer visitando a Praça do Arsenal, Igreja Madre de Deus, Museu do Frevo e Mercado de São José.",
      image: require('./assets/praca-do-arsenal.png'),
      locations: [
        {
          name: "Praça do Arsenal",
          description: "Praça no Recife Antigo com bares e eventos culturais.",
          image: require('./assets/praca-do-arsenal.png'),
        },
        {
          name: "Igreja Madre de Deus",
          description: "Igreja barroca do século XVII.",
          image: require('./assets/igreja-madre-de-deus.png'),
        },
        {
          name: "Museu do Frevo",
          description: "Museu dedicado ao Frevo, patrimônio cultural de Pernambuco.",
          image: require('./assets/paco-do-frevo.png'),
        },
        {
          name: "Mercado de São José",
          description: "Mercado tradicional com artesanato e comidas típicas.",
          image: require('./assets/mercado-de-sao-jose.png'),
        }
      ]
    }
  ]
};

const RoteirosScreen = () => {
  const [dias, setDias] = useState(1);
  const [roteiro, setRoteiro] = useState(roteirosPorDias[1]);

  const handleDiasChange = (value) => {
    setDias(value);
    setRoteiro(roteirosPorDias[value]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Escolha o número de dias que você vai passar em Recife</Text>
      <Picker
        selectedValue={dias}
        onValueChange={handleDiasChange}
        style={styles.picker}
      >
        <Picker.Item label="1 Dia" value={1} />
        <Picker.Item label="2 Dias" value={2} />
        <Picker.Item label="3 Dias" value={3} />
        <Picker.Item label="4 Dias" value={4} />
        <Picker.Item label="5 Dias" value={5} />
        <Picker.Item label="6 Dias" value={6} />
        <Picker.Item label="7 Dias" value={7} />
      </Picker>

      <Text style={styles.subTitle}>Roteiro para {dias} {dias > 1 ? 'dias' : 'dia'}:</Text>

      <View style={styles.roteiroContainer}>
        {roteiro.map((item, index) => (
          <View key={index} style={styles.pontoContainer}>
            <Text style={styles.pontoTitle}>{item.name}</Text>
            <Text style={styles.pontoDescription}>{item.description}</Text>
            {item.locations.map((loc, idx) => (
              <View key={idx} style={styles.locationContainer}>
                <Text style={styles.locationTitle}>{loc.name}</Text>
                <Text style={styles.locationDescription}>{loc.description}</Text>
                <Image source={loc.image} style={styles.locationImage} />
              </View>
            ))}
          </View>
        ))}
      </View>

      <Button title="Salvar Roteiro" onPress={() => alert('Roteiro salvo!')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  roteiroContainer: {
    marginVertical: 10,
  },
  pontoContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  locationContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationDescription: {
    fontSize: 16,
    color: 'gray',
  },
  locationImage: {
    width: '100%',
    height: 120, // Ajuste para imagens menores
    marginTop: 10,
    borderRadius: 8,
  },
  pontoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  pontoDescription: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default RoteirosScreen;
