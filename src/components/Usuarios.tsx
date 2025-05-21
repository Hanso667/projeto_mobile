import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { Usuario } from '../types/Usuario';

import firestore from "@react-native-firebase/firestore";



const AddUsuario = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cSenha, setCsenha] = useState('');

    function verificaCampos() {
        if (!nome) {
            Alert.alert('Aviso', 'valor para nome vazio')
            return false;
        }
        if (!email) {
            Alert.alert('Aviso', 'valor para email vazio')
            return false;
        }
        if (!senha) {
            Alert.alert('Aviso', 'valor para senha vazio')
            return false;
        }
        if (senha != cSenha) {
            Alert.alert('Aviso', 'as senhas não estão iguais')
            return false;
        }
        return true;
    }
    function cadastrar() {
        if (verificaCampos()) {
            //crie um objeto do tipo Produto
            let usuario = {
                nome: nome,
                email: email,
                senha: senha,
            } as Usuario;


            //adiciona o objeto produto na tabela produtos
            firestore()
                .collection('usuarios')
                .add(usuario)
                .then(() => {
                    Alert.alert("Paciente", "Cadastrado com sucesso!");
                })
                .catch((error) => {
                    Alert.alert("Erro", String(error));
                });
        }
    }





    return (
        <View style={styles.tela}>

            <Text style={styles.texto_01}> Nome </Text>
            <TextInput
                style={styles.TextInput}
                value={nome}
                onChangeText={setNome}>
            </TextInput>

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

            <Text style={styles.texto_01}> Confirmar Senha</Text>
            <TextInput
                style={styles.TextInput}
                value={cSenha}
                onChangeText={setCsenha}
                secureTextEntry={true}>
            </TextInput>

            <Pressable
                style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                onPress={() => cadastrar()}>
                <Text style={styles.Texto_botao}> Cadastrar </Text>
            </Pressable>

        </View>
    );
}

const ListUsuario = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    function DeletarUsuario(id: string) {
        firestore()
            .collection('usuarios')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Paciente", "Removido com sucesso")
            })
            .catch((error) => console.log(error));
    }



function AlterarUsuario() {

}

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

return (
    <View style={styles.lista_01}>
        <FlatList
            data={usuarios}
            renderItem={(Usuario) =>
                <ItemUsuario
                    index={Usuario.index + 1}
                    usuario={Usuario.item}
                    onAlterar={AlterarUsuario}
                    onDeletar={DeletarUsuario}
                />} />
    </View>
)
}
type ItemUsuarioProps = {
    index: number;
    usuario: Usuario;
    onDeletar: (id: string) => void;
    onAlterar: (id: string) => void;
}

const ItemUsuario = (props: ItemUsuarioProps) => {


    return (
        <View style={styles.card_view}>

            <View style={styles.card}>

                <Text style={{ fontSize: 20 }}>
                    Id: {props.usuario.usuario_id} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    nome: {props.usuario.nome} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    email: {props.usuario.email} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    senha: {props.usuario.senha} {' '}
                </Text>

            </View>

            <View
                style={styles.botoes_view}>
                <View
                    style={[styles.botoes_card, styles.botao_deletar]}>

                    <Pressable
                        onPress={() => props.onDeletar(props.usuario.usuario_id)}>

                        <Text style={styles.Texto_botao}>
                            Deletar
                        </Text>


                    </Pressable>
                </View>

                <View style={[styles.botoes_card, styles.botao_alterar]}>
                    <Pressable
                        onPress={() => props.onAlterar(props.usuario.usuario_id)}>
                        <Text style={[styles.Texto_botao, { color: 'black' }]}>
                            Alterar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export { AddUsuario, ListUsuario }; 
