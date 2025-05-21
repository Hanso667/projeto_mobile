import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { Carro } from '../types/Carro';
import HomeNavigator, { UsuariosProps } from '../navigation/HomeNavigator';
import firestore from "@react-native-firebase/firestore";

const AddCarros = () => {

    const [modelo, setmodelo] = useState('');
    const [valor, setValor] = useState('');
    const [marca_id, setMarca_id] = useState('');

    function verificaCampos() {
        if (!modelo) {
            Alert.alert('Aviso', 'valor para nome vazio')
            return false;
        }
        if (!valor) {
            Alert.alert('Aviso', 'valor para endereco vazio')
            return false;
        }
        if (!marca_id) {
            Alert.alert('Aviso', 'valor para cpf vazio')
            return false;
        }
        return true;
    }


    function cadastrar() {
        if (verificaCampos()) {
            //crie um objeto do tipo Produto
            let carro = {
                modelo: modelo,
                valor: parseFloat(valor),
                marca_id: marca_id,
            } as Carro;


            //adiciona o objeto produto na tabela produtos
            firestore()
                .collection('carros')
                .add(carro)
                .then(() => {
                    Alert.alert("carro", "Cadastrado com sucesso!");
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
                value={modelo}
                onChangeText={setmodelo}>
            </TextInput>

            <Text style={styles.texto_01}> Email </Text>
            <TextInput
                style={styles.TextInput}
                value={valor}
                onChangeText={setValor}>
            </TextInput>

            <Text style={styles.texto_01}> Senha </Text>
            <TextInput
                style={styles.TextInput}
                value={marca_id}
                onChangeText={setMarca_id}>
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

const ListCarros = (props: onAlterar) => {

    const [carros, setCarros] = useState<Carro[]>([]);

    function DeletarCliente(id: string) {
        firestore()
            .collection('carros')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("carro", "Removido com sucesso")
            })
            .catch((error) => console.log(error));
    }



    function AlterarCliente() {
        props.onAlt()
    }

    useEffect(() => {
        const subscribe = firestore()
            .collection('carros')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        carro_id: doc.id,
                        ...doc.data()
                    }

                }) as Carro[];

                setCarros(data);
            });

        return () => subscribe();
    }, []);

    return (
        <View style={styles.lista_01}>
            <FlatList
                data={carros}
                renderItem={(Carro) =>
                    <ItemUsuario
                        index={Carro.index + 1}
                        carro={Carro.item}
                        onAlterar={AlterarCliente}
                        onDeletar={DeletarCliente}
                    />} />
        </View>
    )
}
type ItemUsuarioProps = {
    index: number;
    carro: Carro;
    onDeletar: (id: string) => void;
    onAlterar: (id: string) => void;
}

const ItemUsuario = (props: ItemUsuarioProps) => {


    return (
        <View style={styles.card_view}>

            <View style={styles.card}>

                <Text style={{ fontSize: 20 }}>
                    Id: {props.carro.modelo} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    nome: {props.carro.valor} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    email: {props.carro.marca_id} {' '}
                </Text>


            </View>

            <View
                style={styles.botoes_view}>
                <View
                    style={[styles.botoes_card, styles.botao_deletar]}>

                    <Pressable
                        onPress={() => props.onDeletar(props.carro.carro_id)}>

                        <Text style={styles.Texto_botao}>
                            Deletar
                        </Text>


                    </Pressable>
                </View>

                <View style={[styles.botoes_card, styles.botao_alterar]}>
                    <Pressable
                        onPress={() => props.onAlterar(props.carro.carro_id)}>
                        <Text style={[styles.Texto_botao, { color: 'black' }]}>
                            Alterar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export { AddCarros, ListCarros }; 
