import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, ScrollView , Text, View } from 'react-native';
import HomeNavigator, { ClientesProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import ClienteScreen from '../components/Clientes';
import { useNavigation } from '@react-navigation/native';


const TelaClientes = (props: ClientesProps) => {
    function navegar(id: string){
        props.navigation.navigate('TelaAltCliente', {cliente_id: id})
    }
    return (
        <View style={styles.tela}>
            <ClienteScreen
            onAlter={navegar}></ClienteScreen>
            <Pressable
                style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                onPress={() => props.navigation.goBack()}
            >
                <Text style={styles.Texto_botao}> Voltar </Text>
            </Pressable>
        </View>
    );
}

//exportando o componente TelaPrincipal para ficar visível para outros arquivos
export default TelaClientes;
