import React, { useState, useEffect } from 'react';
import {
  Alert, FlatList, Pressable, Text, TextInput, View, ScrollView
} from 'react-native';
import { styles } from '../styles/styles';
import firestore from "@react-native-firebase/firestore";
import { Carro, Marca } from '../types/Carro';

type Props = {
  onAlterar: (id: string) => void;
};

const CarroScreen = ({ onAlterar }: Props) => {
  const [modelo, setModelo] = useState('');
  const [valor, setValor] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [carros, setCarros] = useState<Carro[]>([]);

  const limparCampos = () => {
    setModelo('');
    setValor('');
    setMarcaId('');
  };

  const verificaCampos = (): boolean => {
    if (!modelo || !valor || !marcaId) {
      Alert.alert('Aviso', 'Todos os campos são obrigatórios.');
      return false;
    }
    return true;
  };

  const cadastrarCarro = () => {
    if (!verificaCampos()) return;

    const carro: Omit<Carro, 'carro_id'> = {
      modelo,
      valor: parseFloat(valor),
      marca_id: marcaId,
      marca: '', // será preenchido após o fetch
    };

    firestore()
      .collection('carros')
      .add(carro)
      .then(() => {
        Alert.alert("Carro", "Cadastrado com sucesso!");
        limparCampos();
      })
      .catch(error => {
        Alert.alert("Erro", String(error));
      });
  };

  const deletarCarro = (id: string) => {
    firestore()
      .collection('carros')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Carro", "Removido com sucesso");
      })
      .catch(error => {
        Alert.alert("Erro", "Erro ao deletar carro.");
      });
  };


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('carros')
      .onSnapshot(async snapshot => {
        const data: Carro[] = await Promise.all(
          snapshot.docs.map(async doc => {
            const carro = {
              carro_id: doc.id,
              ...doc.data(),
            } as Carro;

            if (carro.marca_id) {
              const marcaDoc = await firestore().collection('marcas').doc(carro.marca_id).get();
              carro.marca = marcaDoc.exists ? marcaDoc.data()?.marca : '';
            }

            return carro;
          })
        );

        setCarros(data);
      });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* 🔹 FORMULÁRIO DE CARROS */}
      <View style={styles.tela}>
        <Text style={styles.texto_01}>Modelo</Text>
        <TextInput style={styles.TextInput} value={modelo} onChangeText={setModelo} />

        <Text style={styles.texto_01}>Valor</Text>
        <TextInput style={styles.TextInput} value={valor} onChangeText={setValor} keyboardType="decimal-pad" />

        <Text style={styles.texto_01}>Marca ID</Text>
        <TextInput style={styles.TextInput} value={marcaId} onChangeText={setMarcaId} />

        <Pressable style={({ pressed }) => [styles.botao_01, pressed && styles.click]} onPress={cadastrarCarro}>
          <Text style={styles.Texto_botao}>Cadastrar</Text>
        </Pressable>
      </View>

      {/* 🔹 LISTA DE CARROS */}
      <View style={styles.lista_01}>
        <Text style={[styles.texto_01, { marginTop: 24, marginBottom: 8 }]}>Carros Cadastrados</Text>
        <FlatList
          data={carros}
          keyExtractor={(item) => item.carro_id}
          renderItem={({ item }) => (
            <View style={styles.card_view}>
              <View style={styles.card}>
                <Text style={{ fontSize: 16 }}>ID: {item.carro_id}</Text>
                <Text style={{ fontSize: 16 }}>Modelo: {item.modelo}</Text>
                <Text style={{ fontSize: 16 }}>Valor: R$ {item.valor.toFixed(2)}</Text>
                <Text style={{ fontSize: 16 }}>Marca: {item.marca || 'N/A'}</Text>
              </View>

              <View style={styles.botoes_view}>
                <View style={[styles.botoes_card, styles.botao_deletar]}>
                  <Pressable onPress={() => deletarCarro(item.carro_id)}>
                    <Text style={styles.Texto_botao}>Deletar</Text>
                  </Pressable>
                </View>

                <View style={[styles.botoes_card, styles.botao_alterar]}>
                  <Pressable onPress={() => onAlterar(item.carro_id)}>
                    <Text style={[styles.Texto_botao, { color: 'black' }]}>Alterar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CarroScreen;
