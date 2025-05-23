import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { CarrosProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import CarroScreen from '../components/Carros';
import { Marca } from '../types/Carro';

const TelaCarros = ({ navigation, route }: CarrosProps) => {
  const [marcaSelecionada, setMarcaSelecionada] = useState<Marca | null>(null);

  useEffect(() => {
    if (route.params?.marca) {
      setMarcaSelecionada(route.params.marca);
    }
  }, [route.params?.marca]);

  function navegar(id: string) {
    navigation.navigate('TelaAltCarro', { carro_id: id });
  }

  function selecionarMarca() {
    navigation.navigate('TelaSelMarca');
  }

  return (
    <View style={styles.tela}>
      <CarroScreen
        onAlterar={navegar}
        onSelecionarMarca={selecionarMarca}
        marcaSelecionada={marcaSelecionada}
      />

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.Texto_botao}> Voltar </Text>
      </Pressable>
    </View>
  );
};

export default TelaCarros;
