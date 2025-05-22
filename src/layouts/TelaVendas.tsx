import React, { useState, useEffect } from 'react';
import AddVenda from '../components/Vendas';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import type { VendasProps } from '../navigation/HomeNavigator';
import type { Carro } from '../types/Carro'; // ajuste o caminho!

const TelaVendas = ({ route, navigation }: VendasProps) => {
  const [cliente, setCliente] = useState(null);
  const [carros, setCarros] = useState<Carro[]>(([]));
  const [quantidades, setQuantidades] = useState({});

  useEffect(() => {
    if (route.params) {
      const { cliente: novoCliente, carros: novosCarros, qtds } = route.params;
      if (novoCliente) setCliente(novoCliente);
      if (novosCarros) setCarros(novosCarros);
      if (qtds) setQuantidades(qtds);
    }
  }, [route.params]);

  return (
    <View style={styles.tela}>
      <Pressable style={styles.botao_01} onPress={() => navigation.navigate('TelaSelCliente')}>
        <Text style={styles.Texto_botao}>Selecionar Cliente</Text>
      </Pressable>

      <Pressable style={styles.botao_01} onPress={() => navigation.navigate('TelaSelCarro')}>
        <Text style={styles.Texto_botao}>Selecionar Carros</Text>
      </Pressable>

      <AddVenda cliente={cliente} carrosSelecionados={carros} quantidadesSelecionadas={quantidades} />
      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.Texto_botao}> Voltar </Text>
      </Pressable>

    </View>
  );
};

export default TelaVendas;
