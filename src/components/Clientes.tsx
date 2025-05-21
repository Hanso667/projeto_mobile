import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { Cliente } from '../types/Cliente';
import HomeNavigator, { UsuariosProps } from '../navigation/HomeNavigator';
import firestore from "@react-native-firebase/firestore";

const AddCliente = () => {

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');

    function verificaCampos() {
        if (!nome) {
            Alert.alert('Aviso', 'valor para nome vazio')
            return false;
        }
        if (!endereco) {
            Alert.alert('Aviso', 'valor para endereco vazio')
            return false;
        }
        if (!cpf) {
            Alert.alert('Aviso', 'valor para cpf vazio')
            return false;
        }
        return true;
    }


    function cadastrar() {
        if (verificaCampos()) {
            //crie um objeto do tipo Produto
            let cliente = {
                nome: nome,
                endereco: endereco,
                cpf: cpf,
            } as Cliente;


            //adiciona o objeto produto na tabela produtos
            firestore()
                .collection('clientes')
                .add(cliente)
                .then(() => {
                    Alert.alert("cliente", "Cadastrado com sucesso!");
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
                value={endereco}
                onChangeText={setEndereco}>
            </TextInput>

            <Text style={styles.texto_01}> Senha </Text>
            <TextInput
                style={styles.TextInput}
                value={cpf}
                onChangeText={setCpf}>
            </TextInput>

            <Pressable
                style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                onPress={() => cadastrar()}>
                <Text style={styles.Texto_botao}> Cadastrar </Text>
            </Pressable>

        </View>
    );
}

type onAlterar ={
 onAlt: () => void
}

const ListCliente = (props: onAlterar) => {

    const [usuarios, setUsuarios] = useState<Cliente[]>([]);

    function DeletarCliente(id: string) {
        firestore()
            .collection('clientes')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("cliente", "Removido com sucesso")
            })
            .catch((error) => console.log(error));
    }



    function AlterarCliente() {
        props.onAlt()
    }

    useEffect(() => {
        const subscribe = firestore()
            .collection('clientes')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        cliente_id: doc.id,
                        ...doc.data()
                    }

                }) as Cliente[];

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
                        cliente={Usuario.item}
                        onAlterar={AlterarCliente}
                        onDeletar={DeletarCliente}
                    />} />
        </View>
    )
}
type ItemUsuarioProps = {
    index: number;
    cliente: Cliente;
    onDeletar: (id: string) => void;
    onAlterar: (id: string) => void;
}

const ItemUsuario = (props: ItemUsuarioProps) => {


    return (
        <View style={styles.card_view}>

            <View style={styles.card}>

                <Text style={{ fontSize: 20 }}>
                    Id: {props.cliente.cliente_id} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    nome: {props.cliente.nome} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    email: {props.cliente.endereco} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    senha: {props.cliente.cpf} {' '}
                </Text>

            </View>

            <View
                style={styles.botoes_view}>
                <View
                    style={[styles.botoes_card, styles.botao_deletar]}>

                    <Pressable
                        onPress={() => props.onDeletar(props.cliente.cliente_id)}>

                        <Text style={styles.Texto_botao}>
                            Deletar
                        </Text>


                    </Pressable>
                </View>

                <View style={[styles.botoes_card, styles.botao_alterar]}>
                    <Pressable
                        onPress={() => props.onAlterar(props.cliente.cliente_id)}>
                        <Text style={[styles.Texto_botao, { color: 'black' }]}>
                            Alterar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export { AddCliente, ListCliente }; 
