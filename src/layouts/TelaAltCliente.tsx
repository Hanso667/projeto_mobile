import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../styles/styles';
import { Cliente } from '../types/Cliente';

const TelaAltCliente = (props: any) => {
  const clienteId = props.route.params.cliente_id;

  const [cliente, setCliente] = useState<Cliente>({
    cliente_id: clienteId,
    nome: '',
    endereco: '',
    cpf: '',
  });

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Busca os dados do cliente
  const buscarCliente = async () => {
    try {
      const docRef = await firestore().collection('clientes').doc(clienteId).get();

      if (docRef.exists) {
        const dados = docRef.data();
        setCliente({
          cliente_id: clienteId,
          nome: dados?.nome || '',
          endereco: dados?.endereco || '',
          cpf: dados?.cpf || '',
        });
      } else {
        Alert.alert('Erro', 'Cliente não encontrado');
      }
    } catch (error: any) {
      Alert.alert('Erro ao buscar cliente', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCliente();
  }, []);

  const atualizarCampo = (campo: keyof Cliente, valor: string) => {
    setCliente(prev => ({ ...prev, [campo]: valor }));
  };

  // Salva as alterações
  const salvarAlteracoes = async () => {
    setSalvando(true);
    try {
      await firestore().collection('clientes').doc(cliente.cliente_id).update({
        nome: cliente.nome,
        endereco: cliente.endereco,
        cpf: cliente.cpf,
      });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
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

      <Text>Nome:</Text>
      <TextInput
        style={styles.TextInput}
        value={cliente.nome}
        onChangeText={text => atualizarCampo('nome', text)}
        placeholder="Nome"
      />

      <Text>Endereço:</Text>
      <TextInput
        style={styles.TextInput}
        value={cliente.endereco}
        onChangeText={text => atualizarCampo('endereco', text)}
        placeholder="Endereço"
      />

      <Text>CPF:</Text>
      <TextInput
        style={styles.TextInput}
        value={cliente.cpf}
        onChangeText={text => atualizarCampo('cpf', text)}
        placeholder="CPF"
        keyboardType="numeric"
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

export default TelaAltCliente;
