import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Venda, Carro_venda } from '../types/venda';
import { Carro } from '../types/Carro';
import { styles } from '../styles/styles';

const AddVenda = ({
  cliente,
  carrosSelecionados,
  quantidadesSelecionadas,
  usuario_id,
}: {
  cliente: { id: string; nome: string } | null;
  carrosSelecionados: Carro[];
  quantidadesSelecionadas: { [id: string]: string };
  usuario_id: string;
}) => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [usuarios, setUsuarios] = useState<{ [id: string]: string }>({});
  const [clientes, setClientes] = useState<{ [id: string]: string }>({});

  // Busca usuários e clientes em tempo real
  useEffect(() => {
    // Usuários
    const usuariosUnsubscribe = firestore()
      .collection('usuarios')
      .onSnapshot(snapshot => {
        const mapUsuarios: { [id: string]: string } = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          mapUsuarios[doc.id] = data.nome || 'Sem nome';
        });
        setUsuarios(mapUsuarios);
      });

    // Clientes
    const clientesUnsubscribe = firestore()
      .collection('clientes')
      .onSnapshot(snapshot => {
        const mapClientes: { [id: string]: string } = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          mapClientes[doc.id] = data.nome || 'Sem nome';
        });
        setClientes(mapClientes);
      });

    // Vendas
    const vendasUnsubscribe = firestore()
      .collection('vendas')
      .onSnapshot(snapshot => {
        const lista = snapshot.docs.map(doc => ({
          venda_id: doc.id,
          ...doc.data(),
        })) as Venda[];
        setVendas(lista);
      });

    return () => {
      usuariosUnsubscribe();
      clientesUnsubscribe();
      vendasUnsubscribe();
    };
  }, []);

  const cadastrarVenda = async () => {
    if (!cliente) {
      Alert.alert('Erro', 'Cliente não selecionado.');
      return;
    }

    if (!carrosSelecionados || carrosSelecionados.length === 0) {
      Alert.alert('Erro', 'Selecione ao menos um carro.');
      return;
    }

    const valor_total = carrosSelecionados.reduce((soma, carro) => {
      if (!carro.carro_id || carro.valor === undefined) return soma;

      const quantidadeStr = quantidadesSelecionadas[carro.carro_id];
      const quantidade =
        quantidadeStr && !isNaN(parseInt(quantidadeStr)) ? parseInt(quantidadeStr) : 1;

      return soma + carro.valor * quantidade;
    }, 0);

    const vendaData: Omit<Venda, 'venda_id'> = {
      usuario_id,
      cliente_id: cliente.id,
      valor_total,
    };

    try {
      const vendaRef = await firestore().collection('vendas').add(vendaData);
      const vendaId = vendaRef.id;

      for (const carro of carrosSelecionados) {
        if (!carro.carro_id || carro.valor === undefined) continue;

        const quantidadeStr = quantidadesSelecionadas[carro.carro_id];
        const quantidade =
          quantidadeStr && !isNaN(parseInt(quantidadeStr)) ? parseInt(quantidadeStr) : 1;

        const carroVenda: Omit<Carro_venda, 'venda_id'> = {
          carro_id: carro.carro_id,
          quantidade,
          valor: carro.valor * quantidade,
        };

        await firestore()
          .collection('carros_vendas')
          .add({
            ...carroVenda,
            venda_id: vendaId,
          });
      }

      Alert.alert('Sucesso', 'Venda registrada!');
    } catch (err) {
      Alert.alert('Erro', String(err));
    }
  };

  const deletarVenda = async (id: string) => {
    try {
      // Primeiro deleta os carros_vendas vinculados à venda
      const carrosVendasSnapshot = await firestore()
        .collection('carros_vendas')
        .where('venda_id', '==', id)
        .get();

      const batch = firestore().batch();
      carrosVendasSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      // Deleta a venda
      batch.delete(firestore().collection('vendas').doc(id));

      await batch.commit();

      Alert.alert('Sucesso', 'Venda deletada.');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar a venda.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {cliente && <Text style={styles.texto_01}>Cliente: {cliente.nome}</Text>}

      {carrosSelecionados.map(carro => (
        <Text key={carro.carro_id}>
          {carro.modelo} - Quantidade: {quantidadesSelecionadas[carro.carro_id] || '1'}
        </Text>
      ))}

      <Pressable style={styles.botao_01} onPress={cadastrarVenda}>
        <Text style={styles.Texto_botao}>Registrar Venda</Text>
      </Pressable>

      <Text style={[styles.texto_01, { marginTop: 24, marginBottom: 8 }]}>Vendas Registradas</Text>

      <FlatList
        data={vendas}
        keyExtractor={item => item.venda_id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#eee',
              padding: 12,
              marginVertical: 6,
              borderRadius: 6,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text>ID: {item.venda_id}</Text>
              <Text>
                Cliente: {clientes[item.cliente_id] || 'Desconhecido'} ({item.cliente_id})
              </Text>
              <Text>
                Usuário: {usuarios[item.usuario_id] || 'Desconhecido'} ({item.usuario_id})
              </Text>
              <Text>Valor Total: R$ {item.valor_total.toFixed(2)}</Text>
            </View>

            <Pressable
              style={[styles.botao_deletar, { paddingHorizontal: 12, paddingVertical: 6 }]}
              onPress={() =>
                Alert.alert(
                  'Confirmação',
                  'Deseja deletar esta venda?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Deletar', style: 'destructive', onPress: () => deletarVenda(item.venda_id) },
                  ],
                  { cancelable: true }
                )
              }
            >
              <Text style={[styles.Texto_botao, { color: 'white' }]}>Deletar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default AddVenda;
