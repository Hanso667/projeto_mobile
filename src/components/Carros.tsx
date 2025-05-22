import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';
import { Carro, Marca } from '../types/Carro';
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
                marca: ''
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

            <Text style={styles.texto_01}> modelo </Text>
            <TextInput
                style={styles.TextInput}
                value={modelo}
                onChangeText={setmodelo}>
            </TextInput>

            <Text style={styles.texto_01}> valor </Text>
            <TextInput
                style={styles.TextInput}
                value={valor}
                onChangeText={setValor}>
            </TextInput>

            <Text style={styles.texto_01}> marca_id </Text>
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
const AddMarca = () => {

    const [marca, setMarca] = useState('');

    function verificaCampos() {
        if (!marca) {
            Alert.alert('Aviso', 'valor para marca vazio')
            return false;
        }
        return true;
    }


    function cadastrar() {
        if (verificaCampos()) {
            //crie um objeto do tipo Produto
            let Marca = {
                marca: marca,
            } as Marca;


            //adiciona o objeto produto na tabela produtos
            firestore()
                .collection('marcas')
                .add(Marca)
                .then(() => {
                    Alert.alert("Marca", "Cadastrado com sucesso!");
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
                value={marca}
                onChangeText={setMarca}>
            </TextInput>

            <Pressable
                style={({ pressed }) => [styles.botao_01, pressed && styles.click]}
                onPress={() => cadastrar()}>
                <Text style={styles.Texto_botao}> Cadastrar </Text>
            </Pressable>

        </View>
    );
}

type onAlterar = {
    onAlt: () => void
}

const ListCarros = (props: onAlterar) => {

    const [carros, setCarros] = useState<Carro[]>([]);

    function DeletarCarro(id: string) {
        firestore()
            .collection('carros')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("carro", "Removido com sucesso")
            })
            .catch((error) => console.log(error));
    }



    function AlterarCarro() {
        props.onAlt()
    }

    useEffect(() => {
        const subscribe = firestore()
            .collection('carros')
            .onSnapshot(async (querySnapshot) => {
                const data: Carro[] = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const carro = {
                            carro_id: doc.id,
                            ...doc.data(),
                        } as Carro;

                        if (carro.marca_id) {
                            const marcaDoc = await firestore()
                                .collection('marcas')
                                .doc(carro.marca_id)
                                .get();

                            if (marcaDoc.exists) {
                                carro.marca = marcaDoc.data()?.marca;
                                firestore()
                                    .collection('carros')
                                    .doc(carro.carro_id)
                                    .update({ marca: carro.marca })
                                    .catch((error) => console.error('Error updating marca:', error));
                            }
                        }

                        return carro;
                    })
                );

                setCarros(data);
            });

        return () => subscribe();
    }, []);



    return (
        <View style={styles.lista_01}>
            <FlatList
                data={carros}
                renderItem={(Carro) =>
                    <ItemCarro
                        index={Carro.index + 1}
                        carro={Carro.item}
                        onAlterar={AlterarCarro}
                        onDeletar={DeletarCarro}
                    />} />
        </View>
    )
}
type ItemCarroProps = {
    index: number;
    carro: Carro;
    onDeletar: (id: string) => void;
    onAlterar: (id: string) => void;
}

const ItemCarro = (props: ItemCarroProps) => {


    return (
        <View style={styles.card_view}>

            <View style={styles.card}>

                <Text style={{ fontSize: 20 }}>
                    Id: {props.carro.carro_id} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    modelo: {props.carro.modelo} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    valor: {props.carro.valor} {' '}
                </Text>

                <Text style={{ fontSize: 20 }}>
                    marca: {props.carro.marca} {' '}
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

export { AddCarros, ListCarros, AddMarca }; 
