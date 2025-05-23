import React from 'react';
import { Alert, Text, Pressable, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Venda, Carro_venda } from '../types/venda';
import { Carro } from '../types/Carro';
import { styles } from '../styles/styles';

const AddVenda = ({
  cliente,
  carrosSelecionados,
  quantidadesSelecionadas,
  usuario_id, // <- adicionado aqui
}: {
  cliente: { id: string, nome: string } | null,
  carrosSelecionados: Carro[],
  quantidadesSelecionadas: { [id: string]: string },
  usuario_id: string // <- tipo definido
}) => {
  const cadastrarVenda = async () => {
    if (!cliente) {
      Alert.alert("Erro", "Cliente não selecionado.");
      return;
    }

    if (!carrosSelecionados || carrosSelecionados.length === 0) {
      Alert.alert("Erro", "Selecione ao menos um carro.");
      return;
    }

    const vendaData: Omit<Venda, 'venda_id'> = {
      usuario_id, // <- incluído aqui
      cliente_id: cliente.id,
      valor_total: carrosSelecionados.reduce((soma, carro) => {
        const quantidade = parseInt(quantidadesSelecionadas[carro.carro_id] || '1');
        return soma + (carro.valor * quantidade);
      }, 0),
    };

    try {
      const vendaRef = await firestore().collection('vendas').add(vendaData);
      const vendaId = vendaRef.id;

      for (const carro of carrosSelecionados) {
        const quantidade = parseInt(quantidadesSelecionadas[carro.carro_id] || '1');
        const carroVenda: Omit<Carro_venda, 'venda_id'> = {
          carro_id: carro.carro_id,
          quantidade,
          valor: carro.valor * quantidade,
        };

        await firestore().collection('carros_vendas').add({
          ...carroVenda,
          venda_id: vendaId,
        });
      }

      Alert.alert("Sucesso", "Venda registrada!");
    } catch (err) {
      Alert.alert("Erro", String(err));
    }
  };

  return (
    <View>
      {cliente && <Text style={styles.texto_01}>Cliente: {cliente.nome}</Text>}
      {carrosSelecionados.map(carro => (
        <Text key={carro.carro_id}>
          {carro.modelo} - Quantidade: {quantidadesSelecionadas[carro.carro_id] || '1'}
        </Text>
      ))}
      <Pressable style={styles.botao_01} onPress={cadastrarVenda}>
        <Text style={styles.Texto_botao}>Registrar Venda</Text>
      </Pressable>
    </View>
  );
};

export default AddVenda;
