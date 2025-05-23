import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import HomeNavigator, { LoginProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import Login from '../components/Login';
import { useNavigation } from '@react-navigation/native';


const TelaLogin = (props: LoginProps) => {
    
    function navegar(id: string){
        props.navigation.navigate('TelaPrincipal', {usuario_id: id });
    }

    return (
        <View style={styles.tela}>
            <Login
            onPressBotao={navegar}></Login>
        </View>
    );
}

//exportando o componente TelaPrincipal para ficar visível para outros arquivos
export default TelaLogin;
