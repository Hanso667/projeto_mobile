import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import HomeNavigator, { UsuariosProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import UsuarioScreen from '../components/Usuarios';
import { useNavigation } from '@react-navigation/native';


const TelaUsuarios = (props: UsuariosProps) => {
    function navegar(id: string){
        props.navigation.navigate('TelaAltUsuario', {usuario_id: id})
    }
    return (
        <View style={styles.tela}>
        <UsuarioScreen
        onAlter={navegar}></UsuarioScreen>
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
export default TelaUsuarios;
