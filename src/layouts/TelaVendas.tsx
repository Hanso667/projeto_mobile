import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, ScrollView , Text, View } from 'react-native';
import HomeNavigator, { VendasProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';


const TelaVendas = (props: VendasProps) => {
    return (
        <View style={styles.tela}>
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
export default TelaVendas;
