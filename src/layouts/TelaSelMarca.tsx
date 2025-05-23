import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/HomeNavigator';
import { Marca } from '../types/Carro';
import { styles } from '../styles/styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'TelaSelMarca'>;

const TelaSelMarcas = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState<Marca | null>(null);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('marcas')
      .onSnapshot(snapshot => {
        const lista = snapshot.docs.map(doc => ({
          marca_id: doc.id,
          ...doc.data(),
        })) as Marca[];
        setMarcas(lista);
      });

    return () => unsubscribe();
  }, []);

  const finalizarSelecao = () => {
  if (marcaSelecionada) {
    navigation.navigate('TelaCarros', {
      marca: marcaSelecionada
    });
  }
};


  return (
    <View style={styles.tela}>
      <FlatList
        style={{ marginTop: 40 }}
        data={marcas}
        keyExtractor={(item) => item.marca_id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setMarcaSelecionada(item)}
            style={[
              styles.card_view,
              marcaSelecionada?.marca_id === item.marca_id && styles.click
            ]}
          >
            <Text style={{ fontSize: 18 }}>
              {item.marca}
            </Text>
          </Pressable>
        )}
      />
      <Pressable style={styles.botao_01} onPress={finalizarSelecao} disabled={!marcaSelecionada}>
        <Text style={styles.Texto_botao}>Confirmar Seleção</Text>
      </Pressable>
    </View>
  );
};

export default TelaSelMarcas;
