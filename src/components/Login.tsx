import React, { useState, useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { Usuario } from '../types/Usuario';

import firestore from "@react-native-firebase/firestore";

type nomeProp = {
    onPressBotao: (id: string) => void;
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
        const usuario = usuarios.find(usuario =>
            usuario.email === email && usuario.senha === senha
        );

        if (usuario) {
            props.onPressBotao(usuario.usuario_id);
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
                onChangeText={setEmail}
            />

            <Text style={styles.texto_01}> Senha </Text>
            <TextInput
                style={styles.TextInput}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
            />

            <Pressable
                style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                onPress={login}
            >
                <Text style={styles.Texto_botao}> Logar </Text>
            </Pressable>

        </View>
    );
}

export default Login;
