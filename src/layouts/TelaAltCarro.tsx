import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../styles/styles';
import { Carro } from '../types/Carro';

const TelaAltCarro = (props: any) => {
  const carroId = props.route.params.carro_id;

  const [carro, setCarro] = useState<Carro>({
    carro_id: carroId,
    modelo: '',
    valor: 0,
    marca_id: '',
    marca: '',
  });

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Busca os dados do carro
  const buscarCarro = async () => {
    try {
      const docRef = await firestore().collection('carros').doc(carroId).get();

      if (docRef.exists) {
        const dados = docRef.data();
        setCarro({
          carro_id: carroId,
          modelo: dados?.modelo || '',
          valor: dados?.valor || 0,
          marca_id: dados?.marca_id || '',
          marca: dados?.marca || '',
        });
      } else {
        Alert.alert('Erro', 'Carro não encontrado');
      }
    } catch (error: any) {
      Alert.alert('Erro ao buscar carro', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCarro();
  }, []);

  const atualizarCampo = (campo: keyof Carro, valor: string | number) => {
    setCarro(prev => ({ ...prev, [campo]: valor }));
  };

  const salvarAlteracoes = async () => {
    setSalvando(true);
    try {
      await firestore().collection('carros').doc(carro.carro_id).update({
        modelo: carro.modelo,
        valor: carro.valor,
        marca_id: carro.marca_id,
        marca: carro.marca,
      });
      Alert.alert('Sucesso', 'Dados do carro atualizados com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro ao salvar', error.message);
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.tela}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.Texto_botao}>Voltar</Text>
      </Pressable>

      <Text>Modelo:</Text>
      <TextInput
        style={styles.TextInput}
        value={carro.modelo}
        onChangeText={text => atualizarCampo('modelo', text)}
        placeholder="Modelo do carro"
      />

      <Text>Valor (R$):</Text>
      <TextInput
        style={styles.TextInput}
        value={String(carro.valor)}
        onChangeText={text => atualizarCampo('valor', Number(text))}
        placeholder="Valor"
        keyboardType="numeric"
      />

      <Text>Marca ID:</Text>
      <TextInput
        style={styles.TextInput}
        value={carro.marca_id}
        onChangeText={text => atualizarCampo('marca_id', text)}
        placeholder="ID da Marca"
      />

      <Text>Marca:</Text>
      <TextInput
        style={styles.TextInput}
        value={carro.marca}
        onChangeText={text => atualizarCampo('marca', text)}
        placeholder="Nome da Marca"
      />

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click, { marginTop: 20 }]}
        onPress={salvarAlteracoes}
        disabled={salvando}
      >
        <Text style={styles.Texto_botao}>
          {salvando ? 'Salvando...' : 'Salvar Alterações'}
        </Text>
      </Pressable>
    </View>
  );
};

export default TelaAltCarro;
