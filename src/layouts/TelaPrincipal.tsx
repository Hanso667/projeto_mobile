import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import HomeNavigator, { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';


const TelaPrincipal = (props: PrincipalProps) => {
const id = props.route.params.usuario_id;

  return (
    <View style={styles.tela}>

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => props.navigation.navigate('TelaVendas', {usuario: id})}>
        <Text style={styles.Texto_botao}>Vendas</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => props.navigation.navigate('TelaCarros', {marca: ''})}>
        <Text style={styles.Texto_botao}>Carros</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => props.navigation.navigate('TelaClientes')}>
        <Text style={styles.Texto_botao}>Clientes</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
        onPress={() => props.navigation.navigate('TelaUsuarios')}>
        <Text style={styles.Texto_botao}>Usuarios</Text>
      </Pressable>

    </View>
  );
}

//exportando o componente TelaPrincipal para ficar visível para outros arquivos
export default TelaPrincipal;
