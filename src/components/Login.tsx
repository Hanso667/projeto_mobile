import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { Usuario } from '../types/Usuario';


import firestore from "@react-native-firebase/firestore";


type nomeProp = {
    onPressBotao: () => void
}

const Login = (props: nomeProp) => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');



    useEffect(() => {
        const subscribe = firestore()
            .collection('usuarios')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        usuario_id: doc.id,
                        ...doc.data()
                    }

                }) as Usuario[];

                setUsuarios(data);
            });

        return () => subscribe();
    }, []);



    function login() {
        const confirm = usuarios.some(usuario =>
            usuario.email === email && usuario.senha === senha
        );

        if (confirm) {
            props.onPressBotao();
        } else {
            Alert.alert("Erro", "Email ou senha inválidos");
        }
    }

    return (
        <View style={styles.tela}>

            <Text style={styles.texto_01}> Email </Text>
            <TextInput
                style={styles.TextInput}
                value={email}
                onChangeText={setEmail}>
            </TextInput>

            <Text style={styles.texto_01}> Senha </Text>
            <TextInput
                style={styles.TextInput}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}>

            </TextInput>

            <Pressable
                style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                onPress={() => login()}
            >
                <Text style={styles.Texto_botao}> Logar </Text>
            </Pressable>

        </View>
    );
}

//exportando o componente TelaPrincipal para ficar visível para outros arquivos
export default Login;
