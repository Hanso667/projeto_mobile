import React, { useState, useEffect } from 'react';
import {
  Alert, FlatList, Pressable, Text, TextInput, View, ScrollView
} from 'react-native';
import { styles } from '../styles/styles';
import firestore from "@react-native-firebase/firestore";
import { Carro, Marca } from '../types/Carro';

type Props = {
  onAlterar: (id: string) => void;
  onSelecionarMarca: () => void;
  marcaSelecionada: Marca | null;
};

const CarroScreen = ({ onAlterar, onSelecionarMarca, marcaSelecionada }: Props) => {
  // Estados carros
  const [modelo, setModelo] = useState('');
  const [valor, setValor] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [carros, setCarros] = useState<Carro[]>([]);

  // Estados marcas
  const [marcaNome, setMarcaNome] = useState('');
  const [marcas, setMarcas] = useState<Marca[]>([]);

  // Atualiza marcaId quando marcaSelecionada mudar
  useEffect(() => {
    if (marcaSelecionada) {
      setMarcaId(marcaSelecionada.marca_id);
    }
  }, [marcaSelecionada]);

  // --- Funções carros ---
  const limparCamposCarro = () => {
    setModelo('');
    setValor('');
    setMarcaId('');
  };

  const verificaCamposCarro = (): boolean => {
    if (!modelo || !valor || !marcaId) {
      Alert.alert('Aviso', 'Todos os campos do carro são obrigatórios.');
      return false;
    }
    return true;
  };

  const cadastrarCarro = () => {
    if (!verificaCamposCarro()) return;

    const carro: Omit<Carro, 'carro_id'> = {
      modelo,
      valor: parseFloat(valor),
      marca_id: marcaId,
      marca: '', // será preenchido após fetch
    };

    firestore()
      .collection('carros')
      .add(carro)
      .then(() => {
        Alert.alert("Carro", "Cadastrado com sucesso!");
        limparCamposCarro();
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
      .catch(() => {
        Alert.alert("Erro", "Erro ao deletar carro.");
      });
  };

  // --- Funções marcas ---
  const limparCamposMarca = () => {
    setMarcaNome('');
  };

  const verificaCamposMarca = (): boolean => {
    if (!marcaNome) {
      Alert.alert('Aviso', 'O nome da marca é obrigatório.');
      return false;
    }
    return true;
  };

  const cadastrarMarca = () => {
    if (!verificaCamposMarca()) return;

    const marca: Omit<Marca, 'marca_id'> = {
      marca: marcaNome,
    };

    firestore()
      .collection('marcas')
      .add(marca)
      .then(() => {
        Alert.alert("Marca", "Cadastrada com sucesso!");
        limparCamposMarca();
      })
      .catch(error => {
        Alert.alert("Erro", String(error));
      });
  };

  const deletarMarca = (id: string) => {
    firestore()
      .collection('marcas')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Marca", "Removida com sucesso");
      })
      .catch(() => {
        Alert.alert("Erro", "Erro ao deletar marca.");
      });
  };

  // --- useEffect para listar carros ---
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

  // --- useEffect para listar marcas ---
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('marcas')
      .onSnapshot(snapshot => {
        const data: Marca[] = snapshot.docs.map(doc => ({
          marca_id: doc.id,
          ...doc.data(),
        } as Marca));

        setMarcas(data);
      });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* FORMULÁRIO DE MARCAS */}
      <Text style={styles.texto_01}>Cadastrar Marca</Text>
      <View style={styles.tela}>
        <Text style={styles.texto_01}>Nome da Marca</Text>
        <TextInput
          style={styles.TextInput}
          value={marcaNome}
          onChangeText={setMarcaNome}
          placeholder="Digite o nome da marca"
        />
        <Pressable style={({ pressed }) => [styles.botao_01, pressed && styles.click]} onPress={cadastrarMarca}>
          <Text style={styles.Texto_botao}>Cadastrar Marca</Text>
        </Pressable>
      </View>

      {/* LISTA DE MARCAS */}
      <View style={styles.lista_01}>
        <Text style={[styles.texto_01, { marginTop: 24, marginBottom: 8 }]}>Marcas Cadastradas</Text>
        <FlatList
          data={marcas}
          keyExtractor={(item) => item.marca_id}
          renderItem={({ item }) => (
            <View style={styles.card_view}>
              <View style={styles.card}>
                <Text style={{ fontSize: 16 }}>ID: {item.marca_id}</Text>
                <Text style={{ fontSize: 16 }}>Marca: {item.marca}</Text>
              </View>
              <View style={styles.botoes_view}>
                <View style={[styles.botoes_card, styles.botao_deletar]}>
                  <Pressable onPress={() => deletarMarca(item.marca_id)}>
                    <Text style={styles.Texto_botao}>Deletar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* FORMULÁRIO DE CARROS */}
      <View style={styles.tela}>
        <Text style={styles.texto_01}>Cadastrar Carro</Text>
        <Text style={styles.texto_01}>Modelo</Text>
        <TextInput style={styles.TextInput} value={modelo} onChangeText={setModelo} />

        <Text style={styles.texto_01}>Valor</Text>
        <TextInput style={styles.TextInput} value={valor} onChangeText={setValor} keyboardType="decimal-pad" />

        {/* Botão para selecionar a marca */}
        <Text style={styles.texto_01}>Marca Selecionada</Text>
        <Pressable
          style={[styles.botao_01, { marginBottom: 16 }]}
          onPress={onSelecionarMarca}
        >
          <Text style={styles.Texto_botao}>
            {marcaSelecionada ? marcaSelecionada.marca : 'Selecionar Marca'}
          </Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.botao_01, pressed && styles.click]} onPress={cadastrarCarro}>
          <Text style={styles.Texto_botao}>Cadastrar Carro</Text>
        </Pressable>
      </View>

      {/* LISTA DE CARROS */}
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
